import styled from 'styled-components'

export interface WrapperProps {
  showError: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  input {
    padding: 0;
    height: initial;
    width: initial;
    margin-bottom: 0;
    display: none;
    cursor: pointer;
  }

  label {
    position: relative;
    cursor: pointer;
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  label:before {
    content: '';
    -webkit-appearance: none;
    background-color: white;
    border: 1px solid #a3a3a3;
    padding: 8px;
    display: block;
    position: relative;
    cursor: pointer;
    margin-right: 1rem;
    box-sizing: border-box;
    border-radius: 4px;
    height: 22px;
    width: 22px;
    margin-top: 3px;
  }

  input:checked + label:after {
    content: '';
    display: block;
    position: absolute;
    top: 7px;
    left: 9px;
    width: 3px;
    height: 8px;
    border: ${({ showError }) =>
      showError ? '1px solid #C80048' : '1px solid #fff'};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  input:checked + label:before {
    background-color: #8256ff;
    border: ${({ showError }) =>
      showError ? '1px solid #C80048' : '1px solid #8256ff'};
  }
`
