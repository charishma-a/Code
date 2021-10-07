import { formatDistance } from 'date-fns'
import React, { useState } from 'react'
import Link from 'next/link'
import { trackCategory } from '@/utils/analytics'
import * as sc from './SocialActivity.styled'

import { BaseComponentProps } from '@/common/types'
import {
  MySocialPostsDocument,
  SocialPost,
  useDeleteMySocialPostsMutation,
  useMySocialPostsQuery,
} from '@/generated/graphql'
import { ErrorMessage } from '../ErrorMessage'
import { ResourceTable } from '../Table'
import { Paragraph } from '../Paragraph'
import { SecondaryButton } from '../Form/SubmitButton'
import {
  ROUTE_SECURE_CHAMPION_SHARE_SOCIAL_CREATE,
  ROUTE_SECURE_CHAMPION_SHARE_SOCIAL_VIEW,
} from '@/constants/config'
import { ResourceActions } from '../ResourceActions'
import { Form, Formik } from 'formik'
import { Fieldset } from '@/common/styled'
import { ModalDelete } from '../Modal/ModalDelete'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'
import router from 'next/router'
import { CircularProgress } from '@material-ui/core'
import { FormikCheckbox } from '../Form/Formik/FormikCheckbox'

export interface IValues {
  selectedSocialPostsDictionary?: { [key: string]: boolean }
  socialPosts: Omit<SocialPost, 'profile' | 'projectCampaign'>[]
}

export interface ISocialActivityProps extends BaseComponentProps {
  title?: string
}

export const SocialActivity: React.FC<ISocialActivityProps> = ({
  classNames,
  title = 'Social media activity',
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')

  // apollo
  const { data, loading, error } = useMySocialPostsQuery()
  const [deleteMySocialPosts, { error: errorDelete, loading: loadingDelete }] =
    useDeleteMySocialPostsMutation()

  // react state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const socialPosts = data?.mySocialPosts || []

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
    selectedSocialPostsDictionary: {},
    socialPosts,
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
            router.push(ROUTE_SECURE_CHAMPION_SHARE_SOCIAL_CREATE)
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
          const isLoading = loading || loadingDelete

          const selectedSocialPostsDictionaryMap = Object.keys(
            values.selectedSocialPostsDictionary
          ).map((key) => values.selectedSocialPostsDictionary[key])

          const isActionsDisabled = selectedSocialPostsDictionaryMap.reduce(
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
                  There’s no activity yet.
                  <br />
                  Start by building your first post!
                </Paragraph>
                <SecondaryButton
                  onClick={submitForm}
                  role="button"
                  style={{ marginTop: '1rem' }}
                >
                  Create a post
                </SecondaryButton>
              </sc.EmptyView>
            )
          }

          const tableData = data.mySocialPosts.map((socialPost) => {
            const lastUpdated = formatDistance(
              new Date(Number(socialPost.updatedAt)),
              new Date(),
              { addSuffix: true }
            )
            const statusText = socialPost.postedAt ? 'Posted' : 'Draft'
            const channelLabel = socialPost.socialPostChannel?.label
            const name = `${channelLabel}: ${socialPost.name}`
            return {
              isSelected: (
                <FormikCheckbox
                  name={`selectedSocialPostsDictionary[${socialPost.id}]`}
                />
              ),
              name: (
                <Link
                  href={{
                    pathname: ROUTE_SECURE_CHAMPION_SHARE_SOCIAL_VIEW,
                    query: { id: socialPost.id },
                  }}
                >
                  <a className={`${sc.baseClass}__body__data__name`}>{name}</a>
                </Link>
              ),
              status: (
                <sc.Status className={statusText.toLowerCase()}>
                  {statusText}
                </sc.Status>
              ),
              lastUpdated,
            }
          })

          const onClickDelete = () => {
            trackCategory({
              eventProps: {
                eventAction: 'Create A Post Delete',
                eventCategory: 'Create A Post',
                clickID: 'create-a-post-delete-button-click',
              },
            })
            setShowDeleteModal(true)
          }

          const onClickCancelModal = () => {
            trackCategory({
              eventProps: {
                eventAction: 'Create A Post Delete Popup',
                eventCategory: 'Create A Post',
                clickID: 'create-a-post-cancel-button-click',
              },
            })
            setShowDeleteModal(false)
          }

          const onClickDeleteModal = async () => {
            trackCategory({
              eventProps: {
                eventAction: 'Create A Post Delete Popup',
                eventCategory: 'Create A Post',
                clickID: 'create-a-post-choose-delete-popup-delete-click',
              },
            })
            try {
              const selectedIds = values.socialPosts
                .filter(
                  (socialPost) =>
                    values.selectedSocialPostsDictionary[socialPost.id]
                )
                .map((socialPost) => socialPost.id)

              if (selectedIds.length > 0) {
                await deleteMySocialPosts({
                  variables: {
                    input: {
                      ids: selectedIds,
                    },
                  },
                  update(cache, { data }) {
                    const existingSocialPosts: { mySocialPosts: SocialPost[] } =
                      cache.readQuery({
                        query: MySocialPostsDocument,
                      })
                    const newSocialPosts =
                      existingSocialPosts.mySocialPosts.filter((socialPost) => {
                        let included = false
                        data.deleteMySocialPosts.raw.forEach(({ id }) => {
                          if (id === socialPost.id) {
                            included = true
                          }
                        })

                        return !included
                      })
                    cache.writeQuery({
                      query: MySocialPostsDocument,
                      data: { mySocialPosts: newSocialPosts },
                    })
                  },
                })
              }
              setShowDeleteModal(false)
            } catch (err) {
              runCommonFormCatchHandlers({
                err,
                setErrorMessage,
              })
            }
          }
          const selectedIds = values.socialPosts
            .filter(
              (socialPost) =>
                values.selectedSocialPostsDictionary[socialPost.id]
            )
            .map((socialPost) => socialPost.id)

          return (
            <Form>
              <ModalDelete
                isActive={showDeleteModal}
                onClose={onClickCancelModal}
                title={`Are you sure you want to delete ${selectedIds.length} posts?`}
                onClickCancel={onClickCancelModal}
                onClickDelete={onClickDeleteModal}
              />
              <Fieldset disabled={isLoading} aria-busy={isLoading}>
                <ResourceActions
                  classNames={`${sc.baseClass}__actions`}
                  ctaOnClick={submitForm}
                  ctaText="Create a post"
                  dropdownItems={[
                    {
                      id: 1,
                      onClick: onClickDelete,
                      text: 'Delete',
                    },
                  ]}
                  dropdownProps={{ disabled: isActionsDisabled }}
                  heading=""
                />
                <sc.Container>
                  <div className={`${sc.baseClass}__header`}>{title}</div>
                  <div className={`${sc.baseClass}__body`}>
                    <ResourceTable
                      columns={[
                        {
                          accessor: 'isSelected',
                          Header: () => null,
                        },
                        {
                          accessor: 'name',
                          Header: 'Post',
                        },
                        { accessor: 'status', Header: 'Status' },
                        { accessor: 'lastUpdated', Header: 'Last updated' },
                      ]}
                      renderEmptyView={renderEmptyView}
                      data={tableData}
                      topPadding={false}
                    />
                  </div>
                </sc.Container>

                <div className={`${sc.baseClass}__error`}>
                  <ErrorMessage
                    error={error || errorDelete || { message: errorMessage }}
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
