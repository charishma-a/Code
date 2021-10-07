import { HTMLAttributes } from 'react'
import styled from 'styled-components'

export interface WrapperProps {
  showError: boolean
}

export const Label = styled.label``

export const LabelWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  span {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
    display: block;
  }
`

export const InputWrapper = styled.div<
  HTMLAttributes<HTMLDivElement> & { isInitialTypePassword?: boolean }
>`
  position: relative;

  ${({ isInitialTypePassword }) =>
    isInitialTypePassword
      ? 'input.kernls-formik-input { padding-right: 46px; }'
      : ''}
`
export const ShowPasswordButton = styled.button`
  border: 0;
  border-radius: 0;
  background: transparent;
  color: #565656;
  font-size: 1rem;
  line-height: 1.2;
  white-space: nowrap;
  text-decoration: none;
  padding: 0;
  margin: 0.25rem;
  cursor: pointer;
  text-align: center;
  margin: 0;
  align-items: center;
  display: flex;
  justify-content: center;
  position: absolute;
  right: 16px;
  top: 0;
  height: 50px;

  :hover {
    svg path {
      fill: #000000;
    }
  }
`

export const Wrapper = styled.div<WrapperProps>`
  position: relative;
  font-size: 1rem;

  .label {
    width: 100%;
  }

  input {
    background-color: #fff;
    border: ${({ showError }) =>
      showError ? '1px solid #C80048' : '1px solid #c4c4c4'};
    border-radius: 5px;
    font-size: 1rem;
    color: #000;
    height: 52px;
    padding: 0 1rem;
    width: 100%;
    &:focus {
      outline: 0;
      border-color: #8256ff;
    }
    &:hover:not([disabled]) {
      outline: 0;
      border-color: #000000;
    }
    &:disabled {
      background: #f8f8f8;
      color: #c4c4c4;
    }
  }

  input[type='submit'] {
    width: 100%;
    background: linear-gradient(180deg, #ffe600 0%, #ffcb44 134.37%);
    border: 1px solid #ffec3d;
    box-sizing: border-box;
    border-radius: 5px;
    color: #000000;
    border: 0;
    font-size: 1rem;
    font-weight: 400;
    padding: 0.7rem 1.2rem;

    &:disabled {
      background: linear-gradient(
        180deg,
        rgba(255, 230, 0, 0.2) 0%,
        rgba(255, 203, 68, 0.2) 134.37%
      );
      border: 1px solid #ffec3d;
    }
  }
`
