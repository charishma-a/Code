import { formatDistance } from 'date-fns'
import React, { useState } from 'react'
import Link from 'next/link'
import { trackCategory } from '@/utils/analytics'
import * as sc from './EmailActivity.styled'

import { BaseComponentProps } from '@/common/types'
import {
  Email,
  MyEmailsDocument,
  useDeleteMyEmailsMutation,
  useGenerateChampionEmailMutation,
  useMyEmailsQuery,
} from '@/generated/graphql'
import { ErrorMessage } from '../ErrorMessage'
import { ResourceTable } from '../Table'
import { Paragraph } from '../Paragraph'
import { SecondaryButton } from '../Form/SubmitButton'
import { ROUTE_SECURE_CHAMPION_SHARE_EMAILS_VIEW } from '@/constants/config'
import { ResourceActions } from '../ResourceActions'
import { Form, Formik } from 'formik'
import { Fieldset } from '@/common/styled'
import { ModalDelete } from '../Modal/ModalDelete'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'
import router from 'next/router'
import { CircularProgress } from '@material-ui/core'
import { FormikCheckbox } from '../Form/Formik/FormikCheckbox'
import { useWindowSize } from '@/hooks/useWindowSize'
import { size } from '@/utils/device'

export interface IValues {
  selectedEmailsDictionary?: { [key: string]: boolean }
  emails: Omit<Email, 'emailAudits' | 'emailContacts'>[]
}

export interface IEmailActivityProps extends BaseComponentProps {
  title?: string
}

export const EmailActivity: React.FC<IEmailActivityProps> = ({
  classNames,
  title = 'Email Activity',
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')
  const windowSize = useWindowSize()

  // apollo
  const { data, loading, error } = useMyEmailsQuery()
  const [
    generateChampionEmail,
    { error: errorGenerate, loading: loadingGenerate },
  ] = useGenerateChampionEmailMutation()
  const [deleteMyEmails, { error: errorDelete, loading: loadingDelete }] =
    useDeleteMyEmailsMutation()

  // react state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const emails = data?.myEmails || []

  const tabletWidth = parseInt(size.tablet.replace('px', ''), 10)
  const isTablet = windowSize.width >= tabletWidth

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

  const initialValues: IValues = {
    selectedEmailsDictionary: {},
    emails,
  }

  return (
    <sc.Wrapper className={className} {...restProps}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (_, { setSubmitting }) => {
          setSubmitting(true)
          setErrorMessage('')
          try {
            const res = await generateChampionEmail({
              refetchQueries: [{ query: MyEmailsDocument }],
            })
            if (!res.data?.generateChampionEmail?.id) {
              throw new Error('Did not create email correctly')
            }
            router.push(
              ROUTE_SECURE_CHAMPION_SHARE_EMAILS_VIEW.replace(
                '[id]',
                res.data?.generateChampionEmail?.id
              )
            )
            setSubmitting(false)
          } catch (err) {
            runCommonFormCatchHandlers({
              err,
              setErrorMessage,
            })
          }
        }}
      >
        {(formik) => {
          const { values, submitForm } = formik
          const isLoading = loading || loadingGenerate || loadingDelete

          const selectedEmailsDictionaryMap = Object.keys(
            values.selectedEmailsDictionary
          ).map((key) => values.selectedEmailsDictionary[key])

          const isActionsDisabled = selectedEmailsDictionaryMap.reduce(
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

          const renderEmptyView = () => {
            return (
              <sc.EmptyView>
                <Paragraph>
                  There is no email activity here yet. <br /> Start by building
                  your first email
                </Paragraph>
                <SecondaryButton
                  onClick={submitForm}
                  role="button"
                  style={{ marginTop: '1rem', width: '137px' }}
                >
                  Get started
                </SecondaryButton>
              </sc.EmptyView>
            )
          }

          let tableColumns = []
          let tableData = []

          if (isTablet) {
            tableColumns = [
              {
                accessor: 'isSelected',
                Header: () => null,
              },
              {
                accessor: 'emailName',
                Header: 'Email name',
              },
              { accessor: 'status', Header: 'Status' },
              { accessor: 'recipients', Header: 'Recipients' },
              { accessor: 'lastUpdated', Header: 'Last updated' },
            ]
            tableData = data.myEmails.map((email) => {
              const lastUpdated = formatDistance(
                new Date(Number(email.updatedAt)),
                new Date(),
                { addSuffix: true }
              )
              const recipients = email.emailContacts?.length || 0
              const statusText = email.sentAt ? 'Sent' : 'Draft'
              const commonTableData = {
                isSelected: (
                  <FormikCheckbox
                    name={`selectedEmailsDictionary[${email.id}]`}
                  />
                ),
                emailName: email.isOnboardingEmail ? (
                  email.name
                ) : (
                  <Link
                    href={{
                      pathname: ROUTE_SECURE_CHAMPION_SHARE_EMAILS_VIEW,
                      query: { id: email.id },
                    }}
                  >
                    <a className={`${sc.baseClass}__body__data__emailName`}>
                      {email.name}
                    </a>
                  </Link>
                ),
                status: (
                  <sc.Status className={statusText.toLowerCase()}>
                    {statusText}
                  </sc.Status>
                ),
                recipients: String(recipients),
                lastUpdated,
              }
              return commonTableData
            })
          } else {
            tableColumns = [
              {
                accessor: 'item1',
                Header: () => null,
              },
              {
                accessor: 'item2',
                Header: () => null,
              },
            ]
            const newTableData = []
            data.myEmails.forEach((email) => {
              const name = email.isOnboardingEmail ? (
                email.name
              ) : (
                <Link
                  href={{
                    pathname: ROUTE_SECURE_CHAMPION_SHARE_EMAILS_VIEW,
                    query: { id: email.id },
                  }}
                >
                  <a className={`${sc.baseClass}__body__data__emailName`}>
                    {email.name}
                  </a>
                </Link>
              )
              const statusText = email.sentAt ? 'Sent' : 'Draft'
              const status = (
                <sc.Status className={statusText.toLowerCase()}>
                  {statusText}
                </sc.Status>
              )
              newTableData.push({ item1: name, item2: status })

              const recipients = email.emailContacts?.length || 0
              newTableData.push({ item1: 'Recipients', item2: recipients })

              const lastUpdated = formatDistance(
                new Date(Number(email.updatedAt)),
                new Date(),
                { addSuffix: true }
              )
              newTableData.push({ item1: 'Last updated', item2: lastUpdated })
            })
            tableData = newTableData
          }

          const onClickDelete = () => {
            trackCategory({
              eventProps: {
                eventAction: 'Email Activity Delete ',
                eventCategory: 'Create An Email',
                clickID: 'email-activity-popup-delete-click',
              },
            })
            setShowDeleteModal(true)
          }

          const onClickCancelModal = () => {
            trackCategory({
              eventProps: {
                eventAction: 'Email Activity Delete ',
                eventCategory: 'Create An Email',
                clickID: 'email-activity-popup-cancel-click',
              },
            })
            setShowDeleteModal(false)
          }

          const onClickDeleteModal = async () => {
            try {
              const selectedIds = values.emails
                .filter((email) => values.selectedEmailsDictionary[email.id])
                .map((email) => email.id)

              if (selectedIds.length > 0) {
                await deleteMyEmails({
                  variables: {
                    input: {
                      ids: selectedIds,
                    },
                  },
                  update(cache, { data }) {
                    const existingEmails: { myEmails: Email[] } =
                      cache.readQuery({
                        query: MyEmailsDocument,
                      })
                    const newEmails = existingEmails.myEmails.filter(
                      (email) => {
                        let included = false
                        data.deleteMyEmails.raw.forEach(({ id }) => {
                          if (id === email.id) {
                            included = true
                          }
                        })

                        return !included
                      }
                    )
                    cache.writeQuery({
                      query: MyEmailsDocument,
                      data: { myEmails: newEmails },
                    })
                  },
                })
                trackCategory({
                  eventProps: {
                    eventAction: 'Email Activity Update Success',
                    eventCategory: 'Create An Email',
                    clickID: 'email-activity-update-success',
                  },
                })
              }
              setShowDeleteModal(false)
            } catch (err) {
              trackCategory({
                eventProps: {
                  eventAction: 'Email Activity Update Failure',
                  eventCategory: 'Create An Email',
                  clickID: 'email-activity-update-failure',
                },
              })
              runCommonFormCatchHandlers({
                err,
                setErrorMessage,
              })
            }
          }
          const selectedIds = values.emails
            .filter((email) => values.selectedEmailsDictionary[email.id])
            .map((email) => email.id)

          return (
            <Form>
              <ModalDelete
                isActive={showDeleteModal}
                onClose={onClickCancelModal}
                title={`Are you sure you want to delete ${selectedIds.length} emails?`}
                onClickCancel={onClickCancelModal}
                onClickDelete={onClickDeleteModal}
              />
              <Fieldset disabled={isLoading} aria-busy={isLoading}>
                <ResourceActions
                  classNames={`${sc.baseClass}__actions`}
                  ctaOnClick={submitForm}
                  ctaText="Create an email"
                  dropdownItems={[
                    {
                      id: 1,
                      onClick: onClickDelete,
                      text: 'Delete',
                    },
                  ]}
                  dropdownProps={{ disabled: isActionsDisabled }}
                  heading=""
                  showDropdown={isTablet}
                />
                <sc.Container>
                  <div className={`${sc.baseClass}__header`}>{title}</div>
                  <div className={`${sc.baseClass}__body`}>
                    <ResourceTable
                      columns={tableColumns}
                      renderEmptyView={renderEmptyView}
                      data={tableData}
                      topPadding={false}
                    />
                  </div>
                </sc.Container>

                <div className={`${sc.baseClass}__error`}>
                  <ErrorMessage
                    error={
                      error ||
                      errorGenerate ||
                      errorDelete || { message: errorMessage }
                    }
                  />
                </div>
              </Fieldset>
            </Form>
          )
        }}
      </Formik>
    </sc.Wrapper>
  )
}
