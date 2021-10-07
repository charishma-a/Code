import styled from 'styled-components'
import { ButtonLink } from '@/common/styled'
import { pxToRem } from '@/utils/pxToRem'
import { SecondaryButton } from '../Form/SubmitButton'
import { device } from '@/utils/device'
import { HTMLAttributes } from 'react'

export const baseClass = 'kernls-dashboard-campaign-report'

export const RefreshButton = styled(ButtonLink)`
  && {
    color: #006acb;
    margin-bottom: 1rem;
    padding: 0;
  }
`

export const DonationsEmpty = styled.div`
  padding: 0;
  @media ${device.tablet} {
    padding: 0 5rem;
  }
`

export const Donations = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  text-align: left;
  > div {
    padding: 0.5rem;
  }
  > div:nth-child(2) {
    display: none;
  }
  @media ${device.tablet} {
    > div:nth-child(2) {
      display: block;
    }
    grid-template-columns: 1.5fr 2fr 1fr;
  }
`

export const DonationsWrapper = styled.div`
  margin: 1rem 0;
  text-align: center;
  p {
    margin: 0;
  }
  p.title {
    color: #000000;
    margin-bottom: 0;
  }
  @media ${device.tablet} {
    margin: 1rem;
    p.title {
      margin-bottom: 1rem;
    }
  }
`

export const DonationsGetStartedButton = styled(SecondaryButton)`
  width: auto;
  margin-top: 1rem;
  padding: 1rem 1.5rem;
`

export const CampaignDateRangeWrapper = styled.div`
  margin: 0;
  text-align: center;
  p {
    margin: 0;
  }
  @media ${device.tablet} {
    margin: 2rem;
  }
`

export const CampaignInfoWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 1rem auto;
  width: 100%;
  > *:first-child {
    margin-bottom: 1rem;
  }
  @media ${device.tablet} {
    flex-direction: row;
    width: 70%;
    > *:first-child {
      margin-bottom: 0;
    }
  }
`
export const CampaignInfoItem = styled.div`
  p {
    text-align: center;
    margin: 0;
  }
  p:first-child {
    color: #565656;
    margin-bottom: 1rem;
  }
  p:last-child {
    font-size: ${pxToRem({ px: 22 })};
    color: #1c1c1c;
  }
`

export const ProgressBarWrapper = styled.div`
  margin: 0;
  width: 100%;

  div:first-child {
    padding-bottom: 0;
    p:first-child {
      color: #1c1c1c;
      font-size: 1rem;
      font-weight: 600;
    }
    p:last-child {
      color: #565656;
      font-size: 1rem;
      font-weight: normal;
    }
  }
  div[role='progressbar'] {
    height: 13px;
  }

  @media ${device.tablet} {
    margin: 2rem auto;
    width: 70%;
    div:first-child {
      p:first-child {
        font-size: ${pxToRem({ px: 22 })};
      }
    }
  }
`

export const Content = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 1rem;
`
export const Line = styled.hr<
  HTMLAttributes<HTMLHRElement> & { isHiddenOnMobile?: boolean }
>`
  width: 100%;
  height: 0px;
  ${({ isHiddenOnMobile }) => (isHiddenOnMobile ? 'border: 0;' : '')}

  @media ${device.tablet} {
    border: 1px solid #e5e5e5;
  }
`

export const Wrapper = styled.section``
