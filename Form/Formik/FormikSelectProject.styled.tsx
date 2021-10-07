import { HTMLAttributes } from 'react'
import styled from 'styled-components'

export const formikSelectBaseClass = 'kernls-formik-select-project'
export const customOptionBaseClass = `${formikSelectBaseClass}-custom-option`

export interface SelectProps {
  showError: boolean
}

export interface WrapperProps {
  showError: boolean
}

export const CustomOption = styled.div<
  HTMLAttributes<HTMLDivElement> & {
    isDisabled?: boolean
    isFocused?: boolean
    isSelected?: boolean
  }
>`
  padding: 0.5rem 1rem;
  &:hover {
    background-color: #e5e5e5;
  }
  .${customOptionBaseClass} {
    &__disease {
      margin-bottom: 0.5rem;
    }
    &__label {
      font-size: 0.875rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      color: #000;
    }
    &__ri {
      font-size: 0.875rem;
      color: #565656;
    }
  }
  ${({ isDisabled, isSelected }) => {
    if (isDisabled) {
      return `
        background-color: #E5E5E5;
      `
    }
    if (isSelected) {
      return `
        background-color: rgba(130,86,255, 0.5);
      `
    }
    return ''
  }}
`

export const Wrapper = styled.div<WrapperProps>`
  .kernls-formik-select__control {
    background-color: #fff;
    border: ${({ showError }) =>
      showError ? '1px solid #C80048' : '1px solid #c4c4c4'};
    border-radius: 5px;
    font-size: 1rem;
    color: #000;
    height: 52px;
    width: 100%;
    &:focus {
      outline: 0;
      border-color: #8256ff;
    }
    &:disabled {
      color: #c4c4c4;
    }
    .react-dropdown-select-content {
      padding: 0 1rem;
    }
  }
`
