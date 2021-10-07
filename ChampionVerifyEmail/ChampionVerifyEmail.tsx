import React, { FunctionComponent, useEffect, useState } from 'react'

import * as sc from './ChampionVerifyEmail.styled'

/* components */
import { ErrorMessage } from '../ErrorMessage'

/* generataed */
import {
  FieldError,
  Profile,
  useVerifyEmailMutation,
} from '@/generated/graphql'

/* utils */
import { identify, hotspotPage } from '@/utils/analytics'
import { setAccessToken } from '@/store/accessToken'
import {
  ROUTE_CHAMPION_LOGIN,
  ROUTE_SECURE_CHAMPION_DASHBOARD,
} from '@/constants/config'
import Link from 'next/link'
import { Paragraph } from '../Paragraph'
import { LinkButtonPurple } from '@/common/styled'
import { trackCategory } from '@/utils/analytics'
export const profileVerifyEmailBaseClass = 'kernls-profile-verify-email'

type VerifyEmailResult = {
  accessToken: string
  errors: FieldError[]
  profile: Partial<Profile>
}

export interface ChampionVerifyEmailProps {
  className?: string
  code: string
  email: string
}

export const ChampionVerifyEmail: FunctionComponent<ChampionVerifyEmailProps> =
  (props) => {
    const { className, code, email } = props
    const classNames = [profileVerifyEmailBaseClass, className].join(' ')
    const [requestError, setRequestError] = useState(null)
    const [result, setResult] = useState<VerifyEmailResult>(null)

    // apollo
    const [verifyEmail, { error, loading }] = useVerifyEmailMutation()

    useEffect(() => {
      async function load() {
        try {
          if (email && code) {
            const result = await verifyEmail({
              variables: { input: { verifyEmailToken: code, email } },
            })
            if (result && result.data && result.data.verifyEmail) {
              trackCategory({
                eventProps: {
                  eventAction: 'SignUp Verify Email Success',
                  eventCategory: 'SignUp Verify Email Success ',
                  clickID: 'signup-verify-email-success',
                },
              })
              const { accessToken, errors, profile } = result.data.verifyEmail
              setResult({ accessToken, errors, profile })
              if (profile) {
                identify({
                  userId: profile.id,
                  traits: {
                    role: 'CHAMPION',
                    email: email,
                    verified: true,
                  },
                })
                // workaround to trigger identify
                hotspotPage()
              }
              if (accessToken) {
                setAccessToken(accessToken)
              }
            }
          }
        } catch (e) {
          trackCategory({
            eventProps: {
              eventAction: 'SignUp Verify Email Failure',
              eventCategory: 'SignUp Verify Email Failure ',
              clickID: 'signup-verify-email-failure',
            },
          })
          setRequestError(e)
        }
      }
      load()
    }, [code, email])

    if (!code || !email) {
      return <sc.Wrapper>No code or email provided.</sc.Wrapper>
    }

    if (loading || !result) {
      return <sc.Wrapper className={classNames}>Loading...</sc.Wrapper>
    }

    if (error) {
      return (
        <sc.Wrapper className={classNames}>
          <ErrorMessage error={error} />
        </sc.Wrapper>
      )
    }

    const { accessToken, errors, profile } = result

    const hasResultErrors = errors && errors.length > 0

    if (requestError || hasResultErrors) {
      return (
        <sc.Wrapper className={classNames}>
          {hasResultErrors
            ? errors[0].message
            : requestError?.message ||
              'Something went wrong. Please contact support at support@kernls.com.'}
        </sc.Wrapper>
      )
    }

    if (accessToken && profile) {
      const { profile } = result

      if (profile.isSalesRequired) {
        return (
          <sc.Wrapper className={classNames}>
            <h2>Your email has been verified</h2>
            <Paragraph>
              Tell us the project you’re interested in supporting.
            </Paragraph>
            <Link href={ROUTE_SECURE_CHAMPION_DASHBOARD}>
              <LinkButtonPurple
                topMargin
                onClick={() => {
                  trackCategory({
                    eventProps: {
                      eventAction: 'SignUp Verify Email Success Next',
                      eventCategory: 'SignUp Verify Email Success  ',
                      clickID: 'signup-verify-email-success-next-button-click',
                    },
                  })
                }}
              >
                Next
              </LinkButtonPurple>
            </Link>
          </sc.Wrapper>
        )
      }
      return (
        <sc.Wrapper className={classNames}>
          <h2>Your email has been verified</h2>
          <Paragraph>Create your profile in 3 easy steps!</Paragraph>
          <Link href={ROUTE_SECURE_CHAMPION_DASHBOARD}>
            <LinkButtonPurple topMargin>Get started</LinkButtonPurple>
          </Link>
        </sc.Wrapper>
      )
    }

    return (
      <sc.Wrapper className={classNames}>
        <h2>Your email has been verified</h2>
        <Link href={ROUTE_CHAMPION_LOGIN}>
          <LinkButtonPurple topMargin>Login</LinkButtonPurple>
        </Link>
      </sc.Wrapper>
    )
  }
