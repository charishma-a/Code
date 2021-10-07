import React, { HTMLAttributes } from 'react'
import { CTAButton } from '../Form/SubmitButton'
import { FOR_BACKERS_URL } from '@/constants/config'
import { wrapExternalLinkUrl } from '@/utils/wrapExternalLinkUrl'

import * as sc from './WhatIsAChampion.styled'
import { trackCategory } from '@/utils/analytics'
import { Title } from '@/common/styled'
import { Paragraph } from '../Paragraph'

export const whatIsAChampionBaseClass = `kernls-what-is-a-champion`

export interface WhatIsAChampionProps extends HTMLAttributes<HTMLDivElement> {
  classNames?: string
}

export const WhatIsAChampion: React.FC<WhatIsAChampionProps> = ({
  classNames,
  ...restProps
}) => {
  const className = [whatIsAChampionBaseClass, classNames].join(' ')

  const onClick = () => {
    trackCategory({
      eventProps: {
        eventAction: 'Learn Champions Click Detail',
        eventCategory: 'Learn Champion CTA',
        clickID: 'learn-champions-click-detail',
      },
    })
    window.location.href = wrapExternalLinkUrl(FOR_BACKERS_URL)
  }

  return (
    <sc.Wrapper className={className} {...restProps}>
      <Title>What is a Champion?</Title>
      <Paragraph topPadding>
        Champions take a more active role in supporting a research project. They
        help drive awareness and donations by promoting the project with their
        network and/or matching donations.
      </Paragraph>
      <CTAButton onClick={onClick} topMargin>
        Learn more about Champions
      </CTAButton>
    </sc.Wrapper>
  )
}
