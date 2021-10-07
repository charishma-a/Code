import React from 'react'

import { BaseComponentProps, RenderIcon } from '@/common/types'

import * as sc from './ActionButtonCard.styled'
import { ForwardArrow as SvgForwardArrow } from '@/generated/svgs'
import { Paragraph } from '@/components/Paragraph'

export interface ActionButtonCardProps extends BaseComponentProps {
  onClick: () => void
  renderIcon?: RenderIcon
  shortDescription: string
  title: string
  titleTag?: string
}

export const ActionButtonCard: React.FC<ActionButtonCardProps> = ({
  classNames,
  onClick,
  renderIcon,
  shortDescription,
  title,
  titleTag,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')
  return (
    <sc.Wrapper className={className} onClick={onClick} {...restProps}>
      {typeof renderIcon !== 'undefined' ? (
        <div className={`${sc.baseClass}__icon`}>
          {renderIcon({
            color: '#DADADA',
            fill: '#DADADA',
            height: '24',
            width: '30',
          })}
        </div>
      ) : null}
      <div className={`${sc.baseClass}__content`}>
        <div className={`${sc.baseClass}__content__title`}>
          <Paragraph>{title}</Paragraph>
          {titleTag ? <sc.Tag>{titleTag}</sc.Tag> : null}
        </div>
        <div className={`${sc.baseClass}__content__short`}>
          <Paragraph>{shortDescription}</Paragraph>
        </div>
      </div>
      <div className={`${sc.baseClass}__arrow`}>
        <SvgForwardArrow
          color="#DADADA"
          fill="#DADADA"
          height="20"
          width="12"
        />
      </div>
    </sc.Wrapper>
  )
}
