import { PaginateToggle } from '../PaginateToggle'

import { Tooltip, TooltipText } from '@/common/styled'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { IMAGE_PROPS_INFO_PURPLE } from '@/constants/images'

import * as sc from './GoalDetail.styled'

export interface GoalDetail {
  disableNextGoal?: boolean
  disablePreviousGoal?: boolean
  goalNumber?: number
  goalReached?: boolean
  goalType: 'fixed' | 'flexible'
  goalTypeTooltipBody: string
  goalTypeTooltipTitle: string
  goalsLength: number
  onClickNext: () => void
  onClickPrevious: () => void
}

export const GoalDetail: React.FC<GoalDetail> = ({
  disableNextGoal = false,
  disablePreviousGoal = false,
  goalNumber = 1,
  goalReached = false,
  goalType,
  goalTypeTooltipBody,
  goalTypeTooltipTitle,
  goalsLength,
  onClickNext,
  onClickPrevious,
}) => {
  const renderGoalDetail = () => {
    let textIconContainer = (
      <sc.TextIconContainer>
        <span>GOAL {goalNumber}: IN PROGRESS</span>
      </sc.TextIconContainer>
    )

    if (goalReached) {
      textIconContainer = (
        <sc.TextIconContainer>
          <sc.GoalReachedInfoText>
            GOAL {goalNumber}: REACHED
          </sc.GoalReachedInfoText>
          <sc.StyledIcon
            src="/assets/images/goal-reached-success.png"
            alt="goal-reached-successs"
          />
        </sc.TextIconContainer>
      )
    }

    return (
      <sc.GoalDetailContainer>
        {textIconContainer}
        <PaginateToggle
          disablePrevious={disablePreviousGoal}
          disableNext={disableNextGoal}
          onClickNext={onClickNext}
          onClickPrevious={onClickPrevious}
        />
      </sc.GoalDetailContainer>
    )
  }
  return (
    <sc.Wrapper>
      <sc.TextIconContainer>
        <p>{capitalizeFirstLetter(goalType)}</p>
        <Tooltip>
          <sc.StyledIcon
            alt={IMAGE_PROPS_INFO_PURPLE.getAlt()}
            src={IMAGE_PROPS_INFO_PURPLE.getSrc()}
          />
          <TooltipText>
            {goalTypeTooltipTitle}
            <br />
            <br />
            {goalTypeTooltipBody}
          </TooltipText>
        </Tooltip>
      </sc.TextIconContainer>
      {goalsLength > 1 ? renderGoalDetail() : null}
    </sc.Wrapper>
  )
}
