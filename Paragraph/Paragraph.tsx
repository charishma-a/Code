import React, { HTMLAttributes, useState } from 'react'
import styled from 'styled-components'

import { BaseComponentProps } from '@/common/types'
import { device } from '@/utils/device'
import { pxToRem } from '@/utils/pxToRem'

const baseClass = 'kernls-paragraph'

export const DEFAULT_CHARACTER_LENGTH = 283

const Wrapper = styled.p<
  HTMLAttributes<HTMLParagraphElement> & {
    showLess?: boolean
    topPadding?: boolean
  }
>`
  margin: 0;
  color: #565656;
  padding-top: ${({ topPadding }) => (topPadding ? '1rem' : 0)};
  font-weight: normal;
  font-size: ${pxToRem({ px: 14 })};
  line-height: ${pxToRem({ px: 21 })};

  .${baseClass}__toggle {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }

  @media ${device.tablet} {
    font-size: 1rem;
    line-height: 1.625rem;
  }
  @media ${device.laptop} {
    font-size: 1rem;
    line-height: 1.625rem;
  }
`

export interface ParagraphProps extends BaseComponentProps {
  characterLength?: number
  topPadding?: boolean
}

export const Paragraph: React.FC<ParagraphProps> = ({
  characterLength,
  children,
  classNames,
  topPadding,
  ...restProps
}) => {
  const textLength = children?.toString().length
  const initialShowLess = textLength >= characterLength
  const [showLess, setShowLess] = useState(initialShowLess)

  const className = [baseClass, classNames].join(' ')

  const childrenString = children?.toString() || ''

  return (
    <Wrapper
      className={className}
      showLess={showLess}
      topPadding={topPadding}
      {...restProps}
    >
      {characterLength
        ? showLess
          ? childrenString.substring(0, characterLength - 3) + '... '
          : childrenString + ' '
        : children}
      {characterLength && textLength >= characterLength ? (
        <span
          className={`${baseClass}__toggle`}
          onClick={() => setShowLess((prev) => !prev)}
        >
          {showLess ? 'Read more' : 'Read less'}
        </span>
      ) : null}
    </Wrapper>
  )
}
