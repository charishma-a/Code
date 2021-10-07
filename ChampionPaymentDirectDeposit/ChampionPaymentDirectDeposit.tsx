import React, { useCallback, useState } from 'react'

import * as sc from './ChampionPaymentDirectDeposit.styled'

import { BaseComponentProps } from '@/common/types'
import {
  Maybe,
  Profile,
  useLinkBankAccountAuthMutation,
} from '@/generated/graphql'
import { Paragraph } from '../Paragraph'
import { Button } from '../Form/SubmitButton'
import { trackCategory } from '@/utils/analytics'
import { PlaidLinkButtonAuth } from '../PlaidLink'
import { TRACK_EVENT_CATEGORY } from './constants'
import { PlaidLinkOptions } from 'react-plaid-link'
import { useRouter } from 'next/router'
import { ROUTE_SECURE_CHAMPION_PAYMENTS_DIRECT_CREATE } from '@/constants/config'

export interface IChampionPaymentDirectDepositProps extends BaseComponentProps {
  me: Maybe<Profile>
}

export const ChampionPaymentDirectDeposit: React.FC<IChampionPaymentDirectDepositProps> =
  ({ classNames, me, ...restProps }) => {
    const className = [sc.baseClass, classNames].join(' ')
    const router = useRouter()

    // apollo

    const [linkBankAccountAuth] = useLinkBankAccountAuthMutation()

    // react state
    const [linkBankAccountError, setLinkBankAccountError] = useState('')
    const [linkBankAccountProccessing, setLinkBankAccountProcessing] =
      useState(false)

    const isReturingChampion = !!me.customerId

    const onClickContinue = () => {
      trackCategory({
        eventProps: {
          eventCategory: TRACK_EVENT_CATEGORY,
          eventAction: 'Connect bank account CTA',
          clickID: 'champion-payment-dd-click-continue',
        },
        extra: {
          isReturingChampion,
        },
      })
      router.push(ROUTE_SECURE_CHAMPION_PAYMENTS_DIRECT_CREATE)
    }

    const onSuccess = useCallback(async (publicToken, metadata) => {
      setLinkBankAccountError('')
      setLinkBankAccountProcessing(true)

      trackCategory({
        eventProps: {
          eventCategory: TRACK_EVENT_CATEGORY,
          eventAction: 'Connect bank account CTA success',
          clickID: 'backer-ach-deposit-result-connect-bank-success',
        },
      })

      // send token to server
      await linkBankAccountAuth({
        variables: {
          input: {
            publicToken,
            account: metadata.account,
            institution: metadata.institution,
          },
        },
      })
      router.push(ROUTE_SECURE_CHAMPION_PAYMENTS_DIRECT_CREATE)
      setLinkBankAccountProcessing(false)
    }, [])

    const plaidLinkOptions: Omit<PlaidLinkOptions, 'token'> = {
      onExit: (error) => {
        if (error) {
          setLinkBankAccountError(error.display_message)
        }
        trackCategory({
          eventProps: {
            eventCategory: TRACK_EVENT_CATEGORY,
            eventAction: 'Connect bank account CTA error',
            clickID: 'champion-payment-dd-result-connect-bank-error',
          },
          extra: {
            error,
            isReturingChampion,
          },
        })
        setLinkBankAccountProcessing(false)
      },
      onSuccess,
    }

    return (
      <sc.Wrapper className={className} {...restProps}>
        <h2>Credit Card</h2>
        <sc.Card>
          <h3>Connect to your bank account</h3>
          <Paragraph>
            We use a private and secure platform called Plaid to connect you to
            your bank account.
          </Paragraph>
          {isReturingChampion ? (
            <Button onClick={onClickContinue} type="button">
              Continue to payment
            </Button>
          ) : (
            <PlaidLinkButtonAuth
              linkBankAccountError={linkBankAccountError}
              linkBankAccountProccessing={linkBankAccountProccessing}
              options={plaidLinkOptions}
              setLinkBankAccountProcessing={setLinkBankAccountProcessing}
              onClick={() => {
                trackCategory({
                  eventProps: {
                    eventCategory: TRACK_EVENT_CATEGORY,
                    eventAction: 'Connect bank account CTA',
                    clickID: 'champion-payment-dd-click-connect-bank',
                  },
                  extra: {
                    isReturingChampion,
                  },
                })
              }}
            >
              {linkBankAccountProccessing
                ? 'Connecting...'
                : 'Connect to my bank account'}
            </PlaidLinkButtonAuth>
          )}
        </sc.Card>
      </sc.Wrapper>
    )
  }
