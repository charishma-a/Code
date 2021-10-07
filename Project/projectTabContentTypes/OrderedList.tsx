import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

/* utils */
import { device } from '@/utils/device'

const Container = styled.ol<
  HTMLAttributes<HTMLUListElement> & { topPadding?: boolean }
>`
  padding: 0.5rem 0 0 1.5rem;
  padding-top: ${({ topPadding }) => (topPadding ? '1rem' : 0)};
  list-style-position: outside;
  margin: 0;
  color: #565656;
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 1.1875rem;
  @media ${device.tablet} {
    padding: 1rem 0 0 2.5rem;
    font-size: 1rem;
    line-height: 1.625rem;
  }
  @media ${device.laptop} {
    font-size: 1rem;
    line-height: 1.625rem;
  }
`

export const ListItem = styled.li`
  padding: 0.25rem;
`

export interface OrderedListProps {
  list: string[]
  topPadding: boolean
}

export const OrderedList: React.FC<OrderedListProps> = ({
  list,
  topPadding,
}) => {
  return (
    <Container topPadding={topPadding}>
      {list.map((item) => {
        return <ListItem key={item}>{item}</ListItem>
      })}
    </Container>
  )
}
