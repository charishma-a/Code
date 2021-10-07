import { BaseComponentProps } from '@/common/types'
import { trackCategory } from '@/utils/analytics'
import React, { HTMLAttributes } from 'react'

import * as sc from './ProjectRequestCard.styled'

export const ProjectRequestCard: React.FC<
  BaseComponentProps & HTMLAttributes<HTMLDivElement>
> = ({ classNames, ...restProps }) => {
  const className = [sc.BASE_CLASS, classNames].join(' ').trim()

  const onClick = async () => {
    trackCategory({
      eventProps: {
        eventAction: 'Project Request Card CTA Click',
        eventCategory: 'Homepage Project Card',
        clickID: 'homepage-project-request-cta',
        clickText: 'Let us know!',
      },
    })
  }

  return (
    <sc.Wrapper className={className} {...restProps}>
      <sc.Container>
        <h3>Don’t see the research you want to support?</h3>
        <p>We have access to research projects waiting to be onboarded.</p>
        {/* unbounce will add an onclick here */}
        <span onClick={onClick} className="unbounce-research-project-request">
          Let us know!
        </span>
      </sc.Container>
    </sc.Wrapper>
  )
}
