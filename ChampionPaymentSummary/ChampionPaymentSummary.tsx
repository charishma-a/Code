import { CircularProgress } from '@material-ui/core'
import React from 'react'

import * as sc from './ChampionPaymentSummary.styled'

import { BaseComponentProps } from '@/common/types'
import { Paragraph } from '../Paragraph'
import {
  Researcher,
  useMyActiveProjectCampaignQuery,
} from '@/generated/graphql'
import { EmptyCenterView } from '@/common/styled'
import { ErrorMessage } from '../ErrorMessage'
import { formatAmountForDisplay } from '@/utils/stripe-helpers'

function getResearchersText({
  researchers,
}: {
  researchers: Researcher[]
}): string {
  return (
    researchers.reduce((acc, curr) => {
      const text = curr.prefix
        ? `${curr.prefix} ${curr.firstName} ${curr.lastName}`
        : `${curr.firstName} ${curr.lastName}`
      if (!acc) {
        return text
      }
      return `${acc} and ${text}`
    }, '') + "'s"
  )
}

export const ChampionPaymentSummary: React.FC<BaseComponentProps> = ({
  classNames,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')

  // apollo
  const { data, error, loading } = useMyActiveProjectCampaignQuery()

  if (loading) {
    return (
      <sc.Wrapper className={className} {...restProps}>
        <EmptyCenterView>
          <CircularProgress />
        </EmptyCenterView>
      </sc.Wrapper>
    )
  }

  const renderError = (error: any) => (
    <sc.Wrapper className={className} {...restProps}>
      <EmptyCenterView>
        <ErrorMessage error={error} />
      </EmptyCenterView>
    </sc.Wrapper>
  )

  if (error) {
    return renderError(error)
  }

  const campaign = data.myActiveProjectCampaign

  if (!campaign) {
    return renderError({ message: 'No campaign found' })
  }
  const { projectChampion, project } = campaign
  if (!projectChampion) {
    return renderError({ message: 'No associated project' })
  }
  const { matchCommitment } = projectChampion
  const currency = projectChampion.currency || 'usd'
  if (!project) {
    return renderError({ message: 'No project found' })
  }
  const {
    researchInstitution,
    projectResearchers = [],
    projectFoundations = [],
  } = project
  const researchers = projectResearchers.map(({ researcher }) => researcher)

  const researchersText = getResearchersText({
    researchers,
  })

  const projectFoundation =
    projectFoundations.find(
      ({ foundation }) => foundation.currency === currency
    ) || projectFoundations[0]

  if (!projectFoundation) {
    return renderError({ message: 'No associated foundation' })
  }

  const { foundation } = projectFoundation

  return (
    <sc.Wrapper className={className} {...restProps}>
      <div className={`${sc.baseClass}__group`}>
        <Paragraph classNames="color-black">Your donation match:</Paragraph>
        <Paragraph>
          {formatAmountForDisplay({
            amount: matchCommitment,
            currency,
          })}
        </Paragraph>
      </div>
      <div className={`${sc.baseClass}__group`}>
        <Paragraph classNames="color-black">
          Your donation is supporting:
        </Paragraph>
        <Paragraph>
          {researchersText} project &lsquo;{project.title}&rsquo;
        </Paragraph>
        <Paragraph topPadding>
          {researchInstitution?.name}
          <br />
          {researchInstitution?.location}
        </Paragraph>
      </div>
      <div className={`${sc.baseClass}__group`}>
        <Paragraph classNames="color-black">
          Donations will be processed by research institute’s partner
          foundation:
        </Paragraph>
        <Paragraph>{foundation.description}</Paragraph>
      </div>
    </sc.Wrapper>
  )
}
