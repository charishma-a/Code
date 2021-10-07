import { BaseComponentProps } from '@/common/types'
import React from 'react'

import * as sc from './Accordion.styled'

export type AccordionItem = {
  content: React.ReactNode
  heading: React.ReactNode
  id: string
}
export interface AccordionProps extends BaseComponentProps {
  data: AccordionItem[]
}

export const Accordion: React.FC<AccordionProps> = ({ classNames, data }) => {
  const className = [sc.baseClass, classNames].join(' ')
  return (
    <sc.Accordion className={className} allowZeroExpanded>
      {data.map(({ content, heading, id }) => {
        return (
          <sc.AccordionItem key={id}>
            <sc.AccordionItemHeading>
              <sc.AccordionItemButton>
                <span>{heading}</span>
              </sc.AccordionItemButton>
            </sc.AccordionItemHeading>
            <sc.AccordionItemPanel>{content}</sc.AccordionItemPanel>
          </sc.AccordionItem>
        )
      })}
    </sc.Accordion>
  )
}
