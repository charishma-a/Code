import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import React, { FunctionComponent, useState } from 'react'
import * as yup from 'yup'

import * as sc from './ChampionResetPasswordForm.styled'
import { trackCategory } from '@/utils/analytics'
import { SubmitButton } from '../SubmitButton'
import { FormikInput } from '../Formik/FormikInput'

/* common */
import { Fieldset, FormContainer, FormGroup, FormRow } from '@/common/styled'

/* components */
import { ErrorMessage } from '../../ErrorMessage'

/* generated */
import { useResetPasswordMutation } from '@/generated/graphql'

/* styles */
import { setAccessToken } from '@/store/accessToken'
import {
  ERROR_MESSAGE_FIELD_REQUIRED,
  ROUTE_SECURE_CHAMPION_DASHBOARD,
} from '@/constants/config'
import { BaseComponentProps } from '@/common/types'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required(ERROR_MESSAGE_FIELD_REQUIRED)
    .min(8, 'Password is too short - should be 8 characters minimum')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters'),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Passwords don’t match. Please try again!'
    ),
})

interface IValues {
  password: string
  confirmPassword: string
}

export interface IChampionResetPasswordFormProps extends BaseComponentProps {
  code: string
  email: string
}

export const ChampionResetPasswordForm: FunctionComponent<IChampionResetPasswordFormProps> =
  (props) => {
    const { classNames, code, email, ...restProps } = props
    const router = useRouter()

    const className = [sc.baseClass, classNames].join(' ')

    // apollo
    const [resetPassword, { loading, error }] = useResetPasswordMutation()

    // react state
    const [errorMessage, setErrorMessage] = useState('')

    // inital form values
    const initialValues: IValues = {
      password: '',
      confirmPassword: '',
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
                resetToken: code,
                email,
                password: values.password,
              }
              const response = await resetPassword({
                variables: {
                  input,
                },
              })
              const { accessToken } = response?.data?.resetPassword
              setSubmitting(false)
              trackCategory({
                eventProps: {
                  eventCategory: 'Reset Confirm Password',
                  eventAction: 'Reset Password Match Success',
                  clickID: 'reset-password-match-success',
                },
              })
              setAccessToken(accessToken)
              router.push(ROUTE_SECURE_CHAMPION_DASHBOARD)
            } catch (err) {
              trackCategory({
                eventProps: {
                  eventCategory: 'Reset Confirm Password',
                  eventAction: 'Reset Password Match Failure',
                  clickID: 'reset-password-match-failure',
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
            const { errors } = formik

            const submitDisabled = Object.keys(errors).length > 0 || loading

            return (
              <Form>
                <FormContainer>
                  <Fieldset disabled={loading} aria-busy={loading}>
                    <>
                      <h2>Reset password</h2>
                      <FormGroup>
                        <FormRow>
                          <FormikInput
                            name="password"
                            type="password"
                            placeholder="Password"
                          />
                        </FormRow>

                        <FormRow>
                          <FormikInput
                            name="passwordConfirmation"
                            type="password"
                            placeholder="Confirm password"
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
                              eventAction: 'Reset Button',
                              eventCategory: 'Reset Password ',
                              clickID: 'password-reset-button-click',
                            },
                          })
                        }}
                      >
                        {loading ? 'Updating...' : 'Update'}
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
