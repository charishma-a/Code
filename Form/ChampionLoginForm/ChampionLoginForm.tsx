import { Formik, Form } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent, useState } from 'react'
import * as yup from 'yup'
import { trackCategory } from '@/utils/analytics'
import * as sc from './ChampionLoginForm.styled'

import { SubmitButton } from '../SubmitButton'
import { FormikInput } from '../Formik/FormikInput'

/* common */
import {
  Fieldset,
  FormContainer,
  FormGroup,
  FormRow,
  GoogleLinkButton,
} from '@/common/styled'

/* components */
import { ErrorMessage } from '../../ErrorMessage'

/* generated */
import { useLoginMutation } from '@/generated/graphql'

/* styles */
import { setAccessToken } from '@/store/accessToken'
import {
  ERROR_MESSAGE_FIELD_REQUIRED,
  ROUTE_CHAMPION_FORGOT_PASSWORD,
  ROUTE_CHAMPOIN_GOOGLE_LOGIN,
  ROUTE_SECURE_CHAMPION_DASHBOARD,
} from '@/constants/config'
import { SVG_PROPS_GOOGLE } from '@/constants/svgs'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'
import { BaseComponentProps } from '@/common/types'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required(ERROR_MESSAGE_FIELD_REQUIRED)
    .email('Please enter a valid email.'),
  password: yup.string().required(ERROR_MESSAGE_FIELD_REQUIRED),
})

export interface ChampionLoginFormInitialValues {
  email: string
  password: string
}

export const ChampionLoginForm: FunctionComponent<BaseComponentProps> = ({
  classNames,
  ...restProps
}) => {
  const router = useRouter()

  const className = [sc.baseClass, classNames].join(' ')

  // apollo
  const [login, { loading, error }] = useLoginMutation()

  // react state
  const [errorMessage, setErrorMessage] = useState('')

  // inital form values
  const initialValues: ChampionLoginFormInitialValues = {
    email: '',
    password: '',
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
              email: values.email,
              password: values.password,
            }
            const response = await login({
              variables: {
                input,
              },
            })
            const { accessToken } = response?.data?.login
            setSubmitting(false)
            setAccessToken(accessToken)
            trackCategory({
              eventProps: {
                eventAction: 'Login Success ',
                eventCategory: 'Login',
                clickID: 'login-success',
              },
            })

            router.push(ROUTE_SECURE_CHAMPION_DASHBOARD)
          } catch (err) {
            trackCategory({
              eventProps: {
                eventAction: 'Login Failure ',
                eventCategory: 'Login',
                clickID: 'login-failure',
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
                    <h2>Login</h2>
                    <FormGroup>
                      <FormRow>
                        <FormikInput
                          name="email"
                          type="email"
                          placeholder="Email"
                        />
                      </FormRow>

                      <FormRow>
                        <FormikInput
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                      </FormRow>

                      <FormRow>
                        <Link href={ROUTE_CHAMPION_FORGOT_PASSWORD}>
                          <a
                            className="kernls-purple"
                            onClick={() => {
                              trackCategory({
                                eventProps: {
                                  eventAction: 'Login Forgot Password',
                                  eventCategory: 'Login',
                                  clickID: 'login-forgot-password-link-click',
                                },
                              })
                            }}
                          >
                            Forgot your password?
                          </a>
                        </Link>
                      </FormRow>
                    </FormGroup>

                    <ErrorMessage error={error || { message: errorMessage }} />

                    <SubmitButton
                      disabled={submitDisabled}
                      type="submit"
                      onClick={() => {
                        trackCategory({
                          eventProps: {
                            eventAction: 'Login Button',
                            eventCategory: 'Login',
                            clickID: 'login-button-click',
                          },
                        })
                      }}
                    >
                      Login
                    </SubmitButton>
                    <GoogleLinkButton
                      href={ROUTE_CHAMPOIN_GOOGLE_LOGIN}
                      topMargin
                      onClick={() => {
                        trackCategory({
                          eventProps: {
                            eventAction: 'SignUp With Google',
                            eventCategory: 'Login',
                            clickID: 'signup-with-google-button-click',
                          },
                        })
                      }}
                    >
                      <img
                        src={SVG_PROPS_GOOGLE.getSrc()}
                        width="24"
                        height="24"
                      />
                      <span>Google Login</span>
                    </GoogleLinkButton>
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
