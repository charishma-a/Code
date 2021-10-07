import React, { FunctionComponent, useEffect, useState } from 'react'

import * as sc from './DonationProject.styled'

import { FoundationInfo } from './FoundationInfo'

/* config */
import { Foundation } from '../../data/foundations'
import { Reseacher, ReseacherInstitute } from '../../data/projects'

export const donationProjectBaseClass = 'kernls-donation-project'

export interface DonationProjectProps {
  className?: string
  foundation?: Foundation
  projectTitle: string
  researchers?: Reseacher[]
  researchInstitute: ReseacherInstitute
}

export const DonationProject: FunctionComponent<DonationProjectProps> = (
  props
) => {
  const {
    className,
    foundation,
    projectTitle,
    researchers,
    researchInstitute,
  } = props

  const classNames = [donationProjectBaseClass, className].join(' ')

  const [highlight, setHighlight] = useState(false)

  useEffect(() => {
    let timer = null
    if (foundation?.id) {
      setHighlight(true)
      timer = setTimeout(() => {
        setHighlight(false)
      }, 5000)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [foundation])

  return (
    <sc.Wrapper className={classNames} highlight={highlight}>
      <FoundationInfo
        foundation={foundation}
        projectTitle={projectTitle}
        researchers={researchers}
        researchInstitute={researchInstitute}
      />
    </sc.Wrapper>
  )
}
