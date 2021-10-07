import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { trackCategory } from '@/utils/analytics'
import * as sc from './EmailReview.styled'

import { BaseComponentProps } from '@/common/types'
import {
  Maybe,
  Profile,
  useMyEmailsQuery,
  useSendEmailMutation,
  useSendTestEmailMutation,
} from '@/generated/graphql'
import { ErrorMessage } from '../ErrorMessage'
import { FlexRowSpaceBetween } from '@/common/styled'
import {
  ROUTE_SECURE_CHAMPION_SHARE_EMAILS,
  ROUTE_SECURE_CHAMPION_SHARE_EMAILS_REVIEW_ADD_CONTACTS,
} from '@/constants/config'
import { useRouter } from 'next/router'
import { Paragraph } from '../Paragraph'
import { Button, SecondaryButton } from '../Form/SubmitButton'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'

export interface IEmailReviewProps extends BaseComponentProps {
  id: string
  me: Maybe<Profile>
}

export const EmailReview: React.FC<IEmailReviewProps> = ({
  classNames,
  id,
  me,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')
  const router = useRouter()

  // apollo
  const { data, error, loading } = useMyEmailsQuery({ variables: { id } })
  const [
    sendTestEmail,
    { loading: loadingSendTestEmail, error: errorSendTestEmail },
  ] = useSendTestEmailMutation()
  const [sendEmail, { loading: loadingSendEmail, error: errorSendEmail }] =
    useSendEmailMutation()

  // react state
  const [errorMessage, setErrorMessage] = useState('')

  const renderBody = () => {
    if (loading) {
      return 'Loading...'
    }
    if (error) {
      return <ErrorMessage error={error} />
    }
    const email = data.myEmails[0]
    const onClickAddRecipients = () => {
      trackCategory({
        eventProps: {
          eventAction: 'Review And Send Add Recepients',
          eventCategory: 'Review And Send',
          clickID:
            'create-an-email-review-and-send-add-recepients-button-click',
        },
      })
      router.push(
        ROUTE_SECURE_CHAMPION_SHARE_EMAILS_REVIEW_ADD_CONTACTS.replace(
          '[id]',
          id
        )
      )
    }
    const onSendTestEmail = async () => {
      trackCategory({
        eventProps: {
          eventAction: 'Review And Send Test Email',
          eventCategory: 'Review And Send',
          clickID: 'create-an-email-review-and-send-test-email-button-click',
        },
      })
      try {
        await sendTestEmail({
          variables: {
            input: {
              id: email.id,
            },
          },
        })
        trackCategory({
          eventProps: {
            eventAction: 'Review And Send test Email Success',
            eventCategory: 'Review And Send',
            clickID: 'review-and-send-test-email-success',
          },
        })
        toast(`Successfully sent a message to: ${me.email}`)
      } catch (err) {
        trackCategory({
          eventProps: {
            eventAction: 'Review And Send test Email Failure',
            eventCategory: 'Review And Send',
            clickID: 'review-and-send-test-email-failure',
          },
        })
        runCommonFormCatchHandlers({
          err,
          setErrorMessage,
        })
      }
    }
    const onSendEmail = async () => {
      trackCategory({
        eventProps: {
          eventAction: 'Review And Send Email',
          eventCategory: 'Review And Send',
          clickID: 'create-an-email-review-amd-send-email-button-click',
        },
      })
      try {
        await sendEmail({
          variables: {
            input: {
              id: email.id,
            },
          },
        })
        trackCategory({
          eventProps: {
            eventAction: 'Review And Send Email Success',
            eventCategory: 'Review And Send',
            clickID: 'review-and-send-email-success',
          },
        })
        toast(`Congratulations! You successfully sent your email.`)
        router.push(ROUTE_SECURE_CHAMPION_SHARE_EMAILS)
      } catch (err) {
        trackCategory({
          eventProps: {
            eventAction: 'Review And Send Email Failure',
            eventCategory: 'Review And Send',
            clickID: 'review-and-send-email-failure',
          },
        })
        runCommonFormCatchHandlers({
          err,
          setErrorMessage,
        })
      }
    }

    const numberOfContacts = email.emailContacts.length
    return (
      <>
        <div className={`${sc.baseClass}__header`}>
          <h2>Review and send email</h2>
        </div>
        <div className={`${sc.baseClass}__contacts`}>
          <FlexRowSpaceBetween>
            <div>
              <strong>Select and add recipients</strong>
              <Paragraph>
                Send your email to individuals or groups of contacts.
              </Paragraph>
            </div>
            <SecondaryButton onClick={onClickAddRecipients} type="button">
              Add recipients
            </SecondaryButton>
          </FlexRowSpaceBetween>
        </div>
        <div className={`${sc.baseClass}__actions`}>
          <FlexRowSpaceBetween>
            <div>
              <strong>Select and add recipients</strong>
              <Paragraph>
                Send your email to individuals or groups of contacts.
              </Paragraph>
            </div>
            <SecondaryButton onClick={onSendTestEmail} type="button">
              {loadingSendTestEmail
                ? 'Sending test email...'
                : 'Send test email'}
            </SecondaryButton>
          </FlexRowSpaceBetween>
          <FlexRowSpaceBetween style={{ marginTop: '1rem' }}>
            <div>
              <strong>Send email</strong>
              <Paragraph>
                Send the email to {numberOfContacts} recipients
              </Paragraph>
            </div>
            <Button
              disabled={numberOfContacts <= 0}
              onClick={onSendEmail}
              type="button"
            >
              {loadingSendEmail ? 'Sending test email...' : 'Send email now'}
            </Button>
          </FlexRowSpaceBetween>
          <ErrorMessage
            error={
              error ||
              errorSendEmail ||
              errorSendTestEmail || { message: errorMessage }
            }
          />
        </div>
      </>
    )
  }
  return (
    <sc.Wrapper className={className} {...restProps}>
      {renderBody()}
    </sc.Wrapper>
  )
}
