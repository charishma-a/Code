import { Formik, Form } from 'formik'
import React, { FunctionComponent, useState } from 'react'
import * as yup from 'yup'
import { toast } from 'react-toastify'

import * as sc from './ChampionAccountForm.styled'

import { SecondaryButton, SubmitButton } from '../SubmitButton'
import { FormikInput } from '../Formik/FormikInput'

/* common */
import { Fieldset, FormContainer, FormGroup, FormRow } from '@/common/styled'

/* components */
import { ErrorMessage } from '../../ErrorMessage'

/* generated */

import {
  Maybe,
  MeDocument,
  Profile,
  useUpdateMyPasswordMutation,
  useUpdateMyProfileMutation,
} from '@/generated/graphql'

/* styles */
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'
import { BaseComponentProps } from '@/common/types'
import { ERROR_MESSAGE_FIELD_REQUIRED } from '@/constants/config'
import { Paragraph } from '@/components/Paragraph'

const validationSchema = yup.object().shape({
  firstName: yup.string().required(ERROR_MESSAGE_FIELD_REQUIRED),
  lastName: yup.string().required(ERROR_MESSAGE_FIELD_REQUIRED),
  email: yup.string(),
  showPassword: yup.boolean(),
  currentPassword: yup.string().when('showPassword', {
    is: true,
    then: yup.string(),
    otherwise: yup.string(),
  }),
  password: yup.string().when('showPassword', {
    is: true,
    then: yup
      .string()
      .required(ERROR_MESSAGE_FIELD_REQUIRED)
      .min(8, 'Password is too short - should be 8 characters minimum')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters'),
    otherwise: yup.string(),
  }),
  confirmPassword: yup.string().when('showPassword', {
    is: true,
    then: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        'Passwords don’t match. Please try again!'
      ),
    otherwise: yup.string(),
  }),
})

interface IValues {
  firstName: string
  lastName: string
  email: string
  showPassword: boolean
  currentPassword: string
  password: string
  confirmPassword: string
}

export interface ChampionAccountFormProps extends BaseComponentProps {
  me: Maybe<Profile>
}

export const ChampionAccountForm: FunctionComponent<ChampionAccountFormProps> =
  ({ classNames, me, ...restProps }) => {
    const className = [sc.baseClass, classNames].join(' ')

    // apollo
    const [
      updateMyProfile,
      { loading: loadingUpdateProfile, error: errorUpdateProfile },
    ] = useUpdateMyProfileMutation()
    const [
      updateMyPassword,
      { loading: loadingUpdatePassword, error: errorUpdatePassword },
    ] = useUpdateMyPasswordMutation()

    // react state
    const [errorMessage, setErrorMessage] = useState('')

    // inital form values
    const initialValues: IValues = {
      firstName: me.firstName || '',
      lastName: me.lastName || '',
      email: me.email || '',
      showPassword: false,
      currentPassword: '',
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
              const updateProfileInput = {
                firstName: values.firstName,
                lastName: values.lastName,
              }
              const updatePasswordInput = {
                password: values.password,
                currentPassword: values.currentPassword,
              }
              await updateMyProfile({
                variables: { input: updateProfileInput },
                refetchQueries: [{ query: MeDocument }],
              })
              if (values.showPassword) {
                await updateMyPassword({
                  variables: { input: updatePasswordInput },
                })
              }

              toast('Success! Your changes have been saved.')
            } catch (err) {
              runCommonFormCatchHandlers({
                err,
                setErrorMessage,
                setFieldError,
                setSubmitting,
                useToast: true,
              })
            }
          }} // find submitting logic in ChampionAccountForm
          validationSchema={validationSchema}
        >
          {(formik) => {
            const { errors, values, setFieldValue } = formik

            const isLoading = loadingUpdatePassword || loadingUpdateProfile
            const isSubmitDisabled = Object.keys(errors).length > 0 || isLoading

            const onClickChangePassword = () => {
              setFieldValue('showPassword', !values.showPassword)
            }

            return (
              <Form>
                <FormContainer>
                  <Fieldset disabled={isLoading} aria-busy={isLoading}>
                    <h2>Account Settings</h2>
                    <FormGroup>
                      <FormRow>
                        <FormikInput
                          label="First name"
                          name="firstName"
                          type="text"
                        />
                        <FormikInput
                          label="Last name"
                          name="lastName"
                          type="text"
                        />
                      </FormRow>

                      <FormRow>
                        <FormikInput
                          disabled
                          label="Email"
                          name="email"
                          type="email"
                        />
                      </FormRow>

                      <div className="password-container">
                        <label
                          htmlFor="currentPassword"
                          style={{ display: 'block', marginBottom: '0.5rem' }}
                        >
                          Password
                        </label>

                        {values.showPassword ? (
                          <>
                            <FormRow>
                              <FormikInput
                                name="currentPassword"
                                type="password"
                                placeholder="Current password"
                              />
                            </FormRow>
                            <Paragraph style={{ marginBottom: '1rem' }}>
                              Enter your current password to save these changes.
                              You can leave this blank if you signed up with
                              Google.
                            </Paragraph>
                            <FormRow>
                              <FormikInput
                                name="password"
                                type="password"
                                placeholder="New password"
                              />
                            </FormRow>
                            <FormRow>
                              <FormikInput
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm new password"
                              />
                            </FormRow>
                          </>
                        ) : (
                          <SecondaryButton
                            onClick={onClickChangePassword}
                            type="button"
                          >
                            Change Password
                          </SecondaryButton>
                        )}
                      </div>
                    </FormGroup>

                    <ErrorMessage
                      error={
                        errorUpdateProfile ||
                        errorUpdatePassword || { message: errorMessage }
                      }
                    />

                    <SubmitButton disabled={isSubmitDisabled} type="submit">
                      {isLoading ? 'Saving settings...' : 'Save settings'}
                    </SubmitButton>
                  </Fieldset>
                </FormContainer>
              </Form>
            )
          }}
        </Formik>
      </sc.Wrapper>
    )
  }
