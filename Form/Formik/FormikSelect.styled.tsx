import styled from 'styled-components'

export interface SelectProps {
  showError: boolean
}

export interface WrapperProps {
  showError: boolean
}

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
