import styled from 'styled-components'

import { TooltipIcon } from '@/common/styled'
import { device } from '@/utils/device'

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;

  color: #565656;
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.0625;

  @media ${device.tablet} {
    font-size: 0.875rem;
    line-height: 1.22rem;
  }

  p {
    margin: 0;
  }
`

export const GoalDetailContainer = styled.div`
  align-items: center;
  display: flex;
  > *:not(:last-child) {
    margin-right: 0.3rem;
  }
`

export const TextIconContainer = styled.div`
  align-items: center;
  display: flex;
  > *:not(:last-child) {
    margin-right: 0.3rem;
  }
`

export const GoalReachedInfoText = styled.span`
  color: #0099a3;
`

export const StyledIcon = styled(TooltipIcon)`
  @media ${device.laptop} {
    width: 1rem;
    height: 1rem;
  }
`
