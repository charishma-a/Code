import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { trackCategory } from '@/utils/analytics'
import * as sc from './EmailEditForm.styled'

import { BaseComponentProps } from '@/common/types'
import {
  Fieldset,
  FormGroup,
  FormRow,
  PageBreadcrumbs,
  PageBreadcumbsActionItems,
} from '@/common/styled'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  emailBuilderBreadcrumb1,
  emailBuilderBreadcrumb2,
  emailBuilderBreadcrumb3,
} from '@/constants/breadcrumbs/emailBuilder'
import {
  ERROR_MESSAGE_FIELD_REQUIRED,
  ROUTE_SECURE_CHAMPION_SHARE_EMAILS_EDIT,
  ROUTE_SECURE_CHAMPION_SHARE_EMAILS_VIEW,
} from '@/constants/config'
import { CancelButton, SubmitButton } from '../SubmitButton'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'
import { Lightbulb as SvgLightbulb } from '@/generated/svgs'

import { ErrorMessage } from '@/components/ErrorMessage'
import { FormikInput } from '../Formik/FormikInput'
import {
  Email,
  File,
  Maybe,
  Profile,
  useMyEmailsQuery,
  useUpdateMyEmailMutation,
} from '@/generated/graphql'
import { Paragraph } from '@/components/Paragraph'
import { FormikCheckbox } from '../Formik/FormikCheckbox'
import { FileUpload, IFileUploadOnDropProp } from '@/components/FileUpload'

const validationSchema = yup.object().shape({
  bodyImageFile: yup
    .object()
    .shape({
      secureUrl: yup.string().required(ERROR_MESSAGE_FIELD_REQUIRED),
    })
    .nullable(),
  customData: yup.object().shape({
    bodyPersonalStory: yup.string().max(350, 'The max character count is 350'),
    bodyTheAsk: yup
      .string()
      .max(300, 'The max character count is 300')
      .required(ERROR_MESSAGE_FIELD_REQUIRED),
    closingPrefix: yup
      .string()
      .max(30, 'The max character count is 30')
      .required(ERROR_MESSAGE_FIELD_REQUIRED),
    conclusionHelp: yup
      .string()
      .max(150, 'The max character count is 150')
      .required(ERROR_MESSAGE_FIELD_REQUIRED),
    conclusionImpact: yup
      .string()
      .max(150, 'The max character count is 150')
      .required(ERROR_MESSAGE_FIELD_REQUIRED),
    introOpening: yup
      .string()
      .max(150, 'The max character count is 150')
      .required(ERROR_MESSAGE_FIELD_REQUIRED),
    introMotivation: yup
      .string()
      .max(150, 'The max character count is 150')
      .required(ERROR_MESSAGE_FIELD_REQUIRED),
    conclusionShare: yup.string().required(ERROR_MESSAGE_FIELD_REQUIRED),
    firstName: yup.string().required(ERROR_MESSAGE_FIELD_REQUIRED),
    salutationPrefix: yup
      .string()
      .max(30, 'The max character count is 30')
      .required(ERROR_MESSAGE_FIELD_REQUIRED),
    usePersonalizedClosing: yup
      .boolean()
      .required(ERROR_MESSAGE_FIELD_REQUIRED),
    usePersonalizedSalutation: yup
      .boolean()
      .required(ERROR_MESSAGE_FIELD_REQUIRED),
  }),
  name: yup.string().required(ERROR_MESSAGE_FIELD_REQUIRED),
  replyTo: yup
    .string()
    .email('Please enter a valid email.')
    .required(ERROR_MESSAGE_FIELD_REQUIRED),
  subjectLine: yup.string().required(ERROR_MESSAGE_FIELD_REQUIRED),
})

export interface IEmailEditFormInitialValues {
  bodyImageFile?: File
  customData: {
    bodyPersonalStory?: string
    bodyTheAsk: string
    closingPrefix: string
    conclusionHelp: string
    conclusionImpact: string
    conclusionShare: string
    firstName: string
    introOpening: string
    introMotivation: string
    salutationPrefix: string
    usePersonalizedClosing: boolean
    usePersonalizedSalutation: boolean
  }
  name: string
  replyTo: string
  subjectLine: string
}

export interface IEmailEditFormProps extends BaseComponentProps {
  id: string
  me: Maybe<Profile>
}

export const EmailEditForm: React.FC<IEmailEditFormProps> = ({
  classNames,
  id,
  me,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')

  const router = useRouter()

  // apollo
  const { called, data, error, loading } = useMyEmailsQuery({
    variables: { id },
  })
  const [updateMyEmail, { error: errorSubmit, loading: loadingSubmit }] =
    useUpdateMyEmailMutation()

  // react state
  const [errorMessage, setErrorMessage] = useState('')

  if (loading) {
    return (
      <sc.Wrapper className={className} {...restProps}>
        <sc.ContentContainer>Loading...</sc.ContentContainer>
      </sc.Wrapper>
    )
  }

  if (error) {
    return (
      <sc.Wrapper className={className} {...restProps}>
        <sc.ContentContainer>
          <ErrorMessage error={error} />
        </sc.ContentContainer>
      </sc.Wrapper>
    )
  }

  if (called && !loading && !data && data.myEmails.length === 0) {
    return (
      <sc.Wrapper className={className} {...restProps}>
        <sc.ContentContainer>
          <ErrorMessage error={{ message: 'No email found' }} />
        </sc.ContentContainer>
      </sc.Wrapper>
    )
  }

  const email = data.myEmails[0]

  const bodyImageFileFieldName = `email-${email.id}-body-image`
  const bodyImageFile =
    me.files?.find((file) => file.fieldName === bodyImageFileFieldName) || null

  // inital form values
  const initialValues: Partial<
    Omit<
      Email,
      | 'sentAt'
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'profile'
      | 'projectCampaign'
      | 'emailContacts'
      | 'emailAudits'
    >
  > & { bodyImageFile: File } = {
    bodyImageFile,
    customData: {
      bodyPersonalStory: email.customData.bodyPersonalStory || '',
      bodyTheAsk: email.customData.bodyTheAsk || '',
      closingPrefix: email.customData.closingPrefix || '',
      conclusionHelp: email.customData.conclusionHelp || '',
      conclusionImpact: email.customData.conclusionImpact || '',
      conclusionShare: 'Check out the project here',
      firstName: email.customData.usePersonalizedSalutation
        ? '{{ firstName }}'
        : email.customData.firstName || '',
      introOpening: email.customData.introOpening || '',
      introMotivation: email.customData.introMotivation || '',
      salutationPrefix: email.customData.salutationPrefix || '',
      usePersonalizedClosing: email.customData.usePersonalizedClosing,
      usePersonalizedSalutation: email.customData.usePersonalizedSalutation,
    },
    name: email.name || '',
    replyTo: email.replyTo || '',
    subjectLine: email.subjectLine || '',
  }

  return (
    <sc.Wrapper className={className} {...restProps}>
      <Formik
        initialValues={initialValues}
        onSubmit={async ({ bodyImageFile, ...values }, formikHelpers) => {
          const { setSubmitting, setFieldError } = formikHelpers
          setSubmitting(true)
          setErrorMessage('')

          try {
            await updateMyEmail({
              variables: {
                input: {
                  id,
                  ...values,
                  customData: {
                    ...values.customData,
                    bodyImage: bodyImageFile?.secureUrl || '',
                  },
                },
              },
            })

            router.push(
              ROUTE_SECURE_CHAMPION_SHARE_EMAILS_VIEW.replace('[id]', id)
            )
            setSubmitting(false)
          } catch (err) {
            runCommonFormCatchHandlers({
              err,
              setErrorMessage,
              setFieldError,
              setSubmitting,
            })
          }
        }} // find submitting logic in ChampionLoginForm
        validationSchema={validationSchema}
      >
        {(formik) => {
          const { errors, values, setFieldValue } = formik

          const submitDisabled =
            Object.keys(errors).length > 0 || loading || loadingSubmit

          const isLoading = loading || loadingSubmit

          const onClickCancel = () => {
            trackCategory({
              eventProps: {
                eventAction: 'Create An Email Review Cancel',
                eventCategory: 'Create An Email',
                clickID: 'create-an-email-review-cancel-button-click',
              },
            })
            router.push(
              ROUTE_SECURE_CHAMPION_SHARE_EMAILS_VIEW.replace('[id]', id)
            )
          }

          const onDropBodyImage: IFileUploadOnDropProp = ({ file }) => {
            trackCategory({
              eventProps: {
                eventAction: 'Email Review Photo Upload',
                eventCategory: 'Email Review',
                clickID: 'email-review-photo-upload-clicked',
              },
            })
            formik.setFieldValue('bodyImageFile', file)
          }

          const onDeleteBodyImage = async () => {
            trackCategory({
              eventProps: {
                eventAction: 'Email Review Photo Delete',
                eventCategory: 'Email Review',
                clickID: 'email-review-photo-delete-clicked',
              },
            })
            formik.setFieldValue('bodyImageFile', null)
          }

          return (
            <>
              <Form>
                <PageBreadcrumbs>
                  <Breadcrumb
                    items={[
                      emailBuilderBreadcrumb1,
                      emailBuilderBreadcrumb2,
                      {
                        ...emailBuilderBreadcrumb3,
                        linkUrl:
                          ROUTE_SECURE_CHAMPION_SHARE_EMAILS_EDIT.replace(
                            '[id]',
                            id
                          ),
                      },
                    ]}
                    currentItemName={emailBuilderBreadcrumb3.name}
                    style={{ justifyContent: 'flex-start' }}
                  />
                  <PageBreadcumbsActionItems>
                    <CancelButton onClick={onClickCancel} type="button">
                      Cancel
                    </CancelButton>
                    <SubmitButton
                      disabled={submitDisabled}
                      type="submit"
                      onClick={() => {
                        trackCategory({
                          eventProps: {
                            eventAction: 'Create An Email Review Save',
                            eventCategory: 'Create An Email',
                            clickID: 'create-an-email-review-save-button-click',
                          },
                        })
                      }}
                    >
                      {loading ? 'Saving...' : 'Save'}
                    </SubmitButton>
                  </PageBreadcumbsActionItems>
                </PageBreadcrumbs>
                <sc.Container>
                  <Fieldset disabled={isLoading} aria-busy={isLoading}>
                    <>
                      <sc.Header>
                        <sc.ContentContainer>
                          <FormGroup style={{ marginTop: '2rem' }}>
                            <FormRow>
                              <FormikInput
                                label="Email Name (Internal use only)"
                                name="name"
                                type="text"
                              />
                            </FormRow>
                            <FormRow>
                              <FormikInput
                                label="Reply-to email:"
                                name="replyTo"
                                type="email"
                              />
                            </FormRow>
                          </FormGroup>
                        </sc.ContentContainer>
                      </sc.Header>
                      <sc.Body>
                        <sc.ContentContainer>
                          <FormGroup style={{ marginTop: '2rem' }}>
                            <FormRow>
                              <FormikInput
                                label="Subject line"
                                maxLength={40}
                                name="subjectLine"
                                showCharacterCount
                                type="text"
                              />
                            </FormRow>
                            <sc.TipWrapper>
                              <SvgLightbulb />
                              <Paragraph>
                                The average person receives 100 emails a day.
                                Your subject line will determine whether they
                                skim over your email or stop to open it.
                              </Paragraph>
                            </sc.TipWrapper>
                            <label
                              htmlFor="customData.salutationPrefix"
                              style={{ marginTop: '1rem' }}
                            >
                              Salutation
                            </label>
                            <FormRow style={{ marginTop: 0 }}>
                              <FormikInput
                                name="customData.salutationPrefix"
                                type="text"
                              />
                              <FormikInput
                                disabled={
                                  values.customData.usePersonalizedSalutation
                                }
                                maxLength={40}
                                name="customData.firstName"
                                showCharacterCount
                                type="text"
                              />
                            </FormRow>
                            <FormRow>
                              <FormikCheckbox
                                onChecked={(value) => {
                                  trackCategory({
                                    eventProps: {
                                      eventAction:
                                        'Create An Email Review Use Contact FirstName',
                                      eventCategory: 'Create An Email',
                                      clickID:
                                        'create-an-email-review-use-contact-firstname-checked',
                                    },
                                  })
                                  const valueBoolean = Boolean(value)
                                  if (!valueBoolean) {
                                    setFieldValue(
                                      'customData.firstName',
                                      '{{ firstName }}'
                                    )
                                  }
                                }}
                                name="customData.usePersonalizedSalutation"
                              >
                                Use contact’s first name (recommended)
                              </FormikCheckbox>
                            </FormRow>
                          </FormGroup>

                          <h3>Introduction</h3>
                          <FormGroup>
                            <FormRow>
                              <FormikInput
                                label="Opening sentence"
                                maxLength={150}
                                name="customData.introOpening"
                                showCharacterCount
                                type="text"
                              />
                            </FormRow>
                            <FormRow>
                              <FormikInput
                                label="Tell people what motivates you"
                                maxLength={150}
                                name="customData.introMotivation"
                                showCharacterCount
                                type="text"
                              />
                            </FormRow>
                          </FormGroup>

                          <h3>Body</h3>
                          <FormGroup>
                            <FormRow>
                              <FormikInput
                                label="Your personal story (optional)"
                                maxLength={350}
                                name="customData.bodyPersonalStory"
                                showCharacterCount
                                type="text"
                              />
                            </FormRow>
                            <sc.TipWrapper>
                              <SvgLightbulb />
                              <Paragraph>
                                Sharing your personal experience might feel
                                uncomfortable at first, but we&lsquo;ve found
                                that it greatly increases the likelihood that
                                people will support your campaign.
                              </Paragraph>
                            </sc.TipWrapper>
                            <label style={{ marginTop: '1rem' }}>
                              A picture that helps tell your story (optional)
                            </label>
                            <FormRow>
                              <FileUpload
                                fieldName={bodyImageFileFieldName}
                                name="bodyImageFile"
                                file={values.bodyImageFile}
                                resourceType="image"
                                onDelete={onDeleteBodyImage}
                                onDrop={onDropBodyImage}
                                isAvatar={false}
                              >
                                <p>+ Upload a photo</p>
                              </FileUpload>
                            </FormRow>
                            <sc.TipWrapper>
                              <SvgLightbulb />
                              <Paragraph>
                                As the saying goes, a picture is worth a
                                thousand words. Including a picture establishes
                                an emotional connection and increases the
                                likelihood that a person visits the project
                                page.
                              </Paragraph>
                            </sc.TipWrapper>
                            <FormRow>
                              <FormikInput
                                label="The ask"
                                maxLength={300}
                                name="customData.bodyTheAsk"
                                showCharacterCount
                                type="text"
                              />
                            </FormRow>
                          </FormGroup>

                          <h3>Conclusion</h3>
                          <FormGroup>
                            <FormRow>
                              <FormikInput
                                label="Explain your impact"
                                maxLength={150}
                                name="customData.conclusionImpact"
                                showCharacterCount
                                type="text"
                              />
                            </FormRow>
                            <FormRow>
                              <FormikInput
                                label="Tell people how they can help"
                                maxLength={150}
                                name="customData.conclusionHelp"
                                showCharacterCount
                                type="text"
                              />
                            </FormRow>
                            <FormRow>
                              <FormikInput
                                disabled
                                name="customData.conclusionShare"
                                type="text"
                              />
                            </FormRow>
                          </FormGroup>
                          <FormGroup>
                            <FormRow>
                              <FormikInput
                                label="Closing"
                                maxLength={30}
                                name="customData.closingPrefix"
                                showCharacterCount
                                type="text"
                              />
                            </FormRow>
                            <FormRow>
                              <FormikCheckbox
                                name="customData.usePersonalizedClosing"
                                onChecked={(value) => {
                                  trackCategory({
                                    eventProps: {
                                      eventAction:
                                        'Create An Email Review Use My FirstName',
                                      eventCategory: 'Create An Email',
                                      clickID:
                                        'create-an-email-review-use-my-firstname-checked',
                                    },
                                  })
                                }}
                              >
                                Use my first name
                              </FormikCheckbox>
                            </FormRow>
                          </FormGroup>
                        </sc.ContentContainer>
                      </sc.Body>

                      <ErrorMessage
                        error={
                          error || errorSubmit || { message: errorMessage }
                        }
                      />
                    </>
                  </Fieldset>
                </sc.Container>
              </Form>
            </>
          )
        }}
      </Formik>
    </sc.Wrapper>
  )
}
