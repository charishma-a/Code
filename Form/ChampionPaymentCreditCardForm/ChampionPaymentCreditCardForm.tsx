import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { CircularProgress } from '@material-ui/core'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useRouter } from 'next/router'

import * as sc from './ChampionPaymentCreditCardForm.styled'

import { BaseComponentProps } from '@/common/types'
import {
  PurpleBorderBox2,
  Fieldset,
  FinePrint,
  FormContainer,
  FormGroup,
  EmptyCenterView,
  FormRow,
  StripeCardElementWrapper,
} from '@/common/styled'
import {
  ERROR_MESSAGE_FIELD_REQUIRED,
  ROUTE_SECURE_CHAMPION_PAYMENTS_CREDIT_SUCCESS,
} from '@/constants/config'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'
import { PaymentDonationSummary } from '@/components/PaymentDonationSummary'
import { Paragraph } from '@/components/Paragraph'
import { Button } from '../SubmitButton'
import {
  calculateProcessingFee,
  calculateTotal,
  formatAmountForDisplay,
} from '@/utils/stripe-helpers'
import { CardPrimary } from '@/components/Card'
import {
  useMyActiveProjectCampaignQuery,
  usePrepareCreditCardDepositMutation,
} from '@/generated/graphql'
import { ErrorMessage } from '@/components/ErrorMessage'
import { CreditCardImages } from '@/components/CreditCardImages'
import { FormikInput } from '../Formik/FormikInput'
import { FieldError } from '../FieldError'
import { trackCategory } from '@/utils/analytics'

const CARD_OPTIONS = {
  iconStyle: 'solid' as const,
  style: {
    base: {
      backgroundColor: '#fff',
      color: '#000',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      fontWeight: '400',
      iconColor: '#DADADA',
    },
  },
}

const validationSchema = yup.object().shape({
  amountRemaining: yup
    .number()
    .moreThan(0, 'Amount must be over $0')
    .required(ERROR_MESSAGE_FIELD_REQUIRED),
  cardholderName: yup.string().required(ERROR_MESSAGE_FIELD_REQUIRED),
})

interface IValues {
  amountRemaining: number
  cardholderName: string
}

export const ChampionPaymentCreditCardForm: React.FC<BaseComponentProps> = ({
  classNames,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')

  const router = useRouter()

  // apollo
  const { data, loading, error } = useMyActiveProjectCampaignQuery()
  const [prepareCreditCardDeposit] = usePrepareCreditCardDepositMutation()

  // react state
  const [errorMessage, setErrorMessage] = useState('')
  const [cardInfoComplete, setCardInfoComplete] = useState(false)
  const [cardErrorMessage, setCardErrorMessage] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('initial')
  const [deposit, setDeposit] = useState(null)

  // react ref
  const valuesContainer = useRef(null)

  // depending on payment status and donation id
  // navigate to succes
  useEffect(() => {
    const onSucceeded = async () => {
      trackCategory({
        eventProps: {
          eventAction: 'Deposit CC Complete',
          eventCategory: 'Deposit CC Flow',
          clickID: 'deposit-cc-flow-event-donate-complete',
        },
        extra: valuesContainer.current,
      })
      router.push(ROUTE_SECURE_CHAMPION_PAYMENTS_CREDIT_SUCCESS)
    }
    if (deposit && paymentStatus === 'succeeded') {
      onSucceeded()
    }
  }, [deposit, paymentStatus])

  if (loading) {
    return (
      <sc.Wrapper className={className} {...restProps}>
        <EmptyCenterView>
          <CircularProgress />
        </EmptyCenterView>
      </sc.Wrapper>
    )
  }

  const renderError = (error: any) => (
    <sc.Wrapper className={className} {...restProps}>
      <EmptyCenterView>
        <ErrorMessage error={error} />
      </EmptyCenterView>
    </sc.Wrapper>
  )

  if (error) {
    return renderError(error)
  }

  const campaign = data.myActiveProjectCampaign

  if (!campaign) {
    return renderError({ message: 'No campaign found' })
  }
  const { projectChampion, project, totalDeposits } = campaign
  if (!projectChampion) {
    return renderError({ message: 'No associated project' })
  }
  const { matchCommitment } = projectChampion
  const amountRemaining = matchCommitment - totalDeposits
  const currency = projectChampion.currency || 'usd'
  if (!project) {
    return renderError({ message: 'No project found' })
  }

  const { projectFoundations = [] } = project

  const projectFoundation =
    projectFoundations.find(
      ({ foundation }) => foundation.currency === currency
    ) || projectFoundations[0]

  if (!projectFoundation) {
    return renderError({ message: 'No associated foundation' })
  }

  const { foundation } = projectFoundation

  const processingFeePercent = foundation.processingFee
  const processingFee = calculateProcessingFee({
    donationAmount: amountRemaining,
    processingFeePercent,
  })
  const total = calculateTotal(amountRemaining, processingFee)

  // inital form values
  const initialValues: IValues = {
    amountRemaining,
    cardholderName: '',
  }

  // stripe
  const stripe = useStripe()
  const elements = useElements()

  // const disabled =
  //   !['initial', 'succeeded', 'error'].includes(paymentStatus) || !stripe

  if (amountRemaining === 0) {
    return (
      <sc.Wrapper className={className} {...restProps}>
        <CardPrimary>
          <h2>Credit Card</h2>
          <EmptyCenterView>No deposit needed!</EmptyCenterView>
        </CardPrimary>
      </sc.Wrapper>
    )
  }
  return (
    <sc.Wrapper className={className} {...restProps}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, formikHelpers) => {
          const { setSubmitting, setFieldError } = formikHelpers
          setSubmitting(true)
          setPaymentStatus('processing')
          setErrorMessage('')

          // Create a PaymentIntent with the specified amount.
          let clientSecret
          let deposit
          let status

          try {
            const input = { amount: values.amountRemaining }
            valuesContainer.current = { ...input }
            trackCategory({
              eventProps: {
                eventAction: 'Deposit CC Button Click',
                eventCategory: 'Deposit CC Flow',
                clickID: 'deposit-cc-flow-click-donate',
              },
              extra: input,
            })
            const response = await prepareCreditCardDeposit({
              variables: {
                input: input,
              },
            })
            const result = response?.data?.prepareCreditCardDeposit || {}
            clientSecret = result.clientSecret
            deposit = result.deposit
            status = result.status
            toast('Success! Your payment was accepted! 🎉')
          } catch (err) {
            setPaymentStatus('error')
            runCommonFormCatchHandlers({
              err,
              setErrorMessage,
              setFieldError,
              useToast: true,
            })
          }
          setPaymentStatus(status)
          setDeposit(deposit)

          // Get a reference to a mounted CardElement. Elements knows how
          // to find your CardElement because there can only ever be one of
          // each type of element.
          const cardElement = elements!.getElement(CardElement)

          // Use your card Element with other Stripe.js APIs
          const { error, paymentIntent } = await stripe!.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: cardElement!,
                billing_details: {
                  name: values.cardholderName,
                },
              },
            }
          )

          if (error) {
            trackCategory({
              eventProps: {
                eventAction: 'Deposit CC Confirm Payment Failed',
                eventCategory: 'Deposit CC Flow',
                clickID: 'deposit-cc-flow-event-donate-confirm-payment-failed',
              },
              extra: {
                errorMessage: error.message || '',
              },
            })
            setPaymentStatus('error')
            setErrorMessage(error.message ?? 'An unknown error occured')
          } else if (paymentIntent) {
            setPaymentStatus(paymentIntent.status)
          }
          setSubmitting(false)
        }}
        validationSchema={validationSchema}
      >
        {(formik) => {
          const { errors, values } = formik
          const isLoading = loading
          const isSubmitDisabled =
            Object.keys(errors).length > 0 ||
            values.amountRemaining === 0 ||
            !cardInfoComplete ||
            !!cardErrorMessage ||
            isLoading ||
            !stripe
          return (
            <Form>
              <FormContainer>
                <Fieldset disabled={isLoading} aria-busy={isLoading}>
                  <h2>Credit Card</h2>
                  <FormGroup style={{ marginTop: '2rem' }}>
                    <PaymentDonationSummary
                      amountRemaining={amountRemaining}
                      coverProcessingFee={true}
                      processingFeeCalc={`${processingFeePercent}% + 30c`}
                      processingFee={processingFee}
                      currency={currency}
                      total={total}
                    />
                  </FormGroup>
                  <FormGroup>
                    <PurpleBorderBox2>
                      <strong>
                        There is a payment processing fee for this donation
                      </strong>
                      <FinePrint>
                        We securely process payments through Stripe. Covering
                        this fee ensures it’s not deducted from your donation
                        and that 100% goes to supporting the project.
                      </FinePrint>
                    </PurpleBorderBox2>
                  </FormGroup>
                  <FormGroup>
                    <CreditCardImages />
                    <FormRow>
                      <FormikInput
                        name="cardholderName"
                        type="text"
                        placeholder="Cardhold Name"
                      />
                    </FormRow>
                    <FormRow>
                      <StripeCardElementWrapper>
                        <CardElement
                          options={CARD_OPTIONS}
                          onBlur={() => {
                            if (!cardInfoComplete && !cardErrorMessage) {
                              setCardErrorMessage(
                                'Please fill out all credit card information'
                              )
                            }
                          }}
                          onChange={(e) => {
                            const { complete } = e
                            setCardInfoComplete(complete)

                            if (complete) {
                              setCardErrorMessage('')
                            } else {
                              let eMessage = e.error?.message || ''

                              if (e.error) {
                                // override error message if any
                                if (e.error.code === 'incomplete_zip') {
                                  eMessage =
                                    foundation.currency === 'cad'
                                      ? 'Your postal code is incomplete.'
                                      : 'Your zip is incomplete.'
                                }
                              }
                              setCardErrorMessage(eMessage)
                            }
                          }}
                        />
                        {cardErrorMessage ? (
                          <FieldError>{cardErrorMessage}</FieldError>
                        ) : null}
                      </StripeCardElementWrapper>
                    </FormRow>
                  </FormGroup>
                  <FormGroup>
                    <PurpleBorderBox2>
                      <strong>A word on tax receipts</strong>
                      <FinePrint>
                        You’ll receive an official tax receipt from the
                        registered 501(c)(3) charity affiliated with the project
                        you’re supporting. The receipt will be in the amount
                        that you’re paying today. Please allow 3 weeks for this
                        payment to be processed before the charity can generate
                        your receipt.
                      </FinePrint>
                    </PurpleBorderBox2>
                  </FormGroup>

                  <ErrorMessage error={error || { message: errorMessage }} />

                  <Button disabled={isSubmitDisabled} type="submit">
                    Deposit{' '}
                    {formatAmountForDisplay({
                      amount: total,
                      currency,
                    })}
                  </Button>

                  <Paragraph topPadding>
                    Your payment information is securely processed through
                    Stripe. By continuing, you agree to Kernls{' '}
                    <Link href="/terms-of-use">
                      <a target="_blank">Terms of Use</a>
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy-policy">
                      <a target="_blank">Privacy Policy</a>
                    </Link>
                    .
                  </Paragraph>
                </Fieldset>
              </FormContainer>
            </Form>
          )
        }}
      </Formik>
    </sc.Wrapper>
  )
}
