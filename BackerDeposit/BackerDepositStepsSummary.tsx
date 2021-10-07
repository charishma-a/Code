import React from 'react'

import * as sc from './BackerDepositStepsSummary.styled'

import { Step } from './types'
import { CardPrimary } from '../Card'

/* common */
import { Circle, H2 } from '@/common/styled'

interface BackerDepositStepsSummaryProps {
  currentStepId?: number
  steps: Step[]
}

export const BackerDepositStepsSummary: React.FC<BackerDepositStepsSummaryProps> =
  ({ currentStepId = 1, steps }) => {
    return (
      <CardPrimary>
        <H2>2 Step Payment Process</H2>
        <sc.Steps>
          {steps.map((step) => {
            const active = currentStepId === step.id
            const isPreviousStep = step.id < currentStepId
            return (
              <sc.Step key={step.id}>
                <sc.StepTitleWrapper>
                  <Circle completed={isPreviousStep}>
                    {isPreviousStep ? (
                      <img src="/assets/images/check-white.png" />
                    ) : null}
                  </Circle>
                  <sc.StepTitle active={active}>{step.title}</sc.StepTitle>
                </sc.StepTitleWrapper>
                <sc.StepDescription>{step.description}</sc.StepDescription>
              </sc.Step>
            )
          })}
        </sc.Steps>
      </CardPrimary>
    )
  }
