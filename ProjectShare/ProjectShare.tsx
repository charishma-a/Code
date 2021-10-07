import { Formik, Form } from 'formik'
import React, { FunctionComponent, useState } from 'react'

import * as sc from './ProjectShare.styled'

/* common */
import { Fieldset, FormGroup, FormRow } from '../../common/styled'

/* components */
import { ErrorMessage } from '../ErrorMessage'
import { SubmitButton } from '../Form/SubmitButton'
import { FormikInput } from '../Form/Formik/FormikInput'

/* data */
import { PROJECTS, SharingSection } from '../../data/projects'

/* generated */
import { useShareProjectByEmailMutation } from '../../generated/graphql'

/* libraries */
import { Facebook, LinkedIn, Twitter, Email } from '../libraries/ShareButtons'

/* utils */
import { trackCategory } from '../../utils/analytics'

export const projectShareBaseClass = 'kernls-project-share'

export interface ShareEmailFormInitialValues {
  email: string
  firstName: string
  lastName: string
}

export interface ShareEmailFormErrors {
  email?: string
  firstName?: string
  lastName?: string
}

export interface ProjectShareProps {
  className?: string
  initialValues?: Partial<ShareEmailFormInitialValues>
  projectId: string
  sharingSection: SharingSection
}

const socialMediaStyles = {
  facebook: {
    size: 32,
    round: true,
  },
  linkedin: {
    size: 32,
    round: true,
  },
}

export const ProjectShare: FunctionComponent<ProjectShareProps> = (props) => {
  const {
    className,
    initialValues: initialValuesProps = {},
    projectId,
    sharingSection,
  } = props
  const classNames = [projectShareBaseClass, className].join(' ')

  const [feedbackMessage, setFeedbackMessage] = useState('')

  // apollo
  const [shareProjectByEmail, { loading, error }] =
    useShareProjectByEmailMutation()

  const initialValues: ShareEmailFormInitialValues = {
    email: '',
    firstName: '',
    lastName: '',
    ...initialValuesProps,
  }

  const dataProject = PROJECTS.find((project) => project.id === projectId)

  const embeddedLink = `${window.location?.origin}/projects/${dataProject?.embeddedCode}`

  const getBaseClickId = () => {
    if (sharingSection === SharingSection.Donated) {
      return 'project-share-donated'
    }

    return 'project-share'
  }
  const baseClickId = getBaseClickId()

  return (
    <sc.Wrapper className={classNames}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, formikHelpers) => {
          const { setSubmitting } = formikHelpers
          setSubmitting(true)

          trackCategory({
            eventProps: {
              eventAction: 'Project Share Friend Submit',
              eventCategory: 'Project Share',
              clickID: `${baseClickId}-friend-submit-processing`,
            },
            extra: {
              input: {
                firstName: values.firstName,
                lastName: values.lastName,
                projectId,
                to: values.email,
              },
            },
          })

          try {
            const response = await shareProjectByEmail({
              variables: {
                input: {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  projectId,
                  to: values.email,
                },
              },
            })
            const result = response?.data?.shareProjectByEmail
            if (result && result.message === 'success') {
              setFeedbackMessage(`Successfully sent to ${values.email}`)

              trackCategory({
                eventProps: {
                  eventAction: 'Project Share Friend Submit',
                  eventCategory: 'Project Share',
                  clickID: `${baseClickId}-friend-submit-success`,
                },
              })
            }
          } catch (e) {
            return null
          }

          setSubmitting(false)
        }}
        validate={(values) => {
          const errors: ShareEmailFormErrors = {}

          if (!values.firstName) {
            errors.firstName = 'Required'
          }

          if (!values.lastName) {
            errors.lastName = 'Required'
          }

          if (!values.email) {
            errors.email = 'Required'
          }

          return errors
        }}
      >
        {(formik) => {
          const sharing =
            sharingSection === SharingSection.Project
              ? {
                  ...dataProject.sharing.common,
                  ...dataProject.sharing.project,
                }
              : {
                  ...dataProject.sharing.common,
                  ...dataProject.sharing.donated,
                }
          return (
            <>
              <Form>
                <sc.Header>
                  Sharing this project with even one friend can help get it
                  funded faster
                </sc.Header>
                <Fieldset disabled={loading} aria-busy={loading}>
                  <FormGroup style={{ marginBottom: 0 }}>
                    {initialValuesProps.firstName ? null : (
                      <FormRow>
                        <FormikInput
                          name="firstName"
                          type="text"
                          placeholder="Your first name"
                          onChange={(e) => {
                            const { value } = e.target || {}
                            formik.setFieldValue('firstName', value)
                            if (feedbackMessage) {
                              setFeedbackMessage('')
                            }
                          }}
                          showFeedbackMessage={false}
                        />
                      </FormRow>
                    )}
                    {initialValuesProps.lastName ? null : (
                      <FormRow>
                        <FormikInput
                          name="lastName"
                          type="text"
                          placeholder="Your last name"
                          onChange={(e) => {
                            const { value } = e.target || {}
                            formik.setFieldValue('lastName', value)
                            if (feedbackMessage) {
                              setFeedbackMessage('')
                            }
                          }}
                          showFeedbackMessage={false}
                        />
                      </FormRow>
                    )}
                    <FormRow>
                      <sc.InputButtonContainer>
                        <FormikInput
                          name="email"
                          type="email"
                          placeholder="Enter friend’s email"
                          onChange={(e) => {
                            const { value } = e.target || {}
                            formik.setFieldValue('email', value)
                            if (feedbackMessage) {
                              setFeedbackMessage('')
                            }
                          }}
                          showFeedbackMessage={false}
                        />
                        <SubmitButton>Send</SubmitButton>
                      </sc.InputButtonContainer>
                    </FormRow>
                  </FormGroup>
                  {feedbackMessage ? (
                    <sc.SuccessMessage>{feedbackMessage}</sc.SuccessMessage>
                  ) : (
                    <ErrorMessage error={error} />
                  )}
                </Fieldset>
                <sc.ShareViaContainer>
                  <sc.Header>or share via:</sc.Header>
                  <sc.Icons>
                    <sc.Icon
                      onClick={() => {
                        trackCategory({
                          eventProps: {
                            eventAction: 'Project Share Facebook',
                            eventCategory: 'Project Share',
                            clickID: `${baseClickId}-click-facebook`,
                          },
                        })
                      }}
                    >
                      <Facebook
                        styles={socialMediaStyles.facebook}
                        url={sharing.facebookUrl}
                        quote={sharing.facebookQuote}
                        hashtag={sharing.facebookHashtag}
                      />
                      <sc.Paragraph>Facebook</sc.Paragraph>
                    </sc.Icon>
                    <sc.Icon
                      onClick={() => {
                        trackCategory({
                          eventProps: {
                            eventAction: 'Project Share Linkedin',
                            eventCategory: 'Project Share',
                            clickID: `${baseClickId}-click-linkedin`,
                          },
                        })
                      }}
                    >
                      <LinkedIn
                        styles={socialMediaStyles.linkedin}
                        url={sharing.linkedinUrl}
                      />
                      <sc.Paragraph>LinkedIn</sc.Paragraph>
                    </sc.Icon>
                    <sc.Icon
                      onClick={() => {
                        trackCategory({
                          eventProps: {
                            eventAction: 'Project Share Twitter',
                            eventCategory: 'Project Share',
                            clickID: `${baseClickId}-click-twitter`,
                          },
                        })
                      }}
                    >
                      <Twitter
                        styles={socialMediaStyles.linkedin}
                        via=""
                        url={sharing.twitterUrl}
                        title={sharing.twitterTitle}
                      />
                      <sc.Paragraph>Twitter</sc.Paragraph>
                    </sc.Icon>
                    <sc.Icon
                      onClick={() => {
                        trackCategory({
                          eventProps: {
                            eventAction: 'Project Share Email',
                            eventCategory: 'Project Share',
                            clickID: `${baseClickId}-click-email`,
                          },
                        })
                      }}
                    >
                      <Email
                        styles={socialMediaStyles.linkedin}
                        separator=" "
                        body={sharing.emailBody}
                        subject={sharing.emailSubject}
                        url={
                          sharingSection === SharingSection.Project
                            ? ''
                            : sharing.emailUrl
                        }
                      />
                      <sc.Paragraph>Email</sc.Paragraph>
                    </sc.Icon>
                  </sc.Icons>
                  <sc.EmbedLinkContainer>
                    <sc.Paragraph>Embed Link</sc.Paragraph>
                    <sc.EmbedLink>{embeddedLink}</sc.EmbedLink>
                  </sc.EmbedLinkContainer>
                </sc.ShareViaContainer>
              </Form>
            </>
          )
        }}
      </Formik>
    </sc.Wrapper>
  )
}
