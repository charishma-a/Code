import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import React, { FunctionComponent, useState } from 'react'
import * as yup from 'yup'

import * as sc from './ChampionSignupForm.styled'
import { trackCategory } from '@/utils/analytics'
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
import { useSignupMutation } from '@/generated/graphql'

/* styles */
import { setAccessToken } from '@/store/accessToken'
import {
  ERROR_MESSAGE_FIELD_REQUIRED,
  ROUTE_CHAMPOIN_GOOGLE_LOGIN,
  ROUTE_SECURE_CHAMPION_DASHBOARD,
} from '@/constants/config'
import { SVG_PROPS_GOOGLE } from '@/constants/svgs'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'
import { BaseComponentProps } from '@/common/types'

const validationSchema = yup.object().shape({
  firstName: yup.string().required(ERROR_MESSAGE_FIELD_REQUIRED),
  lastName: yup.string().required(ERROR_MESSAGE_FIELD_REQUIRED),
  email: yup
    .string()
    .required(ERROR_MESSAGE_FIELD_REQUIRED)
    .email('Please enter a valid email.'),
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
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export const ChampionSignupForm: FunctionComponent<BaseComponentProps> = ({
  classNames,
  ...restProps
}) => {
  const router = useRouter()

  const className = [sc.baseClass, classNames].join(' ')

  // apollo
  const [signup, { loading, error }] = useSignupMutation()

  // react state
  const [errorMessage, setErrorMessage] = useState('')

  // inital form values
  const initialValues: IValues = {
    firstName: '',
    lastName: '',
    email: '',
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
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              password: values.password,
            }
            const response = await signup({
              variables: {
                input,
              },
            })
            const { accessToken } = response?.data?.signup
            setSubmitting(false)
            trackCategory({
              eventProps: {
                eventCategory: 'SignUp',
                eventAction: 'SignUp Success',
                clickID: 'signup-success',
              },
            })
            setAccessToken(accessToken)
            router.push(ROUTE_SECURE_CHAMPION_DASHBOARD)
          } catch (err) {
            trackCategory({
              eventProps: {
                eventCategory: 'SignUp',
                eventAction: 'SignUp Failure',
                clickID: 'signup-failure',
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
          const { errors, values } = formik

          const submitDisabled = Object.keys(errors).length > 0 || loading

          return (
            <Form>
              <FormContainer>
                <Fieldset disabled={loading} aria-busy={loading}>
                  <>
                    <h2>Sign up</h2>
                    <FormGroup>
                      <FormRow>
                        <FormikInput
                          name="firstName"
                          type="text"
                          placeholder="First name"
                        />
                        <FormikInput
                          name="lastName"
                          type="text"
                          placeholder="Last name"
                        />
                      </FormRow>

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

                      {values.password ? (
                        <FormRow>
                          <FormikInput
                            name="passwordConfirmation"
                            type="password"
                            placeholder="Confirm password"
                          />
                        </FormRow>
                      ) : null}
                    </FormGroup>

                    <ErrorMessage error={error || { message: errorMessage }} />

                    <SubmitButton
                      disabled={submitDisabled}
                      type="submit"
                      onClick={() => {
                        trackCategory({
                          eventProps: {
                            eventAction: 'SignUp Button',
                            eventCategory: 'SignUp ',
                            clickID: 'signup-button-click',
                          },
                        })
                      }}
                    >
                      Sign up
                    </SubmitButton>
                    <GoogleLinkButton
                      href={ROUTE_CHAMPOIN_GOOGLE_LOGIN}
                      topMargin
                      onClick={() => {
                        trackCategory({
                          eventProps: {
                            eventAction: 'Sign In With Google Button',
                            eventCategory: 'Sign In With Google ',
                            clickID: 'sign-in-with-google-button-click',
                          },
                        })
                      }}
                    >
                      <img
                        src={SVG_PROPS_GOOGLE.getSrc()}
                        width="24"
                        height="24"
                      />
                      <span>Sign up with Google</span>
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
