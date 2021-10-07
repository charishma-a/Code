import styled from 'styled-components'

export interface WrapperProps {
  showError: boolean
}

export const Label = styled.label``

export const LabelWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

export const TextareaWrapper = styled.div`
  position: relative;
`

export const Wrapper = styled.div<WrapperProps>`
  position: relative;

  .label {
    width: 100%;
  }

  textarea {
    background-color: #fff;
    border: ${({ showError }) =>
      showError ? '1px solid #C80048' : '1px solid #c4c4c4'};
    border-radius: 5px;
    font-size: 1rem;
    color: #000;
    height: 250px;
    padding: 1rem;
    width: 100%;
    &:focus {
      outline: 0;
      border-color: #8256ff;
    }
    &:hover {
      outline: 0;
      border-color: #000000;
    }
    &:disabled {
      color: #c4c4c4;
    }
  }
`
