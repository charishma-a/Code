import { BaseComponentProps } from '@/common/types'
import React from 'react'
import Link from 'next/link'

import * as sc from './Breadcrumb.styled'
import { BackwardArrow, ForwardArrow } from '@/generated/svgs'

export type BreadcrumbItem = {
  label: string
  linkUrl?: string
  onClick?: (name: string) => void
  name: string
}

export interface BreadcrumbProps extends BaseComponentProps {
  items: BreadcrumbItem[]
  currentItemName: string
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  classNames,
  items,
  currentItemName,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')
  const activeIndex = items.findIndex(({ name }) => name === currentItemName)
  return (
    <sc.Wrapper className={className} {...restProps}>
      {items.map(({ label, linkUrl, onClick, name }, index) => {
        const isActive = index === activeIndex
        const isCurrentOrPrevious = isActive || index < activeIndex
        const isLastItem = index === items.length - 1
        const renderContent = () => {
          if (!isCurrentOrPrevious) {
            return label
          }
          if (linkUrl) {
            return (
              <Link href={linkUrl}>
                <a>{label}</a>
              </Link>
            )
          }
          if (typeof onClick === 'function') {
            const onClickHandler = () => {
              onClick(name)
            }
            return <span onClick={onClickHandler}>{label}</span>
          }
          return label
        }
        const renderMobileBackLink = () => {
          const previousItem = items[index - 1]
          if (!previousItem) {
            return null
          }

          if (previousItem.linkUrl) {
            return (
              <Link href={previousItem.linkUrl} passHref>
                <sc.MobileBackLink>
                  <BackwardArrow
                    className="kernls-svg kernls-back"
                    color="#825EFF"
                  />
                </sc.MobileBackLink>
              </Link>
            )
          }

          if (typeof previousItem.onClick === 'function') {
            const onClickHandler = () => {
              onClick(previousItem.name)
            }
            return (
              <sc.MobileBackSpan onClick={onClickHandler}>
                <BackwardArrow
                  className="kernls-svg kernls-back"
                  color="#825EFF"
                />
              </sc.MobileBackSpan>
            )
          }
          return null
        }
        return (
          <sc.BreadcrumbItem
            className={`${sc.baseClass}__item`}
            isActive={isActive}
            key={name}
          >
            {renderMobileBackLink()}
            {renderContent()}
            {isLastItem ? null : (
              <ForwardArrow
                className="kernls-svg kernls-next"
                color="#825EFF"
              />
            )}
          </sc.BreadcrumbItem>
        )
      })}
    </sc.Wrapper>
  )
}
