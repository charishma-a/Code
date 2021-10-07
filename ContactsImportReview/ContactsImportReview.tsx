import { CircularProgress } from '@material-ui/core'
import React, { useState } from 'react'
import * as yup from 'yup'

import * as sc from './ContactsImportReview.styled'

import { ResourceActions } from '../ResourceActions'

import {
  Fieldset,
  PageBreadcrumbs,
  PageBreadcumbsActionItems,
} from '@/common/styled'
import { BaseComponentProps } from '@/common/types'
import {
  Contact,
  MyContactsDocument,
  useCreateMyContactsMutation,
  useGetContactsFromMyFileQuery,
} from '@/generated/graphql'
import { ResourceTable } from '../Table'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'
import { ErrorMessage } from '../ErrorMessage'
import { Paragraph } from '../Paragraph'
import {
  CancelButton,
  SecondaryButton,
  SubmitButton,
} from '../Form/SubmitButton'
import { FormikCheckbox } from '../Form/Formik/FormikCheckbox'
import {
  ERROR_MESSAGE_FIELD_REQUIRED,
  ROUTE_SECURE_CHAMPION_CONTACTS,
  ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_FILE,
} from '@/constants/config'
import {
  contactsBreadcrumb,
  contactsBreadcrumbFile,
  contactsBreadcrumbFileReview,
} from '@/constants/breadcrumbs/contactsBreadcrumbs'
import { Breadcrumb } from '../Breadcrumb'
import { toast } from 'react-toastify'
import { getArrayFieldNamePrefix } from '@/utils/getArrayFieldNamePrefix'
import { FormikInput } from '../Form/Formik/FormikInput'
import { ModalDeleteContacts } from '../Modal/ModalDeleteContacts'

const validationSchema = yup.object().shape({
  editContacts: yup
    .array()
    .of(
      yup.object().shape({
        email: yup
          .string()
          .email('Must be a valid email')
          .required(ERROR_MESSAGE_FIELD_REQUIRED),
        firstName: yup.string().required(ERROR_MESSAGE_FIELD_REQUIRED),
        lastName: yup.string(),
      })
    )
    .required(ERROR_MESSAGE_FIELD_REQUIRED),
})

interface IValues {
  selectedContactsDictionary?: { [key: string]: boolean }
  editContacts: Omit<Contact, 'emailContacts'>[]
  contacts: Contact[]
}

export interface IContactsImportReviewProps extends BaseComponentProps {
  fileId: string
}

export const ContactsImportReview: React.FC<IContactsImportReviewProps> = ({
  classNames,
  fileId,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')

  const router = useRouter()

  // apollo
  const { data, error, loading } = useGetContactsFromMyFileQuery({
    variables: {
      fileId,
    },
  })
  const [createMyContacts, { loading: loadingSubmit, error: errorSubmit }] =
    useCreateMyContactsMutation()

  // react state
  const [editMode, setEditMode] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onClickCancel = () => {
    router.push(ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_FILE)
  }
  const onClickAddContacts = () => {
    router.push(ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_FILE)
  }

  if (loading) {
    return (
      <sc.Wrapper className={className} {...restProps}>
        <sc.EmptyView>
          <CircularProgress />
        </sc.EmptyView>
      </sc.Wrapper>
    )
  }

  if (error) {
    return (
      <sc.Wrapper className={className} {...restProps}>
        <sc.EmptyView>
          <ErrorMessage error={error} />
        </sc.EmptyView>
      </sc.Wrapper>
    )
  }

  const contacts = data?.getContactsFromMyFile || []
  const initialValues: IValues = {
    contacts,
    editContacts: [],
    selectedContactsDictionary: {},
  }

  const renderEmptyView = () => {
    return (
      <sc.EmptyView>
        <Paragraph>No contacts</Paragraph>
        <SecondaryButton onClick={onClickAddContacts} topMargin type="button">
          Back to import contacts
        </SecondaryButton>
      </sc.EmptyView>
    )
  }

  return (
    <sc.Wrapper className={className} {...restProps}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values, formikHelpers) => {
          const { setSubmitting, setFieldError } = formikHelpers
          setSubmitting(true)
          setErrorMessage('')

          try {
            await createMyContacts({
              variables: {
                input: {
                  contacts: values.contacts.map((contact) => ({
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    email: contact.email,
                    importedFrom: contact.importedFrom,
                  })),
                },
              },
              refetchQueries: [{ query: MyContactsDocument }],
            })

            toast('Successfully created contacts')
            router.push(ROUTE_SECURE_CHAMPION_CONTACTS)

            setSubmitting(false)
          } catch (err) {
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
              useToast: true,
            })
          }
        }}
        validationSchema={validationSchema}
      >
        {(formik) => {
          const { errors, values, setFieldValue } = formik

          const isLoading = loading || loadingSubmit
          const submitDisabled =
            Object.keys(errors).length > 0 ||
            isLoading ||
            values.contacts.length === 0

          if (editMode) {
            const submitDisabled = Object.keys(errors).length > 0 || isLoading
            const tableColumns = [
              {
                accessor: 'firstName',
                Header: 'First name',
              },
              {
                accessor: 'lastName',
                Header: 'Last name',
              },
              {
                accessor: 'email',
                Header: 'Email address',
              },
            ]
            const tableData = values.editContacts.map((contact, index) => {
              return {
                firstName: (
                  <FormikInput
                    name={`editContacts[${index}].firstName`}
                    type="text"
                  />
                ),
                lastName: (
                  <FormikInput
                    name={`editContacts[${index}].lastName`}
                    type="text"
                  />
                ),
                email: (
                  <FormikInput
                    name={`editContacts[${index}].email`}
                    type="email"
                  />
                ),
              }
            })

            const onClickEditCancel = () => {
              setFieldValue('editContacts', [])
              setEditMode(false)
            }

            const onClickUpdate = () => {
              setFieldValue(
                'contacts',
                values.contacts.map((contact) => {
                  const foundUpdated = values.editContacts.find(
                    ({ id }) => contact.id === id
                  )
                  if (foundUpdated) {
                    return foundUpdated
                  }
                  return contact
                })
              )
              setFieldValue('selectedContactsDictionary', {})
              setEditMode(false)
            }

            return (
              <Form>
                <Fieldset
                  disabled={isLoading}
                  aria-busy={isLoading}
                  style={{ width: '100%' }}
                >
                  <PageBreadcrumbs>
                    <Breadcrumb
                      items={[
                        contactsBreadcrumb,
                        contactsBreadcrumbFile,
                        {
                          ...contactsBreadcrumbFileReview,
                          linkUrl: contactsBreadcrumbFileReview.linkUrl.replace(
                            '[id]',
                            fileId
                          ),
                        },
                      ]}
                      currentItemName={contactsBreadcrumbFileReview.name}
                      style={{ justifyContent: 'flex-start' }}
                    />
                  </PageBreadcrumbs>
                  <sc.Container>
                    <sc.EditActionsWrapper
                      className={`${sc.baseClass}__edit-actions`}
                    >
                      <div className={`${sc.baseClass}__edit-actions__heading`}>
                        <h3>Edit Contacts</h3>
                      </div>
                      <sc.EditActions
                        className={`${sc.baseClass}__edit-actions__actions`}
                      >
                        <CancelButton onClick={onClickEditCancel} type="button">
                          Cancel
                        </CancelButton>
                        <SubmitButton
                          disabled={submitDisabled}
                          onClick={onClickUpdate}
                          type="button"
                        >
                          {loading ? 'Updating...' : 'Update'}
                        </SubmitButton>
                      </sc.EditActions>
                    </sc.EditActionsWrapper>
                    <div className={`${sc.baseClass}__table--edit`}>
                      <ResourceTable
                        columns={tableColumns}
                        data={tableData}
                        renderEmptyView={renderEmptyView}
                        topPadding={false}
                      />
                    </div>

                    <ErrorMessage
                      error={error || errorSubmit || { message: errorMessage }}
                    />
                  </sc.Container>
                </Fieldset>
              </Form>
            )
          }

          const tableData = values.contacts.map((contact) => {
            return {
              ...contact,
              isSelected: (
                <FormikCheckbox
                  name={`selectedContactsDictionary[${contact.id}]`}
                />
              ),
            }
          })

          const selectedContactsDictionaryMap = Object.keys(
            values.selectedContactsDictionary
          ).map((key) => values.selectedContactsDictionary[key])

          const isActionsDisabled = selectedContactsDictionaryMap.reduce(
            (acc, curr) => {
              if (!acc) {
                return acc
              }
              if (curr) {
                return false
              }
              return acc
            },
            true
          )
          const onClickEdit = () => {
            setEditMode(true)
            const selected = values.contacts.filter(
              (contact) => values.selectedContactsDictionary[contact.id]
            )
            setFieldValue('editContacts', selected)
          }

          const onClickDelete = () => {
            setShowDeleteModal(true)
          }

          const onClickCancelModal = () => {
            setShowDeleteModal(false)
          }

          const onClickDeleteModal = async () => {
            try {
              const selectedIds = values.contacts
                .filter(
                  (contact) => values.selectedContactsDictionary[contact.id]
                )
                .map((contact) => contact.id)
              const newContacts = values.contacts.filter(
                (contact) => !selectedIds.includes(contact.id)
              )
              if (selectedIds.length > 0) {
                setFieldValue('contacts', newContacts)
              }
              setShowDeleteModal(false)
            } catch (err) {
              runCommonFormCatchHandlers({
                err,
                setErrorMessage,
              })
            }
          }
          const selectedIds = values.contacts
            .filter((contact) => values.selectedContactsDictionary[contact.id])
            .map((contact) => contact.id)

          return (
            <Form>
              <ModalDeleteContacts
                isActive={showDeleteModal}
                onClose={onClickCancelModal}
                numberOfContacts={selectedIds.length}
                onClickCancel={onClickCancelModal}
                onClickDelete={onClickDeleteModal}
              />
              <Fieldset
                disabled={isLoading}
                aria-busy={isLoading}
                style={{ width: '100%' }}
              >
                <PageBreadcrumbs>
                  <Breadcrumb
                    items={[
                      contactsBreadcrumb,
                      contactsBreadcrumbFile,
                      {
                        ...contactsBreadcrumbFileReview,
                        linkUrl: contactsBreadcrumbFileReview.linkUrl.replace(
                          '[id]',
                          fileId
                        ),
                      },
                    ]}
                    currentItemName={contactsBreadcrumbFileReview.name}
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
                  <ResourceActions
                    classNames={`${sc.baseClass}__actions`}
                    dropdownItems={[
                      {
                        id: 0,
                        onClick: onClickEdit,
                        text: 'Edit',
                      },
                      {
                        id: 1,
                        onClick: onClickDelete,
                        text: 'Delete',
                      },
                    ]}
                    dropdownProps={{ disabled: isActionsDisabled }}
                    heading="Contacts"
                  />
                  <div className={`${sc.baseClass}__table`}>
                    <ResourceTable
                      columns={[
                        {
                          accessor: 'isSelected',
                          Header: () => null,
                        },
                        {
                          accessor: 'firstName',
                          Header: 'First name',
                        },
                        {
                          accessor: 'lastName',
                          Header: 'Last name',
                        },
                        {
                          accessor: 'email',
                          Header: 'Email address',
                        },
                      ]}
                      data={tableData}
                      renderEmptyView={renderEmptyView}
                      topPadding={false}
                    />
                  </div>
                  <Paragraph topPadding>
                    {selectedContactsDictionaryMap.filter(Boolean).length} of{' '}
                    {values.contacts.length} selected
                  </Paragraph>

                  <ErrorMessage
                    error={error || errorSubmit || { message: errorMessage }}
                  />
                </sc.Container>
              </Fieldset>
            </Form>
          )
        }}
      </Formik>
    </sc.Wrapper>
  )
}
