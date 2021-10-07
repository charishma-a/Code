import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

/* utils */
import { device } from '@/utils/device'
import { Paragraph } from '@/components/Paragraph'

const StatsContainer = styled.div<
  HTMLAttributes<HTMLDivElement> & { topPadding?: boolean }
>`
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => (props.topPadding ? '1rem' : 0)};
  @media ${device.tablet} {
    flex-direction: row;
    > *:not(:last-child) {
      margin-right: 1.5rem;
    }
  }
`

const StatContainer = styled.div<
  HTMLAttributes<HTMLDivElement> & {
    v2?: boolean
  }
>`
  flex: 1;
  display: flex;
  flex-direction: column;
  border: none;
  ${({ v2 }) => (v2 ? 'padding: 1rem 0 0 0; color: #565656;' : '')}
  @media ${device.tablet} {
    padding: 1rem 0 0 0;
    ${({ v2 }) =>
      v2 ? 'padding: 1rem; border: 1px solid #E5E5E5;border-radius: 4px;' : ''}
  }
`

const StatsParagraph = styled(Paragraph)`
  padding-top: 1rem;
  @media ${device.laptop} {
    padding-right: 1rem;
  }
`

const StatsTitle = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 2.125rem;
  @media ${device.tablet} {
    font-size: 2rem;
    line-height: 2.625rem;
  }
  @media ${device.laptop} {
    font-size: 2.25rem;
    line-height: 2rem;
  }
`

export interface Stat {
  description: string
  title: string
}

export interface StatsProps {
  v2?: boolean
  stats: Stat[]
  topPadding?: boolean
}

export const Stats: React.FC<StatsProps> = ({ v2, stats, topPadding }) => {
  return (
    <StatsContainer topPadding={topPadding}>
      {stats.map(({ description, title }) => {
        return (
          <StatContainer key={title} v2={v2}>
            <StatsTitle>{title}</StatsTitle>
            <StatsParagraph>{description}</StatsParagraph>
          </StatContainer>
        )
      })}
    </StatsContainer>
  )
}
