import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'

import * as sc from './ChampionOnboardingStepTwoForm.styled'
import { trackCategory } from '@/utils/analytics'
import { BaseComponentProps } from '@/common/types'
import {
  ERROR_MESSAGE_FIELD_REQUIRED,
  ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_2_REVIEW,
} from '@/constants/config'
import { Fieldset, FormGroup, FormRow } from '@/common/styled'
import { SubmitButton } from '../SubmitButton'
import { ErrorMessage } from '@/components/ErrorMessage'
import {
  File,
  Profile,
  useSubmitOnboardingStepTwoFormMutation,
} from '@/generated/graphql'
import { useRouter } from 'next/router'
import { FormikInput } from '../Formik/FormikInput'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'
import { FileUpload, IFileUploadOnDropProp } from '@/components/FileUpload'

const validationSchema = yup.object().shape({
  avatarFile: yup
    .object()
    .shape({
      secureUrl: yup.string().required(ERROR_MESSAGE_FIELD_REQUIRED),
    })
    .required(ERROR_MESSAGE_FIELD_REQUIRED),
  bio: yup
    .string()
    .max(30, 'The max character count is 30')
    .required(ERROR_MESSAGE_FIELD_REQUIRED),
  dedicatedNote: yup.string().max(30, 'The max character count is 30'),
})

export interface ChampionOnboardingStepTwoFormInitialValues {
  avatarFile: File
  bio: string
  dedicatedNote: string
}

interface ChampionOnboardingStepTwoFormProps extends BaseComponentProps {
  me: Profile
}

export const ChampionOnboardingStepTwoForm: React.FC<ChampionOnboardingStepTwoFormProps> =
  ({ classNames, me }) => {
    const router = useRouter()
    const className = [sc.baseClass, classNames].join(' ')

    // apollo
    const [submitOnboardingStepTwoForm, { loading, error }] =
      useSubmitOnboardingStepTwoFormMutation()

    // react state
    const [errorMessage, setErrorMessage] = useState('')

    // inital form values
    const initialValues: ChampionOnboardingStepTwoFormInitialValues = {
      avatarFile: me.avatarFile,
      bio: me.projectChampion?.bio || '',
      dedicatedNote: me.projectChampion?.dedicatedNote || '',
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
                slug: 'build-campaign-profile/review',
              }
              const avatar = values.avatarFile.secureUrl || ''
              const updateMyProfileInput = {
                avatar,
              }
              const updateMyProjectChampionInput = {
                bio: values.bio,
                dedicatedNote: values.dedicatedNote,
              }
              await submitOnboardingStepTwoForm({
                variables: {
                  updateMyProfileInput,
                  updateMyProjectChampionInput,
                  updateOnboardingStepInput,
                },
              })

              router.push(ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_2_REVIEW)
              setSubmitting(false)
            } catch (err) {
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

            const onDrop: IFileUploadOnDropProp = ({ file }) => {
              trackCategory({
                eventProps: {
                  eventAction:
                    'Build Campaign Profile ProfilePicture Upload Success',
                  eventCategory: 'Build Campaign Profile',
                  clickID: 'build-campaign-profile-upload-picture-success',
                },
              })
              formik.setFieldValue('avatarFile', file)
            }

            const onDeleteAvatar = async () => {
              trackCategory({
                eventProps: {
                  eventAction: 'Build Campaign Profile Picture Delete',
                  eventCategory: 'Build Campaign Profile',
                  clickID: 'build-campaign-profile-picture-delete',
                },
              })
              formik.setFieldValue('avatarFile', null)
            }

            const isLoading = loading

            return (
              <Form>
                <sc.Container>
                  <Fieldset disabled={isLoading} aria-busy={isLoading}>
                    <>
                      <FormGroup style={{ marginTop: '2rem' }}>
                        <FormRow>
                          <FileUpload
                            fieldName="avatar"
                            name="avatar"
                            file={values.avatarFile}
                            resourceType="image"
                            onDelete={onDeleteAvatar}
                            onDrop={onDrop}
                            isAvatar
                          >
                            <p>+ Upload a photo of yourself</p>
                          </FileUpload>
                        </FormRow>
                      </FormGroup>
                      <FormGroup style={{ marginTop: '2rem' }}>
                        <FormRow>
                          <FormikInput
                            label="Describe yourself in 4 words or less"
                            maxLength={30}
                            name="bio"
                            type="text"
                            placeholder="Example: Managing director and mother"
                            showCharacterCount
                          />
                        </FormRow>
                      </FormGroup>
                      <FormGroup style={{ marginTop: '2rem' }}>
                        <FormRow>
                          <FormikInput
                            label="Include a dedication (optional)"
                            maxLength={30}
                            name="dedicatedNote"
                            type="text"
                            placeholder="Name"
                            showCharacterCount
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
                              eventAction: 'Build Campaign Profile Preview ',
                              eventCategory: 'Build Campaign Profile',
                              clickID:
                                'build-campaign-profile-preview-button-click',
                            },
                          })
                        }}
                      >
                        {loading
                          ? 'Next: Preview my profile...'
                          : 'Next: Preview my profile'}
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
