import { ArrowButton, SROnly } from '@/common/styled'
import { BaseComponentProps } from '@/common/types'
import React, { HTMLAttributes, useState } from 'react'

import * as sc from './SingleFocusedTabs.styled'

export type SingleFocusedTab = {
  content: React.ReactNode
  renderFooter?: ({
    setCurrentTabId,
  }: {
    setCurrentTabId: (id: string) => void
  }) => React.ReactNode
  id: string
  title: string
}

export interface SingleFocusedTabsProps extends BaseComponentProps {
  initialTabId?: string
  tabs: SingleFocusedTab[]
}

export const SingleFocusedTabs: React.FC<
  HTMLAttributes<HTMLDivElement> & SingleFocusedTabsProps
> = ({ classNames, initialTabId = '', tabs, ...restProps }) => {
  const className = [sc.baseClass, classNames].join(' ')

  const [currentTabId, setCurrentTabId] = useState(initialTabId)

  const currentTab = tabs.find(({ id }) => id === currentTabId) || tabs[0]

  if (!currentTab) {
    return null
  }

  const currentTabIndex = tabs.findIndex(({ id }) => id === currentTabId) || 0

  const previousTab = tabs[currentTabIndex - 1]
  const nextTab = tabs[currentTabIndex + 1]

  const onClickPrevious = () => {
    setCurrentTabId(previousTab.id)
  }
  const onClickNext = () => {
    setCurrentTabId(nextTab.id)
  }

  return (
    <sc.Wrapper className={className} id={currentTabId} {...restProps}>
      <sc.Header className={`${sc.baseClass}__header`}>
        <ArrowButton
          onClick={onClickPrevious}
          disabled={!previousTab}
          direction="left"
        >
          <SROnly>Previous</SROnly>
        </ArrowButton>
        <span className={`${sc.baseClass}__header__title`}>
          {currentTab.title}
        </span>
        <ArrowButton
          onClick={onClickNext}
          disabled={!nextTab}
          direction="right"
        >
          <SROnly>Next</SROnly>
        </ArrowButton>
      </sc.Header>
      <sc.Content className={`${sc.baseClass}__content`}>
        {currentTab.content}
      </sc.Content>
      {typeof currentTab.renderFooter === 'function'
        ? currentTab.renderFooter({ setCurrentTabId })
        : null}
    </sc.Wrapper>
  )
}
