import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { CircularProgress } from '@material-ui/core'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useRouter } from 'next/router'

import * as sc from './ChampionPaymentDirectDepositForm.styled'

import { BaseComponentProps } from '@/common/types'
import {
  PurpleBorderBox2,
  Fieldset,
  FinePrint,
  FormContainer,
  FormGroup,
  EmptyCenterView,
} from '@/common/styled'
import {
  ERROR_MESSAGE_FIELD_REQUIRED,
  PROCESSING_ACH_FEE_PERCENT,
  ROUTE_SECURE_CHAMPION_PAYMENTS_DIRECT_SUCCESS,
} from '@/constants/config'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'
import { PaymentDonationSummary } from '@/components/PaymentDonationSummary'
import { Paragraph } from '@/components/Paragraph'
import { Button } from '../SubmitButton'
import {
  calculateACHProcessingFee,
  formatAmountForDisplay,
  roundTwoDecimal,
} from '@/utils/stripe-helpers'
import { CardPrimary } from '@/components/Card'
import {
  useCreateDepositAuthMutation,
  useMyActiveProjectCampaignQuery,
} from '@/generated/graphql'
import { ErrorMessage } from '@/components/ErrorMessage'
import { trackCategory } from '@/utils/analytics'
import { FormikCheckbox } from '../Formik/FormikCheckbox'
import { TRACK_EVENT_CATEGORY } from '@/components/BackerDeposit/constants'

const validationSchema = yup.object().shape({
  amountRemaining: yup
    .number()
    .moreThan(0, 'Amount must be over $0')
    .required(ERROR_MESSAGE_FIELD_REQUIRED),
})

interface IValues {
  amountRemaining: number
  coverProcessingFee: boolean
}

export const ChampionPaymentDirectDepositForm: React.FC<BaseComponentProps> = ({
  classNames,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')

  const router = useRouter()

  // apollo
  const { data, loading, error } = useMyActiveProjectCampaignQuery()
  const [createDepositAuth] = useCreateDepositAuthMutation()

  // react state
  const [errorMessage, setErrorMessage] = useState('')

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

  // inital form values
  const initialValues: IValues = {
    amountRemaining,
    coverProcessingFee: false,
  }

  if (amountRemaining === 0) {
    return (
      <sc.Wrapper className={className} {...restProps}>
        <CardPrimary>
          <h2>Direct Deposit</h2>
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
          setErrorMessage('')

          try {
            const input = {
              amount: values.amountRemaining,
              coverProcessingFee: values.coverProcessingFee,
            }
            trackCategory({
              eventProps: {
                eventAction: TRACK_EVENT_CATEGORY,
                eventCategory: 'Deposit DD Flow',
                clickID: 'deposit-dd-flow-click-donate',
              },
              extra: input,
            })
            const res = await createDepositAuth({
              variables: {
                input,
              },
            })
            trackCategory({
              eventProps: {
                eventCategory: TRACK_EVENT_CATEGORY,
                eventAction: 'Deposit CTA success',
                clickID: 'backer-ach-deposit-result-submit-success',
              },
              extra: {
                depositId: res?.data?.createDepositAuth?.id,
              },
            })
            toast('Success! Your payment was accepted! 🎉')
            router.push(ROUTE_SECURE_CHAMPION_PAYMENTS_DIRECT_SUCCESS)
          } catch (err) {
            trackCategory({
              eventProps: {
                eventCategory: TRACK_EVENT_CATEGORY,
                eventAction: 'Deposit DD CTA failure',
                clickID: 'deposit-dd-result-submit-failure',
              },
              extra: {
                errorMessage: err.message,
              },
            })
            runCommonFormCatchHandlers({
              err,
              setErrorMessage,
              setFieldError,
              useToast: true,
            })
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
            isLoading

          const processingFee =
            calculateACHProcessingFee({
              amount: amountRemaining,
            }) || 0

          const total = values.coverProcessingFee
            ? roundTwoDecimal({ num: processingFee + amountRemaining }) || 0
            : amountRemaining || 0

          const processingFeeCalc =
            processingFee >= 5
              ? formatAmountForDisplay({
                  amount: 5,
                  currency,
                })
              : `${PROCESSING_ACH_FEE_PERCENT}%`
          return (
            <Form>
              <FormContainer>
                <Fieldset disabled={isLoading} aria-busy={isLoading}>
                  <h2>Direct Deposit</h2>
                  <FormGroup style={{ marginTop: '2rem' }}>
                    <PaymentDonationSummary
                      amountRemaining={amountRemaining}
                      coverProcessingFee={true}
                      processingFeeCalc={processingFeeCalc}
                      processingFee={processingFee}
                      currency={currency}
                      total={total}
                    />
                  </FormGroup>
                  <FormGroup>
                    <PurpleBorderBox2>
                      <FormikCheckbox
                        onChecked={(value) => {
                          const valueBoolean = Boolean(value)
                          trackCategory({
                            eventProps: {
                              eventAction: TRACK_EVENT_CATEGORY,
                              eventCategory: 'Deposit DD Flow',
                              clickID: 'deposit-dd-flow-click-fees',
                              clickText: String(!valueBoolean),
                            },
                          })
                        }}
                        name="coverProcessingFee"
                        style={{ margin: 0 }}
                      >
                        <strong>
                          I’d like to cover the (
                          {formatAmountForDisplay({
                            amount: processingFee,
                            currency,
                          })}
                          ) payment processing fee for my donation
                        </strong>
                      </FormikCheckbox>
                      <FinePrint>
                        We securely process payments through Stripe. Covering
                        this fee ensures it’s not deducted from your donation
                        and that 100% goes to supporting the project.
                      </FinePrint>
                    </PurpleBorderBox2>
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
