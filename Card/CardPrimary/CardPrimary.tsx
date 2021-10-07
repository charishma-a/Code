import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

/* utils */
import { device } from '../../../utils/device'

const Wrapper = styled.div`
  background-color: #ffffff;
  border: 0;
  box-shadow: none;
  border-radius: 5px;
  padding: 1.5rem 1rem;
  width: 100%;
  @media ${device.tablet} {
    box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.02);
  }
`

export const cardPrimaryBaseClass = 'kernls-card-primary'

export interface CardPrimaryProps {
  className?: string
}

export const CardPrimary: FunctionComponent<CardPrimaryProps> = (props) => {
  const { children, className } = props

  const classNames = [cardPrimaryBaseClass, className].join(' ')

  return <Wrapper className={classNames}>{children}</Wrapper>
}
