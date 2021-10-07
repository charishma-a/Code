import React, { FunctionComponent } from 'react'

import * as sc from './FoundationInfo.styled'

import { getResearchersText } from './utils/getResearchersText'

/* config */
import { Foundation } from '../../data/foundations'
import { Reseacher, ReseacherInstitute } from '../../data/projects'

export const foundationInfoBaseClass = 'kernls-foundation-info'

export interface FoundationInfoProps {
  className?: string
  foundation?: Foundation
  projectTitle: string
  researchers?: Reseacher[]
  researchInstitute: ReseacherInstitute
}

export const FoundationInfo: FunctionComponent<FoundationInfoProps> = (
  props
) => {
  const {
    className,
    foundation,
    projectTitle,
    researchers,
    researchInstitute,
  } = props

  const classNames = [foundationInfoBaseClass, className].join(' ')

  const researchersText = getResearchersText({ researchers })

  return (
    <sc.Wrapper className={classNames}>
      <p>
        <strong>Your donation is supporting:</strong>
        <br />
        {researchersText} project &lsquo;{projectTitle}&rsquo;
      </p>

      <p>
        {researchInstitute.name}
        <br />
        {researchInstitute.location}
      </p>

      {foundation ? (
        <p>
          <strong>
            Donations will be processed by the research institute’s partner
            foundation:
          </strong>
          <br />
          <sc.PurpleText>{foundation.description}</sc.PurpleText>
        </p>
      ) : null}
    </sc.Wrapper>
  )
}
