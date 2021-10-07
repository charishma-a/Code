import { device } from '@/utils/device'
import { HTMLAttributes } from 'react'
import styled from 'styled-components'

export type IButtonProps = HTMLAttributes<HTMLButtonElement> & {
  topMargin?: boolean
}

export const Button = styled.button<IButtonProps>`
  background-color: #8256ff;
  border: 1px solid transparent;
  border-radius: 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  height: 50px;
  width: 100%;
  margin-top: ${({ topMargin }) => (topMargin ? '1rem' : 0)};

  &:disabled {
    background-color: rgba(130, 86, 255, 0.35);
    cursor: not-allowed;
  }
`

export const SecondaryButton = styled(Button).attrs({
  className: 'kernls-secondary-button',
})`
  background-color: #fff;
  border: 1px solid #8256ff;
  color: #8256ff;
`

export const CancelButton = styled(Button)`
  background-color: #fff;
  border: 1px solid #565656;
  color: #565656;
`

export const DeleteButton = styled(Button)`
  background-color: #c80048;
  border: 1px solid #c80048;
  color: #fff;
`

export const ResidenceContinueButton = styled(Button)`
  margin-top: 1rem;
  width: 148px;
`

export const SubmitButton = styled(Button)``

export const CTAButton = styled(Button)`
  background-color: #fff;
  border: 1px solid #8256ff;
  color: #8256ff;
  height: 50px;
`

export const DonateButton = styled(Button)`
  background: linear-gradient(180deg, #ffe600 0%, #ffcb44 134.37%);
  border: 1px solid #ffec3d;
  border-radius: 5px;
  color: #000000;
  margin-top: 0.5rem;
  flex: 0 1 48%;
  height: 40px;

  &:disabled {
    background: linear-gradient(
      180deg,
      rgba(255, 230, 0, 0.2) 0%,
      rgba(255, 203, 68, 0.2) 134.37%
    );
    cursor: not-allowed;
  }
`

export const DonateButtonLink = styled.a`
  align-items: center;
  background: linear-gradient(180deg, #ffe600 0%, #ffcb44 134.37%);
  border: 1px solid #ffec3d;
  border-radius: 5px;
  box-sizing: border-box;
  color: #000000;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  justify-content: center;
  width: 100%;
  margin-top: 0.5rem;
  flex: 0 1 48%;
  height: 40px;

  &:disabled {
    background: linear-gradient(
      180deg,
      rgba(255, 230, 0, 0.2) 0%,
      rgba(255, 203, 68, 0.2) 134.37%
    );
    cursor: not-allowed;
  }

  @media ${device.tablet} {
    font-size: 1.125rem;
    height: 40px;
  }
`

export const ShareButton = styled(DonateButton)`
  background: #ffef5a;
  color: #000000;
`

export const DonationSubmitButton = styled(Button)`
  background: linear-gradient(180deg, #ffe600 0%, #ffcb44 134.37%);
  border: 1px solid #ffec3d;
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
`
