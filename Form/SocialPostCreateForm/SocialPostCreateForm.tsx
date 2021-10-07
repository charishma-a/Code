import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { trackCategory } from '@/utils/analytics'
import * as sc from './SocialPostCreateForm.styled'

import { BaseComponentProps } from '@/common/types'
import {
  Maybe,
  Profile,
  SocialPost,
  SocialPostDefault,
  useSocialPostDefaultsQuery,
} from '@/generated/graphql'
import {
  Fieldset,
  PageBreadcrumbs,
  PageBreadcumbsActionItems,
} from '@/common/styled'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  socialBreadcrumb1,
  socialBreadcrumb2,
  socialBreadcrumb3,
} from '@/constants/breadcrumbs/socialBreadcrumbs'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'
import { useRouter } from 'next/router'
import { ROUTE_SECURE_CHAMPION_SHARE_SOCIAL } from '@/constants/config'
import { CancelButton, SubmitButton } from '../SubmitButton'
import { ErrorMessage } from '@/components/ErrorMessage'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Paragraph } from '@/components/Paragraph'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'

interface IValues {
  postOptions: string[]
  selectedPostOptions: string[]
  socialPosts: Partial<SocialPost>[]
}

export interface ISocialPostCreateFormProps extends BaseComponentProps {
  me: Maybe<Profile>
}

export const SocialPostCreateForm: React.FC<ISocialPostCreateFormProps> = ({
  classNames,
  me,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')

  const router = useRouter()

  // apollo
  const { error, loading } = useSocialPostDefaultsQuery()

  // state
  const [errorMessage, setErrorMessage] = useState('')

  const initialValues: IValues = {
    postOptions: ['facebook', 'linkedin', 'instagram', 'twitter'],
    selectedPostOptions: [],
    socialPosts: [],
  }
  // const s = data.socialsostDefaults

  // const generateSocialPost = ({
  //   projectId,
  //   name,
  //   socialPostDefaults = [],
  //   socialPosts = [],
  // }: {
  //   projectId: string
  //   name: string
  //   socialPostDefaults: SocialPostDefault[]
  //   socialPosts: SocialPost[]
  // }): Partial<SocialPost> | undefined => {
  //   const socialPostDefault = socialPostDefaults.find(
  //     (spDefault) =>
  //       spDefault.socialPostChannel?.code === name &&
  //       spDefault.project?.id === projectId
  //   )

  //   if (!socialPostDefault) {
  //     return;
  //   }

  //   const socialPosts

  //   return {
  //     name:
  //   }
  // }

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
            toast('Successfully saved posts')
            router.push(ROUTE_SECURE_CHAMPION_SHARE_SOCIAL)

            setSubmitting(false)
          } catch (err) {
            runCommonFormCatchHandlers({
              err,
              setErrorMessage,
              setFieldError,
              setSubmitting,
              useToast: true,
            })
          }
        }}
      >
        {(formik) => {
          const { errors, values, setFieldValue } = formik

          const isLoading = loading
          const isSubmitDisabled = Object.keys(errors).length > 0 || isLoading

          const onClickCancel = () => {
            trackCategory({
              eventProps: {
                eventAction: 'Create A Post Nav Cancel',
                eventCategory: 'Create A Post  ',
                clickID: 'create-a-post-nav-cancel-button-click',
              },
            })
            router.push(ROUTE_SECURE_CHAMPION_SHARE_SOCIAL)
          }

          const renderContent = () => {
            if (loading) {
              return (
                <sc.Container>
                  <sc.EmptyView>
                    <CircularProgress />
                  </sc.EmptyView>
                </sc.Container>
              )
            }
            if (error) {
              return (
                <sc.Container>
                  <sc.EmptyView>
                    <ErrorMessage error={error} />
                  </sc.EmptyView>
                </sc.Container>
              )
            }

            return (
              <sc.Container>
                <ErrorMessage
                  classNames={`${sc.baseClass}__error`}
                  error={error || { message: errorMessage }}
                />
                <sc.PostOptions className={`${sc.baseClass}__options`}>
                  <Paragraph>Choose where you’d like to share a post</Paragraph>
                  <div className={`${sc.baseClass}__options__buttons`}>
                    {values.postOptions.map((name) => {
                      const isSelected =
                        values.selectedPostOptions.includes(name)

                      const onClick = () => {
                        if (isSelected) {
                          trackCategory({
                            eventProps: {
                              eventAction: 'Create A Post Choose Social Media',
                              eventCategory: 'Create A Post',
                              clickID: '${sc.baseClass}-options-button-click',
                            },
                          })

                          setFieldValue(
                            'selectedPostOptions',
                            values.selectedPostOptions.filter(
                              (option) => option !== name
                            )
                          )
                          setFieldValue(
                            'socialPosts',
                            values.socialPosts.filter(
                              (socialPost) =>
                                socialPost.socialPostChannel?.code !== name
                            )
                          )
                        } else {
                          setFieldValue('selectedPostOptions', [
                            ...values.selectedPostOptions,
                            name,
                          ])
                          setFieldValue('socialPosts', [
                            ...values.socialPosts,
                            {},
                          ])
                        }
                      }
                      return (
                        <sc.PostOptionButton
                          className={`${sc.baseClass}__options__buttons__button`}
                          isSelected={isSelected}
                          key={name}
                          onClick={onClick}
                          type="button"
                        >
                          {capitalizeFirstLetter(name)}
                        </sc.PostOptionButton>
                      )
                    })}
                  </div>
                </sc.PostOptions>
                <sc.NoPostCreated className={`${sc.baseClass}__posts`}>
                  <Paragraph>
                    No post is created. Select a social channel to start.
                  </Paragraph>
                </sc.NoPostCreated>
                <sc.Posts className={`${sc.baseClass}__posts`}></sc.Posts>
              </sc.Container>
            )
          }

          return (
            <Form>
              <Fieldset disabled={isLoading} aria-busy={isLoading}>
                <PageBreadcrumbs>
                  <Breadcrumb
                    items={[
                      socialBreadcrumb1,
                      socialBreadcrumb2,
                      socialBreadcrumb3,
                    ]}
                    currentItemName={socialBreadcrumb3.name}
                    style={{ justifyContent: 'flex-start' }}
                  />
                  <PageBreadcumbsActionItems>
                    <CancelButton onClick={onClickCancel} type="button">
                      Cancel
                    </CancelButton>
                    <SubmitButton
                      disabled={isSubmitDisabled}
                      type="submit"
                      onClick={() => {
                        trackCategory({
                          eventProps: {
                            eventAction: 'Create A Post Nav Save',
                            eventCategory: 'Create A Post  ',
                            clickID: 'create-a-post-nav-save-button-click',
                          },
                        })
                      }}
                    >
                      {loading ? 'Saving...' : 'Save'}
                    </SubmitButton>
                  </PageBreadcumbsActionItems>
                </PageBreadcrumbs>
                {renderContent()}
              </Fieldset>
            </Form>
          )
        }}
      </Formik>
    </sc.Wrapper>
  )
}
