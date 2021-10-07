import React from 'react'

import * as sc from './EmailView.styled'
import { trackCategory } from '@/utils/analytics'
import { BaseComponentProps } from '@/common/types'
import { Maybe, Profile, useMyEmailsQuery } from '@/generated/graphql'
import { ErrorMessage } from '../ErrorMessage'
import { ButtonLink, FlexRowSpaceBetween } from '@/common/styled'
import { ROUTE_SECURE_CHAMPION_SHARE_EMAILS_EDIT } from '@/constants/config'
import { useRouter } from 'next/router'
import { Paragraph } from '../Paragraph'
import { Image } from '../Image'
import { genProjectPageUrl } from '@/utils/getProjectPageUrl'

export interface IEmailViewProps extends BaseComponentProps {
  id: string
  me: Maybe<Profile>
}

export const EmailView: React.FC<IEmailViewProps> = ({
  classNames,
  id,
  me,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')
  const router = useRouter()
  const { data, error, loading } = useMyEmailsQuery({ variables: { id } })
  const renderBody = () => {
    if (loading) {
      return 'Loading...'
    }
    if (error) {
      return <ErrorMessage error={error} />
    }
    const email = data.myEmails[0]
    const onClickEdit = () => {
      trackCategory({
        eventProps: {
          eventAction: 'Create An Email Recipients Edit',
          eventCategory: 'Create An Email',
          clickID: 'create-an-email-edit-click',
        },
      })
      router.push(ROUTE_SECURE_CHAMPION_SHARE_EMAILS_EDIT.replace('[id]', id))
    }
    const projectUrl = me
      ? genProjectPageUrl({
          profileId: me.id,
          projectSlug: me.projectChampion.project.slug,
          isWithReferred: true,
        })
      : ''
    return (
      <>
        <div className={`${sc.baseClass}__header`}>
          <FlexRowSpaceBetween>
            <span>{email.name}</span>
            <ButtonLink onClick={onClickEdit} role="button">
              Edit
            </ButtonLink>
          </FlexRowSpaceBetween>
        </div>
        <div className={`${sc.baseClass}__meta`}>
          <FlexRowSpaceBetween>
            <span>Reply-to email: {email.replyTo}</span>
            <ButtonLink onClick={onClickEdit} role="button">
              Edit
            </ButtonLink>
          </FlexRowSpaceBetween>
          <FlexRowSpaceBetween>
            <span>To:</span>
            <ButtonLink onClick={onClickEdit} role="button">
              Add recipients
            </ButtonLink>
          </FlexRowSpaceBetween>
          <FlexRowSpaceBetween>
            <span>Subject line: {email.subjectLine}</span>
            <ButtonLink onClick={onClickEdit} role="button">
              Edit
            </ButtonLink>
          </FlexRowSpaceBetween>
        </div>
        <div className={`${sc.baseClass}__body`}>
          <Paragraph>
            {email.customData.salutationPrefix}
            {email.customData.usePersonalizedSalutation
              ? ' {{ firstName }},'
              : ` ${email.customData.firstName},`}
          </Paragraph>
          <Paragraph topPadding>
            {email.customData.introOpening} {email.customData.introMotivation}
          </Paragraph>
          {email.customData.bodyPersonalStory ? (
            <Paragraph topPadding>
              {email.customData.bodyPersonalStory}
            </Paragraph>
          ) : null}
          {email.customData.bodyImage ? (
            <div style={{ marginTop: '1rem' }}>
              <Image isCircle={false} src={email.customData.bodyImage} />
            </div>
          ) : null}
          <Paragraph topPadding>{email.customData.bodyTheAsk}</Paragraph>
          <Paragraph topPadding>{email.customData.conclusionImpact}</Paragraph>
          <Paragraph topPadding>
            You can help by donating to the project and by sharing it on
            Facebook, LinkedIn, or Twitter.
          </Paragraph>
          <Paragraph topPadding>
            Check out the project{' '}
            <a
              href={projectUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                trackCategory({
                  eventProps: {
                    eventAction: 'Create An Email Checkout Project',
                    eventCategory: 'Create An Email',
                    clickID: 'create-an-email-checkout-project-here-link-click',
                  },
                })
              }}
            >
              here
            </a>
            .
          </Paragraph>
          <Paragraph topPadding>
            {email.customData.usePersonalizedClosing ? (
              <span>
                {email.customData.closingPrefix}
                <br /> {email.customData.conclusionName}
              </span>
            ) : (
              <span>{email.customData.closingPrefix}</span>
            )}
          </Paragraph>
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
