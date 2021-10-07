import React, { FunctionComponent } from 'react'

import * as sc from './ChampionDepositSummary.styled'

/* common */
import { LineItem } from '@/common/styled'

/* config */
import { DEFAULT_CURRENCY, PROCESSING_BASE_FEE } from '@/constants/config'

/* utils */
import { formatAmountForDisplay } from '@/utils/stripe-helpers'

export const championDepositSummaryBaseClass = 'kernls-champion-deposit-summary'

export interface ChampionDepositSummaryProps {
  amountRemaining?: number
  className?: string
  coverProcessingFee?: boolean
  processingFee?: number
  currency?: string
  total?: number
}

export const ChampionDepositSummary: FunctionComponent<ChampionDepositSummaryProps> =
  (props) => {
    const {
      amountRemaining = 0,
      className,
      coverProcessingFee,
      processingFee,
      currency = DEFAULT_CURRENCY,
      total = 0,
    } = props

    const classNames = [championDepositSummaryBaseClass, className].join(' ')

    return (
      <sc.Wrapper className={classNames}>
        <h2>Deposit Summary</h2>
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
            <span>
              Payment processing fee ({processingFee >= 5 ? '$5' : '0.8%'})
            </span>
            <span>
              {formatAmountForDisplay({
                amount: processingFee,
                currency,
              })}
            </span>
          </LineItem>
        ) : null}
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
