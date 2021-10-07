import React, { useEffect, useState } from 'react'

import { GoalDetail } from './GoalDetail'
import { ProgressBarContainer } from '../ProgressBar'
import { trackCategory } from '@/utils/analytics'

interface FundingGoalProgressProps {
  goalType: 'fixed' | 'flexible'
  goalTypeTooltipBody: string
  goalTypeTooltipTitle: string
  goals: number[]
  moneyRaised: number
  projectSlug: string
}

export const FundingGoalProgress: React.FC<FundingGoalProgressProps> = (
  props
) => {
  const {
    goals,
    goalType,
    goalTypeTooltipBody,
    goalTypeTooltipTitle,
    moneyRaised,
    projectSlug,
  } = props
  const defaultGoal =
    goals.find((goal) => moneyRaised <= goal) || goals[goals.length - 1]
  const [goal, setGoal] = useState(defaultGoal)

  // initially goal and default goal is set to 1
  useEffect(() => {
    setGoal(defaultGoal)
  }, [defaultGoal])

  // find goal number (index + 1)
  let goalNumber = 1
  goals.forEach((_goal, index) => {
    if (_goal === goal) {
      goalNumber = index + 1
    }
  })

  // find goal status
  const goalReached = moneyRaised >= goal

  const disableNextGoal = moneyRaised <= goal || goalNumber >= goals.length
  const disablePreviousGoal = goalNumber === 1

  const progressBarMoneyRaised = moneyRaised > goal ? goal : moneyRaised

  const onClickNext = () => {
    trackCategory({
      eventProps: {
        eventAction: 'Goal Next Click',
        eventCategory: 'Project Goals',
        clickID: 'project-goals-click-next',
      },
      extra: {
        projectSlug,
        goal,
        goalNumber,
        goalReached,
        goalType,
        moneyRaised: progressBarMoneyRaised,
      },
    })
    const nextIndex = goalNumber // index
    const nextGoal = goals[nextIndex]
    if (nextGoal) {
      setGoal(nextGoal)
    }
  }
  const onClickPrevious = () => {
    trackCategory({
      eventProps: {
        eventAction: 'Goal Previous Click',
        eventCategory: 'Project Goals',
        clickID: 'project-goals-click-previous',
      },
      extra: {
        projectSlug,
        goal,
        goalNumber,
        goalReached,
        goalType,
        moneyRaised: progressBarMoneyRaised,
      },
    })
    const previousIndex = goalNumber - 2 // index
    const previousGoal = goals[previousIndex]
    if (previousGoal) {
      setGoal(previousGoal)
    }
  }

  return (
    <>
      <ProgressBarContainer moneyRaised={progressBarMoneyRaised} goal={goal} />

      <GoalDetail
        disableNextGoal={disableNextGoal}
        disablePreviousGoal={disablePreviousGoal}
        goalNumber={goalNumber}
        goalReached={goalReached}
        goalType={goalType}
        goalTypeTooltipTitle={goalTypeTooltipTitle}
        goalTypeTooltipBody={goalTypeTooltipBody}
        goalsLength={goals.length}
        onClickNext={onClickNext}
        onClickPrevious={onClickPrevious}
      />
    </>
  )
}
