import { FieldArray, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { trackCategory } from '@/utils/analytics'
import * as sc from './CreateSingleContactsForm.styled'

import { BaseComponentProps } from '@/common/types'
import {
  MyContactsDocument,
  useCreateMyContactsMutation,
} from '@/generated/graphql'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'
import {
  ERROR_MESSAGE_FIELD_REQUIRED,
  ROUTE_SECURE_CHAMPION_CONTACTS,
} from '@/constants/config'
import {
  ButtonLink,
  Fieldset,
  FormGroup,
  FormRow,
  PageBreadcrumbs,
  PageBreadcumbsActionItems,
} from '@/common/styled'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  contactsBreadcrumb,
  contactsBreadcrumbSingle,
} from '@/constants/breadcrumbs/contactsBreadcrumbs'
import { CancelButton, SecondaryButton, SubmitButton } from '../SubmitButton'
import { ErrorMessage } from '@/components/ErrorMessage'
import { FormikInput } from '../Formik/FormikInput'
import { getArrayFieldNamePrefix } from '@/utils/getArrayFieldNamePrefix'

const validationSchema = yup.object().shape({
  contacts: yup
    .array()
    .of(yup.object().shape({}))
    .min(1, 'You must provide at least one contact')
    .required(ERROR_MESSAGE_FIELD_REQUIRED),
})

export const CreateSingleContactsForm: React.FC<BaseComponentProps> = ({
  classNames,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')

  const router = useRouter()

  // apollo
  const [createMyContacts, { error, loading }] = useCreateMyContactsMutation()

  // react state
  const [errorMessage, setErrorMessage] = useState('')

  // inital form values
  const defaultNewContact = { firstName: '', lastName: '', email: '' }
  const initialValues = {
    contacts: [defaultNewContact],
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
            await createMyContacts({
              variables: {
                input: {
                  contacts: values.contacts,
                },
              },
              refetchQueries: [{ query: MyContactsDocument }],
            })

            toast('Successfully created contacts')
            trackCategory({
              eventProps: {
                eventCategory: 'Add Contacts',
                eventAction: 'Add Contact Submit success',
                clickID: 'contacts-add-single-submit-success',
              },
            })
            router.push(ROUTE_SECURE_CHAMPION_CONTACTS)

            setSubmitting(false)
          } catch (err) {
            trackCategory({
              eventProps: {
                eventCategory: 'Add Contacts',
                eventAction: 'Add Contact Submit failure',
                clickID: 'contacts-add-single-submit-failure',
              },
              // extra: {
              //   errorMessage: e.message,
              // },
            })
            runCommonFormCatchHandlers({
              err,
              getArrayFieldNamePrefix: (fieldValue: string) =>
                getArrayFieldNamePrefix({
                  collection: values.contacts,
                  collectionName: 'contacts',
                  fieldName: 'email',
                  fieldValue,
                }),
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

          const numberOfContacts = values.contacts.length

          const submitDisabled =
            Object.keys(errors).length > 0 || loading || numberOfContacts === 0

          const isLoading = loading

          const onClickCancel = () => {
            router.push(ROUTE_SECURE_CHAMPION_CONTACTS)
          }

          return (
            <>
              <Form>
                <PageBreadcrumbs>
                  <Breadcrumb
                    items={[contactsBreadcrumb, contactsBreadcrumbSingle]}
                    currentItemName={contactsBreadcrumbSingle.name}
                    style={{ justifyContent: 'flex-start' }}
                  />
                  <PageBreadcumbsActionItems>
                    <CancelButton onClick={onClickCancel} type="button">
                      Cancel
                    </CancelButton>
                    <SubmitButton disabled={submitDisabled} type="submit">
                      {loading ? 'Saving...' : 'Save'}
                    </SubmitButton>
                  </PageBreadcumbsActionItems>
                </PageBreadcrumbs>
                <sc.Container>
                  <Fieldset disabled={isLoading} aria-busy={isLoading}>
                    <>
                      <div>
                        <h3>Add recipients</h3>
                      </div>

                      <FieldArray
                        name="contacts"
                        render={(arrayHelpers) => {
                          const onAddContact = () => {
                            trackCategory({
                              eventProps: {
                                eventAction: 'Add Another',
                                eventCategory: 'Add Contacts',
                                clickID: 'contacts-add-single-add-another',
                              },
                            })
                            arrayHelpers.push(defaultNewContact)
                          }
                          return (
                            <sc.ContactFields>
                              <FormGroup>
                                <FormRow>
                                  <FormikInput
                                    label="First name"
                                    name="contacts[0].firstName"
                                    type="text"
                                    placeholder="First name"
                                  />
                                  <FormikInput
                                    label="Last name"
                                    name="contacts[0].lastName"
                                    type="text"
                                    placeholder="Last name"
                                  />
                                </FormRow>
                                <FormRow>
                                  <FormikInput
                                    label="Email address"
                                    name="contacts[0].email"
                                    type="email"
                                    placeholder="Email address"
                                  />
                                </FormRow>
                                {numberOfContacts === 1 ? (
                                  <FormRow>
                                    <sc.AddWrapper>
                                      <SecondaryButton
                                        onClick={onAddContact}
                                        type="button"
                                      >
                                        Add another
                                      </SecondaryButton>
                                    </sc.AddWrapper>
                                  </FormRow>
                                ) : null}
                              </FormGroup>
                              {values.contacts.map((contact, index) => {
                                // don't render first, render the rest
                                if (index === 0) {
                                  return null
                                }

                                const onDeleteContact = () => {
                                  trackCategory({
                                    eventProps: {
                                      eventAction: 'Delete Contact',
                                      eventCategory: 'Add Contacts',
                                      clickID:
                                        'contacts-add-single-delete-button-click',
                                    },
                                  })
                                  arrayHelpers.remove(index)
                                }

                                const onAddContact = () => {
                                  arrayHelpers.push(defaultNewContact)
                                }

                                return (
                                  <FormGroup key={`${contact.email}-${index}`}>
                                    <FormRow>
                                      <FormikInput
                                        label="First name"
                                        name={`contacts[${index}].firstName`}
                                        type="text"
                                        placeholder="First name"
                                      />
                                      <FormikInput
                                        label="Last name"
                                        name={`contacts[${index}].lastName`}
                                        type="text"
                                        placeholder="Last name"
                                      />
                                    </FormRow>
                                    <FormRow>
                                      <FormikInput
                                        label="Email address"
                                        name={`contacts[${index}].email`}
                                        type="email"
                                        placeholder="Email address"
                                      />
                                    </FormRow>
                                    <FormRow>
                                      <sc.AddDeleteWrapper>
                                        <ButtonLink
                                          onClick={onDeleteContact}
                                          type="button"
                                        >
                                          Delete
                                        </ButtonLink>
                                        <SecondaryButton
                                          onClick={onAddContact}
                                          type="button"
                                        >
                                          Add another
                                        </SecondaryButton>
                                      </sc.AddDeleteWrapper>
                                    </FormRow>
                                  </FormGroup>
                                )
                              })}
                            </sc.ContactFields>
                          )
                        }}
                      />

                      <ErrorMessage
                        error={error || { message: errorMessage }}
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
