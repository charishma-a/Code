import React from 'react'
import { useRouter } from 'next/router'

import * as sc from './ChampionPaymentOptions.styled'

import { BaseComponentProps } from '@/common/types'
import { Paragraph } from '../Paragraph'
import { ActionButtonCard } from '../Card/ActionButtonCard'
import {
  ROUTE_SECURE_CHAMPION_PAYMENTS_CREDIT,
  ROUTE_SECURE_CHAMPION_PAYMENTS_DIRECT,
} from '@/constants/config'
import { trackCategory } from '@/utils/analytics'

export const ChampionPaymentOptions: React.FC<BaseComponentProps> = ({
  classNames,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')
  const router = useRouter()
  const onClickCreditCard = () => {
    trackCategory({
      eventProps: {
        eventAction: 'Payment Method Credit Card',
        eventCategory: 'Payment Methods',
        clickID: 'payment-method-credit-card',
      },
    })
    router.push(ROUTE_SECURE_CHAMPION_PAYMENTS_CREDIT)
  }
  const onClickDeposit = () => {
    trackCategory({
      eventProps: {
        eventAction: 'Payment Direct Deposit',
        eventCategory: 'Payment Methods',
        clickID: 'payment-method-direct-deposit',
      },
    })
    router.push(ROUTE_SECURE_CHAMPION_PAYMENTS_DIRECT)
  }
  return (
    <sc.Wrapper className={className} {...restProps}>
      <div style={{ textAlign: 'left' }}>
        <h2 style={{ textAlign: 'left', margin: '0' }}>Fund your campaign</h2>
        <Paragraph>Please select your preferred payment method.</Paragraph>
      </div>
      <ActionButtonCard
        onClick={onClickCreditCard}
        shortDescription="Up to 2.9% + $0.30 base in fees, processed in 2-3 business days"
        style={{ marginBottom: '1rem', marginTop: '1rem' }}
        title="Credit Card"
      />
      <ActionButtonCard
        onClick={onClickDeposit}
        shortDescription="0.8% or a fixed $5 fee, processed in 5-7 business days"
        style={{ marginTop: '1rem' }}
        title="Direct Deposit"
      />
    </sc.Wrapper>
  )
}
