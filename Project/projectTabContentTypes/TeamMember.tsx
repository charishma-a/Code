import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

/* components */
import { LabeledAvatar } from '@/components/libraries/LabeledAvatar'

/* utils */
import { device } from '@/utils/device'
import { Tooltip, TooltipIcon, TooltipText } from '@/common/styled'
import { SVG_PROPS_LOCATION_GREY } from '@/constants/svgs'
import { IMAGE_PROPS_TOOLTIP_PURPLE } from '@/constants/images'

const Container = styled.div<
  HTMLAttributes<HTMLDivElement> & { topPadding?: boolean }
>`
  padding-top: ${({ topPadding }) => (topPadding ? '1rem' : 0)};
`

const styles = {
  avatar: `
    margin: 0.1rem 0.5rem 0.5rem 0;
    height: 1.8125rem;
    width: 1.8125rem;
    @media ${device.tablet} {
      margin: 0.5rem 0.5rem 0.5rem 0;
      height: 4rem;
      width: 4rem;
    }
  `,
  label: `
    color: #1C1C1C;
    margin: 0.25rem 0;
    font-weight: 600;
    font-size: 0.6rem;
    line-height: 0.8125rem;
    @media ${device.tablet} {
      margin-left: 0.5rem;
      font-size: 1.125rem;
      line-height: 1.75rem;
    }
  `,
  childLabel: `
    color: #1C1C1C;
    margin: 0.25rem 0;
    font-weight: 400;
    font-size: 0.5625rem;
    line-height: 0.2rem;
    @media ${device.tablet} {
      margin: 0.2rem 0.5rem 0 0.5rem;
      font-size: 1em;
      line-height: 1.5rem
    }
  `,
}

const Paragraph = styled.p`
  color: #1c1c1c;
  margin: 0.25rem 0;
  font-weight: 400;
  font-size: 0.5625rem;
  @media ${device.tablet} {
    margin: 0.2rem 0.5rem 0 0.5rem;
    font-size: 1em;
    line-height: 1.5rem;
  }
`

const HIndexContainer = styled.div`
  display: flex;
  align-items: center;

  margin: 0;
  @media ${device.tablet} {
    margin: 0 0.5rem;
  }
`

const HIndex = styled.p`
  color: #1c1c1c;
  margin: 0;
  font-weight: 400;
  font-size: 0.65rem;
  line-height: 0.8125rem;
  @media ${device.tablet} {
    font-size: 1em;
    line-height: 1.5rem;
  }
`

const LocationContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  color: #1c1c1c;
  margin: 0.25rem 0;

  p {
    margin: 0;
  }
  img {
    display: none;
  }
  font-weight: 400;
  font-size: 0.5625rem;
  line-height: 0.2rem;
  @media ${device.tablet} {
    margin: 0.2rem 0.5rem 0 0.5rem;
    font-size: 1em;
    line-height: 1.5rem;
    img {
      display: block;
      margin-right: 0.2rem;
    }
  }
`

export interface TeamMemberProps {
  avatar: string
  company?: string
  hIndex?: number
  hIndexTooltipContent?: string
  location?: string
  role?: string
  title: string
  topPadding: boolean
}

export const TeamMember: React.FC<TeamMemberProps> = ({
  avatar,
  company,
  hIndex,
  hIndexTooltipContent,
  location,
  role,
  title,
  topPadding,
}) => {
  return (
    <Container topPadding={topPadding}>
      <LabeledAvatar
        avatar={avatar}
        label={title}
        avatarStyles={styles.avatar}
        labelStyles={styles.label}
      >
        {role ? <Paragraph>{role}</Paragraph> : null}
        {company ? <Paragraph>{company}</Paragraph> : null}
        {location ? (
          <LocationContainer>
            <img src={SVG_PROPS_LOCATION_GREY.getSrc()} />
            <p>{location}</p>
          </LocationContainer>
        ) : null}
        {hIndex ? (
          <HIndexContainer>
            <HIndex>H-Index</HIndex>&nbsp;
            <Tooltip>
              <TooltipIcon src={IMAGE_PROPS_TOOLTIP_PURPLE.getSrc()} />
              <TooltipText>{hIndexTooltipContent}</TooltipText>
            </Tooltip>
            <HIndex>: {hIndex}</HIndex>
          </HIndexContainer>
        ) : null}
      </LabeledAvatar>
    </Container>
  )
}
