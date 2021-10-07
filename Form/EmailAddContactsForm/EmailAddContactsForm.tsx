import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import Link from 'next/link'
import * as yup from 'yup'
import { trackCategory } from '@/utils/analytics'
import * as sc from './EmailAddContactsForm.styled'

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
  emailBuilderBreadcrumb4,
  emailBuilderBreadcrumb5,
} from '@/constants/breadcrumbs/emailBuilder'
import {
  ERROR_MESSAGE_FIELD_REQUIRED,
  ROUTE_SECURE_CHAMPION_CONTACTS,
  ROUTE_SECURE_CHAMPION_SHARE_EMAILS_REVIEW,
} from '@/constants/config'
import { CancelButton, SubmitButton } from '../SubmitButton'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'

import { ErrorMessage } from '@/components/ErrorMessage'
import {
  File,
  MyContactsDocument,
  useMyContactsQuery,
  useUpdateEmailContactsMutation,
} from '@/generated/graphql'
import { FormikCheckbox } from '../Formik/FormikCheckbox'
import { Paragraph } from '@/components/Paragraph'

const validationSchema = yup.object().shape({
  contacts: yup.array().min(1).required(ERROR_MESSAGE_FIELD_REQUIRED),
})

export interface IEmailAddContactsFormInitialValues {
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

export interface IEmailAddContactsFormProps extends BaseComponentProps {
  id: string
}

export const EmailAddContactsForm: React.FC<IEmailAddContactsFormProps> = ({
  classNames,
  id,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')

  const router = useRouter()

  // apollo
  const { called, data, error, loading } = useMyContactsQuery()
  const [updateEmailContacts, { error: errorSubmit, loading: loadingSubmit }] =
    useUpdateEmailContactsMutation()

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

  if (called && !loading && !data && data.myContacts.length === 0) {
    return (
      <sc.Wrapper className={className} {...restProps}>
        <sc.ContentContainer>
          <ErrorMessage error={{ message: 'No contacts found' }} />
        </sc.ContentContainer>
      </sc.Wrapper>
    )
  }

  // inital form values
  const initialValues = {
    contacts: data.myContacts.map((contact) => {
      if (!contact.emailContacts || contact.emailContacts.length <= 0) {
        return {
          isLinkedToEmail: false,
          ...contact,
        }
      }
      const emailContact = contact.emailContacts.find(
        (ec) => ec.email.id === id
      )
      if (!emailContact) {
        return {
          isLinkedToEmail: false,
          ...contact,
        }
      }
      return {
        isLinkedToEmail: true,
        ...contact,
      }
    }),
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
            const contactIds = values.contacts
              .filter((contact) => contact.isLinkedToEmail)
              .map((contact) => contact.id)
            await updateEmailContacts({
              variables: {
                input: {
                  id,
                  contactIds,
                },
              },
              refetchQueries: [{ query: MyContactsDocument }],
            })

            router.push(
              ROUTE_SECURE_CHAMPION_SHARE_EMAILS_REVIEW.replace('[id]', id)
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
          const { errors, values } = formik

          const numberOfContacts = values.contacts.length
          const selectedContacts = values.contacts.filter(
            (contact) => contact.isLinkedToEmail
          )
          const numberOfContactsSelected = selectedContacts.length

          const submitDisabled =
            Object.keys(errors).length > 0 ||
            loading ||
            loadingSubmit ||
            numberOfContacts === 0

          const isLoading = loading || loadingSubmit

          const onClickCancel = () => {
            trackCategory({
              eventProps: {
                eventAction: 'Add Recepients Cancel Button ',
                eventCategory: 'Add Recepients',
                clickID: 'add-recepients-cancel-button-click',
              },
            })

            router.push(
              ROUTE_SECURE_CHAMPION_SHARE_EMAILS_REVIEW.replace('[id]', id)
            )
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
                        linkUrl: emailBuilderBreadcrumb3.linkUrl.replace(
                          '[id]',
                          id
                        ),
                      },
                      {
                        ...emailBuilderBreadcrumb4,
                        linkUrl: emailBuilderBreadcrumb4.linkUrl.replace(
                          '[id]',
                          id
                        ),
                      },
                      {
                        ...emailBuilderBreadcrumb5,
                        linkUrl: emailBuilderBreadcrumb5.linkUrl.replace(
                          '[id]',
                          id
                        ),
                      },
                    ]}
                    currentItemName={emailBuilderBreadcrumb5.name}
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
                            eventAction: 'Add Recepients Save Button ',
                            eventCategory: 'Add Recepients',
                            clickID: 'add-recepients-save-button-click',
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
                        <h2>Add recipients</h2>
                      </sc.Header>
                      <sc.ContentContainer>
                        <sc.ContactsWrapper contactsLength={numberOfContacts}>
                          <div className="header">
                            <span className="header__main">Contacts</span>
                            <span>{numberOfContacts} contact(s)</span>
                          </div>
                          <div className="body">
                            <FormGroup>
                              {numberOfContacts ? (
                                values.contacts?.map((contact, index) => {
                                  const fullName = `${contact.firstName} ${contact.lastName}`
                                  return (
                                    <sc.ContactItem key={contact.id}>
                                      <FormRow>
                                        <FormikCheckbox
                                          name={`contacts[${index}].isLinkedToEmail`}
                                          onChecked={() => {
                                            trackCategory({
                                              eventProps: {
                                                eventAction:
                                                  'Add Recepients Contacts Select',
                                                eventCategory: 'Add Recepients',
                                                clickID:
                                                  'add-recepients-contacts-checked',
                                              },
                                            })
                                          }}
                                        >
                                          <div className="checkbox-content">
                                            <div className="name">
                                              {fullName}
                                            </div>
                                            <div className="email">
                                              {contact.email}
                                            </div>
                                          </div>
                                        </FormikCheckbox>
                                      </FormRow>
                                    </sc.ContactItem>
                                  )
                                })
                              ) : (
                                <Paragraph
                                  style={{
                                    width: '155px',
                                    textAlign: 'center',
                                  }}
                                >
                                  No contacts were found. Add and edit contacts
                                  under{' '}
                                  <Link href={ROUTE_SECURE_CHAMPION_CONTACTS}>
                                    <a
                                      onClick={() => {
                                        trackCategory({
                                          eventProps: {
                                            eventAction:
                                              'Add Recepients No Contacts Found Contacts Link',
                                            eventCategory: 'Add Recepients',
                                            clickID:
                                              'add-recepients-no-contacts-found-contacts-link-click',
                                          },
                                        })
                                      }}
                                    >
                                      Contacts
                                    </a>
                                  </Link>
                                </Paragraph>
                              )}
                            </FormGroup>
                          </div>
                          <div className="actions">
                            <Paragraph>
                              Add or update contacts under{' '}
                              <Link href={ROUTE_SECURE_CHAMPION_CONTACTS}>
                                <a
                                  onClick={() => {
                                    trackCategory({
                                      eventProps: {
                                        eventAction:
                                          'Add Recepients Add Or Update Contacts Footer ',
                                        eventCategory: 'Add Recepients',
                                        clickID:
                                          'add-recepients-update-or-add-contacts-footer-link-click',
                                      },
                                    })
                                  }}
                                >
                                  Contacts
                                </a>
                              </Link>
                            </Paragraph>
                          </div>
                        </sc.ContactsWrapper>
                        <sc.ContactsWrapper
                          isView
                          contactsLength={numberOfContactsSelected}
                        >
                          <div className="header">
                            <span className="header__main">
                              Selected contact(s)
                            </span>
                            <span>{numberOfContactsSelected} contact(s)</span>
                          </div>
                          <div className="body">
                            {numberOfContactsSelected ? (
                              selectedContacts?.map((contact) => {
                                const fullName = `${contact.firstName} ${contact.lastName}`
                                return (
                                  <sc.ContactItem key={contact.id}>
                                    <div className="checkbox-content">
                                      <div className="name">{fullName}</div>
                                      <div className="email">
                                        {contact.email}
                                      </div>
                                    </div>
                                  </sc.ContactItem>
                                )
                              })
                            ) : (
                              <Paragraph
                                style={{ width: '155px', textAlign: 'center' }}
                              >
                                No contacts were selected. To add contacts go to{' '}
                                <Link href={ROUTE_SECURE_CHAMPION_CONTACTS}>
                                  <a
                                    onClick={() => {
                                      trackCategory({
                                        eventProps: {
                                          eventAction:
                                            'Add Recepients None Selected Add  Contacts ',
                                          eventCategory: 'Add Recepients',
                                          clickID:
                                            'add-recepients-none-selected-add-contacts-link-click',
                                        },
                                      })
                                    }}
                                  >
                                    Contacts
                                  </a>
                                </Link>
                              </Paragraph>
                            )}
                          </div>
                        </sc.ContactsWrapper>
                      </sc.ContentContainer>

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
