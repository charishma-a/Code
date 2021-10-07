import styled from 'styled-components'
import { ProgressBar } from './ProgressBar'

import { calculatePercentage } from '../../utils/calculations'
import { device } from '../../utils/device'
import { formatAmountForDisplay } from '../../utils/stripe-helpers'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.6rem;
  @media ${device.tablet} {
    font-size: 1.875rem;
    line-height: 2.625rem;
  }
`

const Raised = styled.p<{ hero: boolean }>`
  margin: 0;
  font-weight: 600;
  font-size: ${(props) => (props.hero ? '0.65rem' : '1rem')};
  line-height: 1.375rem;

  @media ${device.tablet} {
    font-size: 1.875rem;
    line-height: 2.625rem;
  }
`
const Goal = styled.p`
  margin: 0;
  color: #565656;
  font-weight: 600;
  font-size: 0.6rem;
  line-height: 1.0625;
  padding-top: 0.4rem;
  letter-spacing: 0;

  @media ${device.mobileM} {
    padding-top: 0.45rem;
  }

  @media ${device.tablet} {
    padding-top: 1.2rem;
    font-size: 0.875rem;
    line-height: 1.22rem;
  }
`

const baseClass = 'kernls-progress-bar-container'

export interface ProgressBarContainerProps {
  goal: number
  moneyRaised: number
  hero?: boolean
}

export const ProgressBarContainer: React.FC<ProgressBarContainerProps> = ({
  goal = 0,
  moneyRaised = 0,
  hero = false,
}) => {
  const getPercentage = () => {
    if (moneyRaised > goal) {
      return 100
    }
    if (moneyRaised < 0) {
      return 0
    }
    return calculatePercentage(moneyRaised, goal)
  }
  return (
    <Container className={baseClass}>
      <InfoContainer>
        <Raised hero={hero}>
          {formatAmountForDisplay({ amount: moneyRaised, round: true })}
        </Raised>
        <Goal>
          {'of ' +
            formatAmountForDisplay({ amount: goal, round: true }) +
            ' goal'}
        </Goal>
      </InfoContainer>
      <ProgressBar value={getPercentage()} />
    </Container>
  )
}
