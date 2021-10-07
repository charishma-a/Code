import React, { FunctionComponent } from 'react'

import * as sc from './DonationSummary.styled'

/* common */
import { LineItem } from '@/common/styled'

/* config */
import { DEFAULT_CURRENCY, PROCESSING_BASE_FEE } from '@/constants/config'

/* utils */
import { formatAmountForDisplay } from '@/utils/stripe-helpers'

export const donationSummaryBaseClass = 'kernls-donation-summary'

export interface DonationSummaryProps {
  className?: string
  processingFee?: number
  processingFeePercent?: number
  currency?: string
  donationAmount?: number
  tip?: number
  total?: number
}

export const DonationSummary: FunctionComponent<DonationSummaryProps> = (
  props
) => {
  const {
    className,
    processingFee,
    processingFeePercent,
    currency = DEFAULT_CURRENCY,
    donationAmount = 0,
    tip = 0,
    total = 0,
  } = props

  const classNames = [donationSummaryBaseClass, className].join(' ')

  return (
    <sc.Wrapper className={classNames}>
      <h2>Donation Summary</h2>
      <LineItem>
        <span>Your donation</span>
        <span>
          {formatAmountForDisplay({
            amount: donationAmount,
            currency,
          })}
        </span>
      </LineItem>
      {processingFee ? (
        <LineItem>
          <span>
            Payment processing fee ({processingFeePercent}% +{' '}
            {formatAmountForDisplay({
              amount: PROCESSING_BASE_FEE,
              currency,
            })}
            )
          </span>
          <span>
            {formatAmountForDisplay({
              amount: processingFee,
              currency,
            })}
          </span>
        </LineItem>
      ) : null}
      <LineItem>
        <span>Kernls’ tip</span>
        <span>
          {formatAmountForDisplay({
            amount: tip || 0,
            currency,
          })}
        </span>
      </LineItem>
      <sc.Total>
        <LineItem>
          <span>Total amount</span>
          <span>
            {formatAmountForDisplay({
              amount: total,
              currency,
            })}
          </span>
        </LineItem>
      </sc.Total>
    </sc.Wrapper>
  )
}
