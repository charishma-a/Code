import { Elements } from '@stripe/react-stripe-js'

import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react'

import * as sc from './Donation.styled'

import { DonationForm } from './DonationForm'
import { DonationSummary } from './DonationSummary'

/* common */
import { FormGroup } from '@/common/styled'

/* generated */
import { useProjectQuery } from '@/generated/graphql'

/* constants */
import { DEFAULT_CURRENCY } from '@/constants/config'
import { Project } from '@/data/projects'

/* utils */
import getStripe from '@/utils/get-stripejs'

export const donationBaseClass = 'kernls-donation'

export interface DonationProps {
  backLink?: ReactNode
  className?: string
  cmsProjectContent?: Project
  referredId?: string
  setShowReview: (value: boolean) => void
  showReview: boolean
}

export const Donation: FunctionComponent<DonationProps> = (props) => {
  const {
    backLink,
    className,
    cmsProjectContent,
    referredId,
    setShowReview,
    showReview,
  } = props

  const classNames = [donationBaseClass, className].join(' ')

  // lifted up state from form that other components need
  const [showResidence, setShowResidence] = useState(false)
  const [foundationId, setFoundationId] = useState('')

  // nextjs will render without id at first then hydrate
  // set show residence or default selected residence
  useEffect(() => {
    if (cmsProjectContent?.foundations?.length > 1) {
      setShowResidence(true)
    } else if (cmsProjectContent?.foundations?.length) {
      setFoundationId(cmsProjectContent.foundations[0].id)
    }
  }, [cmsProjectContent])

  const { data, error, loading } = useProjectQuery({
    fetchPolicy: 'network-only',
    variables: {
      ids: [cmsProjectContent?.id],
    },
  })

  // In the case there is not project
  if (!cmsProjectContent || !cmsProjectContent.id) {
    return (
      <sc.Wrapper className={classNames}>
        <sc.FormSection>
          {backLink ? <FormGroup>{backLink}</FormGroup> : null}
          <p>No project found</p>
        </sc.FormSection>
        <sc.SummaryAside>
          <DonationSummary
            currency={DEFAULT_CURRENCY}
            donationAmount={0}
            processingFee={0}
            tip={0}
          />
        </sc.SummaryAside>
      </sc.Wrapper>
    )
  }

  if (loading) {
    return (
      <sc.Wrapper className={classNames}>
        <sc.FormSection>
          {backLink ? <FormGroup>{backLink}</FormGroup> : null}
          <p>Loading...</p>
        </sc.FormSection>
        <sc.SummaryAside>
          <DonationSummary
            currency={DEFAULT_CURRENCY}
            donationAmount={0}
            processingFee={0}
            tip={0}
          />
        </sc.SummaryAside>
      </sc.Wrapper>
    )
  }

  if (error || !data?.projects?.length) {
    return (
      <sc.Wrapper className={classNames}>
        <sc.FormSection>
          {backLink ? <FormGroup>{backLink}</FormGroup> : null}
          <p>No project found</p>
        </sc.FormSection>
        <sc.SummaryAside>
          <DonationSummary
            currency={DEFAULT_CURRENCY}
            donationAmount={0}
            processingFee={0}
            tip={0}
          />
        </sc.SummaryAside>
      </sc.Wrapper>
    )
  }

  const project = data.projects.find(({ id }) => id === cmsProjectContent.id)

  return (
    <sc.Wrapper className={classNames}>
      <Elements stripe={getStripe()}>
        <DonationForm
          backLink={backLink}
          cmsProjectContent={cmsProjectContent}
          foundationId={foundationId}
          project={project}
          referredId={referredId}
          setShowReview={setShowReview}
          showResidence={showResidence}
          showReview={showReview}
        />
      </Elements>
    </sc.Wrapper>
  )
}
