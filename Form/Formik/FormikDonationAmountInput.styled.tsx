import styled from 'styled-components'

export interface WrapperProps {
  showError: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  label {
    align-items: center;
    background-color: #fff;
    border: ${({ showError }) =>
      showError ? '1px solid #C80048' : '1px solid #c4c4c4'};
    border-radius: 5px;
    display: flex;
    height: 52px;
    justify-content: space-between;
    position: relative;
    padding: 0 1.5rem;

    span {
      color: #979797;
    }

    input {
      background-color: transparent;
      border: 0;
      color: #000;
      flex-grow: 1;
      font-size: 24px;
      height: 52px;
      margin: 0;
      padding: 0;
      text-align: center;
      &:focus {
        outline: 0;
      }
    }
  }
`
