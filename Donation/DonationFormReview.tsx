import React, { FunctionComponent } from 'react'

import * as sc from './DonationFormReview.styled'

import { FoundationInfo } from './FoundationInfo'

/* config */
import { Foundation } from '@/data/foundations'
import { Reseacher, ReseacherInstitute } from '@/data/projects'

/* components */
import { ErrorMessage } from '../ErrorMessage'
import { DonationSubmitButton } from '../Form/SubmitButton'

/* utils */
import { Fieldset } from '@/common/styled'
import { formatAmountForDisplay } from '@/utils/stripe-helpers'
import { PROCESSING_BASE_FEE } from '@/constants/config'
import { IMAGE_PROPS_INFO_PURPLE } from '@/constants/images'

export const donationFormReviewBaseClass = 'kernls-donation-form-review'

export interface DonationFormReviewProps {
  className?: string
  currency?: string
  donationAmount?: number
  disabled?: boolean
  enableDonationMatching?: boolean
  error: Error
  foundation: Foundation
  impactAmount?: number
  onBackClick: () => void
  onSubmitForm: () => Promise<void>
  processingFee?: number
  processingFeePercent?: number
  projectTitle: string
  researchers?: Reseacher[]
  researchInstitute: ReseacherInstitute
  tip?: number
  tipPercent?: number
  total: number
  totalTaxDeductable?: number
}

export const DonationFormReview: FunctionComponent<DonationFormReviewProps> = (
  props
) => {
  const {
    className,
    currency,
    disabled,
    donationAmount,
    enableDonationMatching,
    error,
    foundation,
    onBackClick,
    onSubmitForm,
    impactAmount,
    processingFee,
    processingFeePercent,
    projectTitle,
    researchers,
    researchInstitute,
    tip,
    tipPercent,
    total,
    totalTaxDeductable,
  } = props

  const classNames = [donationFormReviewBaseClass, className].join(' ')

  return (
    <sc.Wrapper className={classNames}>
      <sc.BackLinkReview onClick={onBackClick}>
        &#60; Edit Donation
      </sc.BackLinkReview>
      <Fieldset disabled={disabled} aria-busy={disabled}>
        <sc.Container>
          <sc.InfoContainer>
            <h2>Review donation</h2>

            {enableDonationMatching ? (
              <sc.DonationMatchInfo>
                Your{' '}
                {formatAmountForDisplay({
                  amount: donationAmount,
                  currency,
                })}{' '}
                donation has been matched for a total impact of{' '}
                {formatAmountForDisplay({
                  amount: impactAmount,
                  currency,
                })}
              </sc.DonationMatchInfo>
            ) : null}

            <FoundationInfo
              foundation={foundation}
              projectTitle={projectTitle}
              researchers={researchers}
              researchInstitute={researchInstitute}
            />
          </sc.InfoContainer>
          <sc.TransactionContainer>
            <h2>Transaction breakdown</h2>

            <sc.LineItem>
              <span>Donation amount</span>
              <span>
                {formatAmountForDisplay({
                  amount: donationAmount,
                  currency,
                })}
              </span>
            </sc.LineItem>
            {processingFeePercent ? (
              <sc.LineItem>
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
              </sc.LineItem>
            ) : null}
            <sc.LineItem>
              <span>Kernls’ tip ({tipPercent}%)</span>
              <span>
                {formatAmountForDisplay({
                  amount: tip,
                  currency,
                })}
              </span>
            </sc.LineItem>
            <sc.Total>
              <sc.LineItem>
                <span>Total payment amount</span>
                <span>
                  {formatAmountForDisplay({
                    amount: total,
                    currency,
                  })}
                </span>
              </sc.LineItem>
            </sc.Total>
            {tip ? (
              <sc.Note>
                <sc.InfoIcon
                  alt={IMAGE_PROPS_INFO_PURPLE.getAlt()}
                  src={IMAGE_PROPS_INFO_PURPLE.getSrc()}
                />
                Please note: Your tax receipt will reflect a donation of{' '}
                {formatAmountForDisplay({
                  amount: totalTaxDeductable,
                  currency,
                })}
                . The{' '}
                {formatAmountForDisplay({
                  amount: tip,
                  currency,
                })}{' '}
                tip is not tax deductible.
              </sc.Note>
            ) : null}
            <ErrorMessage error={error} />
            <DonationSubmitButton
              style={{ marginTop: 'auto' }}
              type="button"
              onClick={onSubmitForm}
            >
              Donate{' '}
              {formatAmountForDisplay({
                amount: total,
                currency,
              })}
            </DonationSubmitButton>
          </sc.TransactionContainer>
        </sc.Container>
      </Fieldset>
    </sc.Wrapper>
  )
}
