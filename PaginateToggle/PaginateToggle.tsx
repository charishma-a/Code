import React from 'react'

import * as sc from './PaginateToggle.styled'

export const paginateToggleBaseClass = 'paginate-toggle'

export interface PaginateToggleProps {
  className?: string
  disableNext?: boolean
  disablePrevious?: boolean
  onClickNext: () => void
  onClickPrevious: () => void
}

export const PaginateToggle: React.FC<PaginateToggleProps> = (props) => {
  const {
    className,
    disableNext = false,
    disablePrevious = false,
    onClickNext,
    onClickPrevious,
  } = props

  const classNames = [paginateToggleBaseClass, className].join(' ')

  return (
    <sc.Wrapper className={classNames}>
      <sc.ClearButton disabled={disablePrevious} onClick={onClickPrevious}>
        &lt;
      </sc.ClearButton>
      <sc.ClearButton disabled={disableNext} onClick={onClickNext}>
        &gt;
      </sc.ClearButton>
    </sc.Wrapper>
  )
}
