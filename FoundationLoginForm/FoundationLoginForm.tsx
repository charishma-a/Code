import { Formik, Form } from 'formik'
import React, { FunctionComponent, useState } from 'react'

import * as sc from './FoundationLoginForm.styled'

import { SubmitButton } from '../SubmitButton'
import { FormikInput } from '../Formik/FormikInput'

/* common */
import { Fieldset, FormGroup, FormRow } from '../../../common/styled'

/* components */
import { ErrorMessage } from '../../ErrorMessage'

/* generated */
import { useFoundationLoginMutation } from '../../../generated/graphql'

const foundationLoginFormBaseClass = 'kernls-foundation-login-form'

export interface FoundationLoginFormInitialValues {
  username: string
  password: string
}

export interface FoundationLoginFormProps {
  className?: string
}

export const FoundationLoginForm: FunctionComponent<FoundationLoginFormProps> =
  (props) => {
    const { className } = props

    const classNames = [foundationLoginFormBaseClass, className].join(' ')

    // apollo
    const [foundationLogin, { loading, error }] = useFoundationLoginMutation()

    // react state
    const [errorMessage, setErrorMessage] = useState('')

    // inital form values
    const initialValues: FoundationLoginFormInitialValues = {
      username: '',
      password: '',
    }

    return (
      <sc.Wrapper className={classNames}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, formikHelpers) => {
            const { setSubmitting } = formikHelpers
            setSubmitting(true)
            setErrorMessage('')

            try {
              const input = {
                username: values.username,
                password: values.password,
              }
              const response = await foundationLogin({
                variables: {
                  input,
                },
              })
              const url = response?.data?.foundationLogin

              if (url) {
                window.location.replace(url)
                setSubmitting(false)
                return
              }

              setSubmitting(false)
              throw new Error('Invalid url')
            } catch (e) {
              setErrorMessage(e.message)
              setSubmitting(false)
              return null
            }
          }} // find submitting logic in FoundationLoginForm
          validate={(values) => {
            const errors: Partial<FoundationLoginFormInitialValues> = {}

            if (!values.username) {
              errors.username = 'This field is required'
            }

            if (!values.password) {
              errors.password = 'This field is required'
            }

            return errors
          }}
        >
          {(formik) => {
            const { errors } = formik

            const submitDisabled = Object.keys(errors).length > 0 || loading

            return (
              <Form>
                <sc.Container>
                  <Fieldset
                    disabled={loading}
                    aria-busy={loading}
                    style={{ maxWidth: '400px', width: '100%' }}
                  >
                    <>
                      <FormGroup>
                        <h2>Foundation Login</h2>

                        <FormRow>
                          <FormikInput
                            name="username"
                            type="text"
                            placeholder="Username"
                          />
                        </FormRow>

                        <FormRow>
                          <FormikInput
                            name="password"
                            type="password"
                            placeholder="Password"
                          />
                        </FormRow>
                      </FormGroup>

                      <ErrorMessage
                        error={error || { message: errorMessage }}
                      />

                      <SubmitButton disabled={submitDisabled} type="submit">
                        Login
                      </SubmitButton>
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
