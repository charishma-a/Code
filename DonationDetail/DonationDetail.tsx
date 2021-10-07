import React, { FunctionComponent } from 'react'

import * as sc from './DonationDetail.styled'

import { BecomeAChampion } from './BecomeAChampion'
import { DonationDetailSummary } from './DonationDetailSummary'

/* common */
import { FlexContainer } from '@/common/styled'

/* components */
import { ErrorMessage } from '../ErrorMessage'
import { ProjectShare } from '../ProjectShare'

/* data */
import { PROJECTS, SharingSection } from '@/data/projects'

/* generated */
import { useDonationQuery } from '@/generated/graphql'

/* utils */
import { calculateTotal, formatAmountForDisplay } from '@/utils/stripe-helpers'
import { DonationDetailVariant } from './types'

export const donationDetailBaseClass = 'kernls-donation-detail'

export interface DonationDetailProps {
  className?: string
  donationId: string
  variant: DonationDetailVariant
}

export const DonationDetail: FunctionComponent<DonationDetailProps> = (
  props
) => {
  const { className, donationId, variant } = props
  const classNames = [donationDetailBaseClass, className].join(' ')

  // apollo
  const { data, loading, error } = useDonationQuery({
    variables: { id: donationId },
  })

  if (loading) {
    return <sc.Wrapper className={classNames}>Loading...</sc.Wrapper>
  }

  if (error) {
    return (
      <sc.Wrapper className={classNames}>
        <ErrorMessage error={error} />
      </sc.Wrapper>
    )
  }

  const result = data?.donation

  if (!result || !result.id) {
    return <sc.Wrapper className={classNames}>No donation found</sc.Wrapper>
  }
  const {
    amount: donationAmount,
    currency,
    donationMatch,
    donor,
    processingFee,
    project,
    foundation,
    tip,
    tipPercent,
  } = result

  const resultFoundationPreferencs = donor.foundationDonors[0]

  const dataProject = PROJECTS.find(({ id }) => id === project.id)

  if (!dataProject) {
    return <sc.Wrapper className={classNames}>No project found</sc.Wrapper>
  }

  const total = calculateTotal(donationAmount, processingFee, tip)
  const taxReceiptTotal = calculateTotal(donationAmount, processingFee)

  const formattedDonationAmount = formatAmountForDisplay({
    amount: donationAmount,
    currency,
  })
  const formattedTotal = formatAmountForDisplay({
    amount: total,
    currency,
  })
  const formattedTaxReceiptTotal = formatAmountForDisplay({
    amount: taxReceiptTotal,
    currency,
  })

  const taxReceiptOptin =
    resultFoundationPreferencs.optinReceiveFoundationTaxReceipt ||
    donationAmount >= 250

  const isDonationMatched = donationMatch.length > 0

  // const donationMatched =
  // dataProject.backers.length > 0 &&
  // !['37fddd64-2773-4b56-803c-2ae5d295d551'].includes(dataProject.id)

  const renderNextSteps = () => {
    if (taxReceiptOptin) {
      const nextStepsSecond =
        project.id === 'a6ab9ab0-eaf3-407c-8954-05309ad96d5a' ? (
          <li>
            You’ll receive an email that includes official tax receipt details.
          </li>
        ) : (
          <>
            <li>
              You&apos;ll receive an email to verify your email address. This is
              required to receive a tax receipt from the foundation.
            </li>
            <li>
              Once verified, <strong>{foundation?.name}</strong> will send you a
              tax receipt for {formattedTaxReceiptTotal} within 5-7 working
              days.
            </li>
          </>
        )
      return tip ? (
        <ol>
          <li>
            You&apos;ll receive a Stripe receipt for {formattedTotal} that
            includes your donation amount and the added {tipPercent}% to support
            Kernls&apos; mission (thank you!).
          </li>
          {nextStepsSecond}
        </ol>
      ) : (
        <ol>
          <li>
            You&apos;ll receive a Stripe receipt for {formattedTotal} that
            breaks down your donation and Kernls&apos; platform fee.
          </li>
          {nextStepsSecond}
        </ol>
      )
    }
    return tip ? (
      <p>
        You&apos;ll receive a Stripe receipt for {formattedTotal} that includes
        your donation amount and the added {tipPercent}% to support Kernls&apos;
        mission (thank you!).
      </p>
    ) : (
      <p>
        You&apos;ll receive a Stripe receipt for {formattedTotal} that breaks
        down your donation and Kernls&apos; platform fee.
      </p>
    )
  }

  return (
    <sc.Wrapper className={classNames}>
      <sc.ThankYouContainer>
        <h2>Thank you, {donor.firstName}!</h2>
        {isDonationMatched ? (
          <p>Your {formattedDonationAmount} donation was matched to support:</p>
        ) : (
          <p>Your {formattedDonationAmount} donation was sent to support:</p>
        )}
        <p>{dataProject.title}</p>
      </sc.ThankYouContainer>
      <FlexContainer>
        <DonationDetailSummary
          donorId={donor.id}
          donorEmail={donor.email}
          projectId={project.id}
          receiveUpdatesFromKernlsInitial={donor.optinKernlsUpdates}
          renderNextSteps={renderNextSteps}
          variant={variant}
        />
        <BecomeAChampion />
      </FlexContainer>
      <ProjectShare
        projectId={dataProject.id}
        sharingSection={SharingSection.Donated}
      />
    </sc.Wrapper>
  )
}
