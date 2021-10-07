import { Formik, Form } from 'formik'
import React, { FunctionComponent, useState } from 'react'
import * as yup from 'yup'

import * as sc from './ChampionForgotPasswordForm.styled'
import { trackCategory } from '@/utils/analytics'
import { Button, SubmitButton } from '../SubmitButton'
import { FormikInput } from '../Formik/FormikInput'

/* common */
import { Fieldset, FormContainer, FormGroup, FormRow } from '@/common/styled'

/* components */
import { ErrorMessage } from '../../ErrorMessage'

/* generated */
import { useRequestPasswordResetMutation } from '@/generated/graphql'

/* styles */
import { Paragraph } from '@/components/Paragraph'
import { ERROR_MESSAGE_FIELD_REQUIRED } from '@/constants/config'
import { BaseComponentProps } from '@/common/types'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required(ERROR_MESSAGE_FIELD_REQUIRED)
    .email('Please enter a valid email.'),
})

interface IValues {
  email: string
}

export const ChampionForgotPasswordForm: FunctionComponent<BaseComponentProps> =
  ({ classNames, ...restProps }) => {
    const className = [sc.baseClass, classNames].join(' ')

    // apollo
    const [requestPasswordReset, { loading, error }] =
      useRequestPasswordResetMutation()

    // react state
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const [resendSuccess, setResendSuccess] = useState(false)

    // inital form values
    const initialValues: IValues = {
      email: '',
    }

    return (
      <sc.Wrapper className={className} {...restProps}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, formikHelpers) => {
            const { setFieldError, setSubmitting } = formikHelpers
            setSubmitting(true)
            setErrorMessage('')
            setSuccess(false)

            try {
              const input = {
                email: values.email,
              }
              await requestPasswordReset({
                variables: {
                  input,
                },
              })
              setSubmitting(false)
            } catch (err) {
              runCommonFormCatchHandlers({
                err,
                setErrorMessage,
                setFieldError,
                setSubmitting,
              })
            }
            setSuccess(true)
          }} // find submitting logic in ChampionForgotPasswordForm
          validationSchema={validationSchema}
        >
          {(formik) => {
            const { errors, values } = formik

            const submitDisabled = Object.keys(errors).length > 0 || loading

            if (success) {
              const onClickResend = async () => {
                trackCategory({
                  eventProps: {
                    eventAction: 'Forgot Password Resend Email ',
                    eventCategory: 'Forgot Password',
                    clickID: 'forgot-password-resend-button-click',
                  },
                })
                setResendSuccess(false)
                await requestPasswordReset({
                  variables: {
                    input: { email: values.email },
                  },
                })
                setResendSuccess(true)
              }
              // if(resendSuccess){
              //   trackCategory({
              //     eventProps: {
              //       eventAction: 'Forgot Password Resend Success ',
              //       eventCategory: 'Forgot Password',
              //       clickID: 'forgot-password-resend-success',
              //     },
              //   })
              // }
              //
              //   trackCategory({
              //     eventProps: {
              //       eventAction: 'Forgot Password Resend Failure ',
              //       eventCategory: 'Forgot Password',
              //       clickID: 'forgot-password-resend-failure',
              //     },
              //   })
              //
              return (
                <div>
                  <h2>Check your email</h2>
                  <Paragraph>
                    Please check the email address {values.email} for
                    instructions to reset your password.
                  </Paragraph>
                  {resendSuccess ? (
                    <Paragraph topPadding>
                      Successfully resent to {values.email}.
                    </Paragraph>
                  ) : null}
                  <Button disabled={loading} topMargin onClick={onClickResend}>
                    {loading ? 'Resend email...' : 'Resend email'}
                  </Button>
                </div>
              )
            }

            return (
              <Form>
                <FormContainer>
                  <Fieldset disabled={loading} aria-busy={loading}>
                    <>
                      <h2>Forgot your password?</h2>
                      <Paragraph>
                        Enter your email address and we will send you
                        instructions to reset your password.
                      </Paragraph>
                      <FormGroup style={{ marginTop: '1rem' }}>
                        <FormRow>
                          <FormikInput
                            name="email"
                            type="email"
                            placeholder="Email"
                          />
                        </FormRow>
                      </FormGroup>

                      <ErrorMessage
                        error={error || { message: errorMessage }}
                      />

                      <SubmitButton
                        disabled={submitDisabled}
                        type="submit"
                        onClick={() => {
                          trackCategory({
                            eventProps: {
                              eventAction: 'Forgot Password Reset ',
                              eventCategory: 'Forgot Password',
                              clickID: 'forgot-password-reset-button-click',
                            },
                          })
                        }}
                      >
                        {loading ? 'Resetting password...' : 'Reset password'}
                      </SubmitButton>
                    </>
                  </Fieldset>
                </FormContainer>
              </Form>
            )
          }}
        </Formik>
      </sc.Wrapper>
    )
  }
