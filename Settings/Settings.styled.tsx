import styled from 'styled-components'
import { device } from '../../utils/device'
import { CardPrimary, CardPrimaryProps } from '@/components/Card'
import { pxToRem } from '@/utils/pxToRem'

export const Box2 = styled.div`
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  margin-top: 2rem;
  padding: 1rem;
  text-align: start;
  width: 587px;
  align-items: center;
`
export const BodyMain = styled.main`
  margin-left: 0px;
`

export const Text = styled.p`
  padding-bottom: 0px;
  margin-top: 0px;
  font-size: 14px;
  color: black;
`

export const Sub = styled.p`
  line-height: 21px;
  font-size: 14px;
  color: #565656;
  padding-bottom: 10px;
  margin-top: 1px;
`

export const AvatarWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
`

export const InputButtonContainer = styled.div`
  position: relative;
  input {
    padding-right: 104px;
  }
  button {
    position: absolute;
    top: 7px;
    right: 7px;
    height: 37px;
    width: 90px;
    border-radius: 0;
  }
  @media ${device.tablet} {
    input {
      padding-right: 134px;
    }
    button {
      width: 120px;
      border-radius: 4px;
    }
  }
`
export const Quote = styled.input`
  width: 500px;
  height: 407px;
`

export const AvatarImageWrapper = styled.div``

export const AvatarImageContainer = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.22);
  border: 1px dashed #c4c4c4;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  width: 500px;
  img {
    height: 140px;
    width: 140px;
  }
`
export const AvatarImageActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;

  button {
    color: #006acb;
  }
`
export const ButtonLink = styled.div`
  margin-top: 10rem;
  color: #006acb;
  margin-left: -3.8rem;
`
export const ButtonWrapper = styled.div`
  width: 500px;
  margin-left: 23rem;
`
export const PurpleText = styled.p`
  margin-left: 23rem;
  color: #8256ff;
  width: 500px;
  padding-bottom: 16px;
`
export const BoxLine = styled.hr`
  width: 500px;
  height: 0px;
  margin-top: 32px;
  border: 1px solid #e5e5e5;
  margin-bottom: 32px;
`
export const Request = styled.button`
  width: 250px;
  background: #f6f6f6;
  border-color: #8256ff;
  border-radius: 4px;
  font-family: Overpass;
  font-style: normal;
  font-weight: 77;
  font-size: 14px;
  color: #8256ff;
  height: 48px;
  border: 1px solid #8256ff;
  padding: 0.5rem;
  margin-top: 0px;
`

export const baseClassFormRow = 'kernls-form-row'
export const FormRow = styled.div.attrs((props) => {
  return {
    className: [baseClassFormRow, props.className].join(' '),
  }
})`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;

  > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  @media ${device.tablet} {
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    width: 100%;

    > * {
      flex: 1 1 0px;
    }

    > *:not(:last-child) {
      margin-right: 0.5rem;
      margin-bottom: 0;
    }
  }
`

export const baseClassFormGroup = 'kernls-form-group'
export const FormGroup = styled.div.attrs((props) => {
  return {
    className: [baseClassFormGroup, props.className].join(' '),
  }
})`
  margin-bottom: 2rem;

  ${FormRow}:last-child {
    margin-bottom: 0;
  }
`

export const AuthPageCard = styled(CardPrimary)<
  CardPrimaryProps & { maxWidth?: string }
>`
  && {
    padding: 2rem;
    width: 100%;
    max-width: ${({ maxWidth }) => maxWidth || '576px'};
    margin: 0 auto;
    background: #f8f8f8;
    border: none;
    border-radius: 0px;
    box-shadow: none;

    margin-top: 0rem;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
    }

    h2,
    .h2 {
      display: block;
      font-size: ${pxToRem({ px: 18 })};
      font-weight: 600;
      line-height: ${pxToRem({ px: 28 })};
      margin-bottom: 1.5rem;
      text-align: center;
    }

    a {
      color: #000;
      text-decoration: underline;
    }

    a.kernls-purple {
      color: #825eff;
      text-decoration: none;
    }

    .${baseClassFormGroup} {
      margin-bottom: 1rem;
    }
    .${baseClassFormRow} {
      margin-bottom: 1rem;
    }
  }
`

export const PurpleText1 = styled.p`
  color: #8256ff;
  width: 500px;
  padding-bottom: 16px;
`
export const Tabs = styled.div`
  background: #fcfcfc;
  border-bottom: 1px solid #e5e5e5;
  width: 100%;
  padding: 1rem;
  justify-content: space-between;
  display: flex;
`
export const LinkData = styled.div`
  margin-left: 20px;
  justify-content: space-between;
  display: inline;
  height: 30px;

  &:hover {
    background-color: none;
    border-bottom: 4px solid #825eff;
    color: #825eff;
    border-radius: 0px;
    max-width: 203px;
    padding-bottom: 15px;
  }
`

export const Profile = styled.div`
  margin-top: -10px;
  font-size: 14px;
  color: black;
  padding-bottom: 16px;
`
