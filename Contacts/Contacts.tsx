import { CircularProgress } from '@material-ui/core'
import React, { useState } from 'react'
import * as yup from 'yup'
import { trackCategory } from '@/utils/analytics'
import * as sc from './Contacts.styled'

import { ResourceActions } from '../ResourceActions'

import { Fieldset } from '@/common/styled'
import { BaseComponentProps } from '@/common/types'
import {
  Contact,
  Maybe,
  MyContactsDocument,
  Profile,
  useDeleteMyContactsMutation,
  useMyContactsQuery,
  useUpdateMyContactsMutation,
} from '@/generated/graphql'
import { ResourceTable } from '../Table'
import { Form, Formik } from 'formik'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'
import { ErrorMessage } from '../ErrorMessage'
import { Paragraph } from '../Paragraph'
import {
  CancelButton,
  SecondaryButton,
  SubmitButton,
} from '../Form/SubmitButton'
import { FormikCheckbox } from '../Form/Formik/FormikCheckbox'
import { ModalAddContacts } from '../Modal/ModalAddContacts'
import { FormikInput } from '../Form/Formik/FormikInput'
import { ERROR_MESSAGE_FIELD_REQUIRED } from '@/constants/config'
import { toast } from 'react-toastify'
import { getArrayFieldNamePrefix } from '@/utils/getArrayFieldNamePrefix'
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
    .min(1, 'You must provide at least one contact')
    .required(ERROR_MESSAGE_FIELD_REQUIRED),
})

export interface IValues {
  allSelected: boolean
  selectedContactsDictionary?: { [key: string]: boolean }
  editContacts: Omit<Contact, 'emailContacts'>[]
  contacts: Partial<Omit<Contact, 'emailContacts'>>[]
}

export interface IContactsProps extends BaseComponentProps {
  me: Maybe<Profile>
}

export const Contacts: React.FC<IContactsProps> = ({
  classNames,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')

  // apollo
  const { data, error, loading } = useMyContactsQuery({})
  const [deleteMyContacts, { error: errorDelete }] =
    useDeleteMyContactsMutation()
  const [updateMyContacts, { error: errorUpdate, loading: loadingUpdate }] =
    useUpdateMyContactsMutation()

  // react state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onClickAddContacts = () => {
    trackCategory({
      eventProps: {
        eventAction: 'Add contacts button',
        eventCategory: 'Add Contacts',
        clickID: 'add-contacts-button-click',
      },
    })
    setShowCreateModal(true)
  }

  const contacts = data?.myContacts || []

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

  const renderEmptyView = () => {
    return (
      <sc.EmptyView>
        <Paragraph>
          You have no saved contacts.
          <br />
          Add contacts to easily send and track campaign emails.{' '}
        </Paragraph>
        <SecondaryButton onClick={onClickAddContacts} topMargin type="button">
          Add contacts
        </SecondaryButton>
      </sc.EmptyView>
    )
  }

  const initialValues: IValues = {
    allSelected: false,
    editContacts: [],
    selectedContactsDictionary: {},
    contacts,
  }

  return (
    <sc.Wrapper className={className} {...restProps}>
      <ModalAddContacts
        isActive={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values, formikHelpers) => {
          const { setSubmitting, setFieldError } = formikHelpers
          setSubmitting(true)
          setErrorMessage('')

          try {
            await updateMyContacts({
              variables: {
                input: {
                  contacts: values.editContacts.map((contact) => ({
                    id: contact.id,
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    email: contact.email,
                  })),
                },
              },
              refetchQueries: [{ query: MyContactsDocument }],
            })

            toast('Successfully updated contacts')
            setEditMode(false)
            setSubmitting(false)
            trackCategory({
              eventProps: {
                eventAction: 'Review Actions Update',
                eventCategory: 'Update Contacts',
                clickID: 'review-contacts-update-success',
              },
            })
          } catch (err) {
            trackCategory({
              eventProps: {
                eventAction: 'Review Actions Update',
                eventCategory: 'Update Contacts',
                clickID: 'review-contacts-update-failure',
              },
            })
            runCommonFormCatchHandlers({
              err,
              getArrayFieldNamePrefix: (fieldValue: string) =>
                getArrayFieldNamePrefix({
                  collection: values.editContacts,
                  collectionName: 'editContacts',
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
          const { errors, values, setFieldValue } = formik
          const isLoading = loading || loadingUpdate

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

            const onClickCancel = () => {
              trackCategory({
                eventProps: {
                  eventAction: 'Review Contacts Cancel',
                  eventCategory: 'Review Contacts Actions',
                  clickID: 'contacts-review-cancel-button-click',
                },
              })
              setFieldValue('editContacts', [])
              setEditMode(false)
            }

            return (
              <Form>
                <Fieldset
                  disabled={isLoading}
                  aria-busy={isLoading}
                  style={{ width: '100%' }}
                >
                  <sc.EditActionsWrapper
                    className={`${sc.baseClass}__edit-actions`}
                  >
                    <div className={`${sc.baseClass}__edit-actions__heading`}>
                      <h3>Edit Contacts</h3>
                    </div>
                    <sc.EditActions
                      className={`${sc.baseClass}__edit-actions__actions`}
                    >
                      <CancelButton onClick={onClickCancel} type="button">
                        Cancel
                      </CancelButton>
                      <SubmitButton disabled={submitDisabled} type="submit">
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
                    error={
                      error ||
                      errorDelete ||
                      errorUpdate || { message: errorMessage }
                    }
                  />
                </Fieldset>
              </Form>
            )
          }

          const tableData = values.contacts
            .map((contact) => {
              return {
                ...contact,
                isSelected: (
                  <FormikCheckbox
                    name={`selectedContactsDictionary[${contact.id}]`}
                    onChecked={() => {
                      trackCategory({
                        eventProps: {
                          eventAction: 'Review Select Contact',
                          eventCategory: 'Contacts Actions',
                          clickID: 'review-select-contacts-checkbox-checked',
                        },
                      })
                    }}
                  />
                ),
              }
            })
            .sort((a, b) => {
              if (a.updatedAt > b.updatedAt) {
                return -1
              }
              if (a.updatedAt < b.updatedAt) {
                return 1
              }
              // a must be equal to b
              return 0
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
            trackCategory({
              eventProps: {
                eventAction: 'Review Actions Edit ',
                eventCategory: 'Review Contacts Actions',
                clickID: 'contacts-review-actions-edit',
              },
            })
            setEditMode(true)
            const selected = values.contacts.filter(
              (contact) => values.selectedContactsDictionary[contact.id]
            )
            setFieldValue('editContacts', selected)
          }

          const onClickDelete = () => {
            trackCategory({
              eventProps: {
                eventAction: 'Review Actions Delete ',
                eventCategory: 'Review Contacts Actions',
                clickID: 'contacts-review-actions-delete',
              },
            })
            setShowDeleteModal(true)
          }

          const onClickCancelModal = () => {
            trackCategory({
              eventProps: {
                eventAction: 'Review Actions Delete',
                eventCategory: 'Delete Contacts',
                clickID: 'review-contacts-delete-popup-click-cancel',
              },
            })
            setShowDeleteModal(false)
          }

          const onClickDeleteModal = async () => {
            try {
              const selectedIds = values.contacts
                .filter(
                  (contact) => values.selectedContactsDictionary[contact.id]
                )
                .map((contact) => contact.id)

              if (selectedIds.length > 0) {
                await deleteMyContacts({
                  variables: {
                    input: {
                      ids: selectedIds,
                    },
                  },
                  update(cache, { data }) {
                    const existingContacts: { myContacts: Contact[] } =
                      cache.readQuery({
                        query: MyContactsDocument,
                      })
                    const newContacts = existingContacts.myContacts.filter(
                      (contact) => {
                        let included = false
                        data.deleteMyContacts.raw.forEach(({ id }) => {
                          if (id === contact.id) {
                            included = true
                          }
                        })
                        trackCategory({
                          eventProps: {
                            eventAction: 'Review Actions Delete',
                            eventCategory: 'Delete Contacts',
                            clickID:
                              'review-contacts-delete-popup-click-delete',
                          },
                        })

                        return !included
                      }
                    )
                    cache.writeQuery({
                      query: MyContactsDocument,
                      data: { myContacts: newContacts },
                    })
                  },
                })
              }
              // Success
              trackCategory({
                eventProps: {
                  eventAction: 'Review Actions Delete',
                  eventCategory: 'Delete Contacts',
                  clickID: 'review-contacts-delete-success',
                },
              })
              setShowDeleteModal(false)
            } catch (err) {
              //Failure
              trackCategory({
                eventProps: {
                  eventAction: 'Review Actions Delete',
                  eventCategory: 'Delete Contacts',
                  clickID: 'review-contacts-delete-failure',
                },
              })
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
                <ResourceActions
                  classNames={`${sc.baseClass}__actions`}
                  ctaOnClick={onClickAddContacts}
                  ctaText="Add contacts"
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
                  error={error || errorDelete || { message: errorMessage }}
                />
              </Fieldset>
            </Form>
          )
        }}
      </Formik>
    </sc.Wrapper>
  )
}
