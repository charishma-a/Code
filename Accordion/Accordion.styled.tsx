import styled from 'styled-components'
import * as raa from 'react-accessible-accordion'
import { device } from '@/utils/device'

export const baseClass = 'kernls-accordion'

export const Accordion = styled(raa.Accordion)`
  color: #565656;
`
export const AccordionItem = styled(raa.AccordionItem)``
export const AccordionItemHeading = styled(raa.AccordionItemHeading)`
  font-size: 0.75rem;
  padding: 0.75rem 0;

  @media ${device.tablet} {
    font-size: 1rem;
    padding: 1rem 0;
  }
`
export const AccordionItemButton = styled(raa.AccordionItemButton)`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;

  &[aria-expanded='true']::after,
  &[aria-selected='true']::after {
    transform: rotate(-135deg);
  }

  &:after {
    display: inline-block;
    content: '';
    height: 8px;
    width: 8px;
    border-bottom: 2px solid currentColor;
    border-right: 2px solid currentColor;
    transform: rotate(45deg);
    margin-right: 8px;
    margin-bottom: 4px;
  }
`
export const AccordionItemPanel = styled(raa.AccordionItemPanel)``
