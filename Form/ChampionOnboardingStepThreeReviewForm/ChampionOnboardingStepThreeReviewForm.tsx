import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { trackCategory } from '@/utils/analytics'
import * as sc from './ChampionOnboardingStepThreeReviewForm.styled'

import { BaseComponentProps } from '@/common/types'
import {
  ERROR_MESSAGE_FIELD_REQUIRED,
  ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_3_SUCCESS,
} from '@/constants/config'
import { Fieldset, FormGroup, FormRow } from '@/common/styled'
import { SecondaryButton, SubmitButton } from '../SubmitButton'
import { ErrorMessage } from '@/components/ErrorMessage'
import {
  Profile,
  useSendTestEmailMutation,
  useSubmitOnboardingStepThreeReviewFormMutation,
} from '@/generated/graphql'
import { useRouter } from 'next/router'
import { FormikInput } from '../Formik/FormikInput'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'
import { FieldError } from '../FieldError'
import { Paragraph } from '@/components/Paragraph'

const validationSchema = yup.object().shape({
  contacts: yup
    .array()
    .of(
      yup.object().shape({
        email: yup
          .string()
          .email('Must be a valid email')
          .required(ERROR_MESSAGE_FIELD_REQUIRED),
        firstName: yup.string().required(ERROR_MESSAGE_FIELD_REQUIRED),
        lastName: yup.string(),
      })
    )
    .min(1, 'You must provide at least one contact')
    .required(ERROR_MESSAGE_FIELD_REQUIRED),
})

type Contact = {
  email: string
  firstName: string
  lastName?: string
}

export interface ChampionOnboardingStepThreeReviewFormInitialValues {
  contacts: Contact[]
}

interface ChampionOnboardingStepThreeReviewFormProps
  extends BaseComponentProps {
  me: Profile
}

export const ChampionOnboardingStepThreeReviewForm: React.FC<ChampionOnboardingStepThreeReviewFormProps> =
  ({ classNames, me }) => {
    const router = useRouter()
    const className = [sc.baseClass, classNames].join(' ')

    // apollo
    const [submitOnboardingStepThreeReviewForm, { loading, error }] =
      useSubmitOnboardingStepThreeReviewFormMutation()
    const [
      sendTestEmail,
      { loading: loadingSendTestEmail, error: errorSendTestEmail },
    ] = useSendTestEmailMutation()

    // react state
    const [errorMessage, setErrorMessage] = useState('')

    // inital form values
    const onboardingEmail = me.projectChampion?.activeCampaign?.onboardingEmail
    console.warn('onboardingEmail', onboardingEmail)
    const initialValues: ChampionOnboardingStepThreeReviewFormInitialValues = {
      contacts: [],
    }

    const onSendTestEmail = async () => {
      trackCategory({
        eventProps: {
          eventAction: 'Review And Send Test Email',
          eventCategory: 'Review And Send',
          clickID: 'review-and-send-test-email-button-click',
        },
      })

      try {
        await sendTestEmail({
          variables: {
            input: {
              id: onboardingEmail.id,
            },
          },
        })
        trackCategory({
          eventProps: {
            eventAction: 'Review And Send Test Email Success',
            eventCategory: 'Review And Send',
            clickID: 'review-and-send-test-email-success',
          },
        })
        toast(`Successfully sent a message to: ${me.email}`)
      } catch (err) {
        trackCategory({
          eventProps: {
            eventAction: 'Review And Send Test Email Failure',
            eventCategory: 'Review And Send',
            clickID: 'review-and-send-test-email-failure',
          },
        })
        runCommonFormCatchHandlers({
          err,
          setErrorMessage,
        })
      }
    }

    return (
      <sc.Wrapper className={className}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, formikHelpers) => {
            const { setFieldError, setSubmitting } = formikHelpers
            setSubmitting(true)
            setErrorMessage('')

            try {
              const updateOnboardingStepInput = {
                slug: 'done',
              }
              trackCategory({
                eventProps: {
                  eventAction: 'Review And Send Email Now Success',
                  eventCategory: 'Review And Send',
                  clickID: 'review-and-send-email-success',
                },
              })
              const sendEmailInput = {
                id: onboardingEmail.id,
                contacts: values.contacts,
              }
              await submitOnboardingStepThreeReviewForm({
                variables: {
                  sendEmailInput,
                  updateOnboardingStepInput,
                },
              })

              router.push(ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_3_SUCCESS)

              setSubmitting(false)
            } catch (err) {
              trackCategory({
                eventProps: {
                  eventAction: 'Review And Send Email Now Failure',
                  eventCategory: 'Review And Send',
                  clickID: 'review-and-send-email-failure',
                },
              })
              runCommonFormCatchHandlers({
                err,
                setErrorMessage,
                setFieldError,
                setSubmitting,
              })
            }
          }}
          validationSchema={validationSchema}
        >
          {(formik) => {
            const { errors, touched } = formik

            const isFormLoading = loading || loadingSendTestEmail
            const submitDisabled =
              Object.keys(errors).length > 0 || isFormLoading

            return (
              <Form>
                <sc.Container>
                  <Fieldset disabled={isFormLoading} aria-busy={isFormLoading}>
                    <>
                      <FormGroup
                        style={{
                          borderBottom: '1px solid #E5E5E5',
                          marginTop: '2rem',
                          paddingBottom: '2rem',
                        }}
                      >
                        <h3>Add contacts</h3>
                        {[0, 1, 2].map((index) => {
                          return (
                            <FormRow key={index}>
                              <FormikInput
                                name={`contacts[${index}].email`}
                                type="email"
                                placeholder="Email"
                              />
                              <FormikInput
                                name={`contacts[${index}].firstName`}
                                type="text"
                                placeholder="First name"
                              />
                              <FormikInput
                                name={`contacts[${index}].lastName`}
                                type="text"
                                placeholder="Last name (optional)"
                              />
                            </FormRow>
                          )
                        })}
                        {touched.contacts &&
                        errors.contacts &&
                        typeof errors.contacts === 'string' ? (
                          <FieldError className="error">
                            {errors.contacts}
                          </FieldError>
                        ) : null}
                      </FormGroup>

                      <sc.ActionsContainer>
                        <sc.ActionItem>
                          <div>
                            <Paragraph>
                              <strong>Test email</strong>
                            </Paragraph>
                            <Paragraph>
                              Preview the email by sending yourself a test.
                            </Paragraph>
                          </div>
                          <SecondaryButton
                            onClick={onSendTestEmail}
                            type="button"
                          >
                            {loading ? 'Send test email...' : 'Send test email'}
                          </SecondaryButton>
                        </sc.ActionItem>
                        <sc.ActionItem>
                          <div>
                            <Paragraph>
                              <strong>Send email</strong>
                            </Paragraph>
                            <Paragraph>Send the email to friends</Paragraph>
                          </div>
                          <SubmitButton
                            disabled={submitDisabled}
                            type="submit"
                            onClick={() => {
                              trackCategory({
                                eventProps: {
                                  eventAction: 'Review And Send Email Now',
                                  eventCategory: 'Review And Send',
                                  clickID: 'review-and-send-email-button-click',
                                },
                              })
                            }}
                          >
                            {loading ? 'Send email now...' : 'Send email now'}
                          </SubmitButton>
                        </sc.ActionItem>
                        <ErrorMessage
                          error={
                            error ||
                            errorSendTestEmail || { message: errorMessage }
                          }
                        />
                      </sc.ActionsContainer>
                    </>
                  </Fieldset>
                </sc.Container>
              </Form>
            )
          }}
        </Formik>
      </sc.Wrapper>
    )
  }
