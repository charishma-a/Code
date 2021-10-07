import { Formik, Form } from 'formik'
import React from 'react'
import { useRouter } from 'next/router'

import * as sc from './BackerDepositStepTwo.styled'
import { renderSections, validateBackerDepositForm } from './utils'

import { FormikCheckbox } from '../Form/Formik/FormikCheckbox'
import { FormikDonationAmountInput } from '../Form/Formik/FormikDonationAmountInput'
import { StripePayButton } from '../Form/StripePayButton'

/* common */
import {
  ApplicationFeeBox,
  Fieldset,
  FinePrint,
  FormGroup,
  H1Purple,
  H2,
  LineItem,
} from '@/common/styled'

/* generated */
import { useCreateDepositMutation } from '@/generated/graphql'

/* utils */
import {
  calculateACHProcessingFee,
  formatAmountForDisplay,
  roundTwoDecimal,
} from '@/utils/stripe-helpers'
import { TRACK_EVENT_CATEGORY } from './constants'
import { trackCategory } from '@/utils/analytics'
import { ChampionDepositSummary } from './ChampionDepositSummary'

export interface BackerDepositFormInitialValues {
  coverProcessingFee: boolean
  amount: number
}

interface BackerDepositStepTwoProps {
  accessCode: string
  amountRemaining: number
  currency: string
  matchCommitment: number
  profileId: string
  setErrorMessage: (errorMessage: string) => void
}

export const BackerDepositStepTwo: React.FC<BackerDepositStepTwoProps> = ({
  accessCode,
  amountRemaining = 0,
  currency,
  matchCommitment,
  profileId,
  setErrorMessage,
}) => {
  // apollo
  const [createDeposit] = useCreateDepositMutation()

  const router = useRouter()

  // inital form values
  const initialValues: BackerDepositFormInitialValues = {
    coverProcessingFee: false,
    amount: amountRemaining,
  }

  return (
    <sc.Wrapper>
      <H1Purple>You’ve successfully connected to your bank account.</H1Purple>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values, formikHelpers) => {
          const { setSubmitting } = formikHelpers
          const { amount = 0, coverProcessingFee = false } = values

          try {
            const createDepositInput = {
              amount,
              code: accessCode,
              coverProcessingFee,
              profileId,
            }
            const response = await createDeposit({
              variables: {
                input: createDepositInput,
              },
            })
            const result = response?.data?.createDeposit

            if (!result) {
              throw new Error('Something went wrong')
            }
            trackCategory({
              eventProps: {
                eventCategory: TRACK_EVENT_CATEGORY,
                eventAction: 'Deposit CTA success',
                clickID: 'backer-ach-deposit-result-submit-success',
              },
              extra: {
                depositId: result.id,
              },
            })
            router.push(`/backer/deposit/${result.id}`)
          } catch (e) {
            trackCategory({
              eventProps: {
                eventCategory: TRACK_EVENT_CATEGORY,
                eventAction: 'Deposit CTA failure',
                clickID: 'backer-ach-deposit-result-submit-failure',
              },
              extra: {
                errorMessage: e.message,
              },
            })
            setErrorMessage(e.message)
            return null
          }

          setSubmitting(false)
        }}
        validate={(values) =>
          validateBackerDepositForm({
            maxmimumDepositAmount: amountRemaining,
            minmumDepositAmount: amountRemaining,
            values,
          })
        }
      >
        {(formik) => {
          const { isSubmitting, values } = formik
          const { amount = 0, coverProcessingFee = false } = values

          const processingFee =
            calculateACHProcessingFee({
              amount,
            }) || 0

          const total = coverProcessingFee
            ? roundTwoDecimal({ num: processingFee + amount }) || 0
            : amount || 0

          return (
            <Form>
              <Fieldset disabled={isSubmitting} aria-busy={isSubmitting}>
                <FormGroup>
                  <ChampionDepositSummary
                    amountRemaining={amountRemaining}
                    coverProcessingFee={coverProcessingFee}
                    currency={currency}
                    processingFee={processingFee}
                    total={total}
                  />
                </FormGroup>
                <FormGroup>
                  <ApplicationFeeBox>
                    <FormikCheckbox
                      onChecked={(value) => {
                        const valueBoolean = Boolean(value)
                        // trackCategory({
                        //   eventProps: {
                        //     eventAction: 'Donation Button Click',
                        //     eventCategory: 'Donation Flow',
                        //     clickID: 'donation-flow-click-fees',
                        //     clickText: String(!valueBoolean),
                        //   },
                        // })
                      }}
                      name="coverProcessingFee"
                      style={{ margin: 0 }}
                    >
                      I’d like to cover the (
                      {formatAmountForDisplay({
                        amount: processingFee,
                        currency,
                      })}
                      ) payment processing fee for my donation
                    </FormikCheckbox>
                    <FinePrint>
                      We securely process payments through Stripe. Covering this
                      fee ensures it’s not deducted from your donation and that
                      100% goes to supporting the project.
                    </FinePrint>
                  </ApplicationFeeBox>
                </FormGroup>

                <FormGroup>
                  <sc.TaxReceiptNote>
                    <strong>A word on tax receipts</strong>
                    <p>
                      You’ll receive an official tax receipt from the registered
                      501(c)(3) charity affiliated with the project you’re
                      supporting. The receipt will be in the amount that you’re
                      paying today. Please allow 3 weeks for this payment to be
                      processed before the charity can generate your receipt.
                    </p>
                  </sc.TaxReceiptNote>
                </FormGroup>

                <StripePayButton
                  type="submit"
                  onClick={() => {
                    trackCategory({
                      eventProps: {
                        eventCategory: TRACK_EVENT_CATEGORY,
                        eventAction: 'Deposit CTA',
                        clickID: 'backer-ach-deposit-click-submit',
                      },
                      extra: {
                        ...values,
                        matchCommitment,
                        amountRemaining,
                        processingFee,
                        total,
                      },
                    })
                  }}
                >
                  Deposit {formatAmountForDisplay({ amount: total, currency })}
                </StripePayButton>
              </Fieldset>
            </Form>
          )
        }}
      </Formik>
    </sc.Wrapper>
  )
}
