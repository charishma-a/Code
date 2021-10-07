import React, { FunctionComponent } from 'react'

import * as sc from './BecomeAChampion.styled'

/* constants */
import { FOR_BACKERS_URL } from '@/constants/config'

/* components */
import { Button } from '../Form/SubmitButton'

/* utils */
import { wrapExternalLinkUrl } from '@/utils/wrapExternalLinkUrl'
import { trackCategory } from '@/utils/analytics'
import { IMAGE_PROPS_BECOME_A_CHAMPION } from '@/constants/images'

export const becomeABackerBaseClass = 'kernls-become-a-backer'

export interface BecomeAChampionProps {
  className?: string
}

export const BecomeAChampion: FunctionComponent<BecomeAChampionProps> = (
  props
) => {
  const { className } = props
  const classNames = [becomeABackerBaseClass, className].join(' ')

  return (
    <sc.Wrapper className={classNames}>
      <div className={`${becomeABackerBaseClass}__header`}>
        <img
          alt={IMAGE_PROPS_BECOME_A_CHAMPION.getAlt()}
          src={IMAGE_PROPS_BECOME_A_CHAMPION.getSrc()}
        />
      </div>
      <div className={`${becomeABackerBaseClass}__body`}>
        <h3>Champion life-saving research!</h3>
        <p>
          Kernls gives donors the opportunity to take a more active role in
          supporting projects they care about. Anyone can get involved and make
          a difference!
        </p>
        <Button
          onClick={() => {
            trackCategory({
              eventProps: {
                eventAction: 'Donation CTA Click',
                eventCategory: 'Donation Flow',
                clickID: 'donation-flow-click-champion-learn-more',
              },
            })
            window.location.href = wrapExternalLinkUrl(FOR_BACKERS_URL)
          }}
        >
          Learn more
        </Button>
      </div>
    </sc.Wrapper>
  )
}
