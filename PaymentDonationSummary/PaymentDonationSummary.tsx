import React, { FunctionComponent } from 'react'

import * as sc from './PaymentDonationSummary.styled'

/* common */
import { LineItem } from '@/common/styled'

/* config */
import { DEFAULT_CURRENCY } from '@/constants/config'

/* utils */
import { formatAmountForDisplay } from '@/utils/stripe-helpers'

export const championDepositSummaryBaseClass = 'kernls-payment-donation-summary'

export interface ChampionDepositSummaryProps {
  amountRemaining?: number
  className?: string
  coverProcessingFee?: boolean
  processingFee?: number
  processingFeeCalc?: string
  currency?: string
  total?: number
}

export const PaymentDonationSummary: FunctionComponent<ChampionDepositSummaryProps> =
  (props) => {
    const {
      amountRemaining = 0,
      className,
      coverProcessingFee,
      processingFee,
      processingFeeCalc,
      currency = DEFAULT_CURRENCY,
      total = 0,
    } = props

    const classNames = [championDepositSummaryBaseClass, className].join(' ')

    return (
      <sc.Wrapper className={classNames}>
        <h2>Donation Summary</h2>
        <sc.LineItems>
          <LineItem>
            <span>Amount due today</span>
            <span>
              {formatAmountForDisplay({
                amount: amountRemaining,
                currency,
              })}
            </span>
          </LineItem>
          {coverProcessingFee ? (
            <LineItem>
              <span>Payment processing fee ({processingFeeCalc})</span>
              <span>
                {formatAmountForDisplay({
                  amount: processingFee,
                  currency,
                })}
              </span>
            </LineItem>
          ) : null}
        </sc.LineItems>
        <sc.Total>
          <LineItem>
            <span>Amount Due</span>
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
