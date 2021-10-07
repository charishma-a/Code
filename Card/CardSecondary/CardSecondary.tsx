import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: #f2f2f2;
  border-radius: 5px;
  padding: 1.5rem 1rem;
  width: 100%;
`

export const cardSecondaryBaseClass = 'kernls-card-secondary'

export interface CardSecondaryProps {
  className?: string
}

export const CardSecondary: FunctionComponent<CardSecondaryProps> = (props) => {
  const { children, className, ...restProps } = props

  const classNames = [cardSecondaryBaseClass, className].join(' ')

  return (
    <Wrapper className={classNames} {...restProps}>
      {children}
    </Wrapper>
  )
}
