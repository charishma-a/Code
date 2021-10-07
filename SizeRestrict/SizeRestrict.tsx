import React from 'react'

import * as sc from './SizeRestrict.styled'

import { BaseComponentProps } from '@/common/types'
import { useWindowSize } from '@/hooks/useWindowSize'
import { size } from '@/utils/device'
import { Paragraph } from '../Paragraph'

export interface ISizeRestrictProps extends BaseComponentProps {
  sizeToShow?: string
}

export const SizeRestrict: React.FC<ISizeRestrictProps> = ({
  classNames,
  children,
  sizeToShow = size.tablet,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')
  const windowWidth = useWindowSize()

  const sizeToShowInt = parseInt(sizeToShow.replace('px', ''), 10)

  if (windowWidth.width >= sizeToShowInt) {
    return <>{children}</>
  }

  return (
    <sc.Wrapper className={className} {...restProps}>
      <Paragraph style={{ color: '#000' }}>
        This page isn’t mobile-friendly.
      </Paragraph>
      <Paragraph>
        Building an email works best on desktop! Continue editing on your
        desktop browser for the full experience.
      </Paragraph>
    </sc.Wrapper>
  )
}
