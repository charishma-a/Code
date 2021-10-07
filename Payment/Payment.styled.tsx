import styled from 'styled-components'
import { PurpleBorderBox } from '@/common/styled'
import { device } from '@/utils/device'
import { CardPrimary, CardPrimaryProps } from '@/components/Card'
import { pxToRem } from '@/utils/pxToRem'
import { HTMLAttributes } from 'react'
export const BoxHeading = styled.div`
  padding-left: 20px;
  font-size: 18px;
  line-height: 28px;
  color: #000000;
  padding-top: 3px;
`
export const paymentsub = styled.div`
  font-size: 14px;
  line-height: 21px;
  color: #565656;
  padding-left: 20px;
`

export const Options1 = styled.div`
  margin: 20px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 5px;
  width: 490px;
  height: 81px;
  font-family: Overpass;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  // padding-top: 0px;
  color: #000000;
  left-padding: 18px;
  margin-bottom: 0rem;
  .text {
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .sub {
    line-height: 21px;
    font-size: 14px;
    color: #565656;
    padding-left: 20px;
    padding-top: 0px;
    margin-top: -20px;
    padding-bottom: 0px;
  }
  .arrow {
    margin-left: 28em;
    padding-top: 0px;
    margin-top: -10px;
  }
`

export const Contenthead = styled.div`
  padding-left: 20px;
  font-size: 14px;
  padding-top: 14px;
`
export const ContentData = styled.p`
  padding-left: 20px;
  font-size: 14px;
  padding-top: 0px;
  color: #565656;
  padding-bottom: 0px;
`

//Direct Deposit Styles

export const DDBox = styled.div`
  position: fixed;
  width: 587px;
  height: 200px;
  left: 55%;
  top: 50%;
  background: white;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 5px;
  transform: translate(-50%, -50%);
`
export const DDHeading = styled.div`
  padding-left: 170px;
  padding-top: 20px;
  font-size: 18px;
`
export const DDContent = styled.div`
  padding-left: 36px;
  padding-top: 10px;
  font-size: 14px;
  color: #565656;
  width: 521px;
`

export const BoxLine = styled.hr`
  width: 490px;
  height: 0px;
  margin-top: 25px;
  border: 1px solid #e5e5e5;
  margin-left: 0px;
`

export const TaxReceiptNote = styled(PurpleBorderBox)`
  text-align: left;

  strong {
    font-size: 14px;
  }

  > *:last-child {
    margin-bottom: 0;
  }
  margin-top: 0em;
  padding-bottom: 20px;
  .data {
    color: #00000;
    font-size: 14px;
    font-style: bold;
  }
`

export const feeCheckBox = styled.div`
  background: #f9f8ff;
  border: 1px solid #8256ff;
  box-sizing: border-box;
  border-radius: 4px;
  width: 595px;
  height: 108px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  padding-top: 10px;
  text-align: left;

  strong {
    margin-left: 45px;
    font-size: 14px;
  }

  > *:last-child {
    margin-bottom: 0;
  }

  .data {
    color: #565656;
    font-size: 14px;
    margin-left: 20px;
  }
`
//New styles

export const Wrapper = styled.div``

export const Content = styled.div``

export const PurpleBorderBox1 = styled.div`
  background: #f9f8ff;
  border: 1px solid #8256ff;
  border-radius: 4px;
  margin-top: 1rem;
  margin-bottom: 10px;
  padding: 1rem;
  padding-bottom: 0rem;
  text-align: center;
`
export const Box1 = styled.div`
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  margin-top: 0rem;
  padding: 1rem;
  text-align: start;
`
export const Box2 = styled.div`
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  margin-top: 2rem;
  padding: 1rem;
  text-align: start;
  width: 587px;
`
export const FlexRowBetween = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;

  @media ${device.tablet} {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0;
  }
`
export const GroupedHeader = styled(FlexRowBetween)``

export const CreditCardImages = styled(FlexRowBetween)`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  @media ${device.tablet} {
    justify-content: space-between;
  }

  > img:not(:last-child) {
    margin-right: 0.5rem;
  }
`

export const ProjectsContainer = styled.div`
  align-items: start;
  align-content: start;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  max-width: 100%;
  margin-right: auto;
  margin-left: 10rem;
  grid-auto-flow: row dense;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  > * {
    height: 320px;
  }

  .kernls-image {
    min-height: 100px;
    height: 100px;
  }

  @media ${device.mobileL} {
    .kernls-image {
      min-height: 120px;
      height: 120px;
    }
  }

  @media ${device.tablet} {
    > * {
      height: 500px;
    }

    .kernls-image {
      min-height: 200px;
      height: 200px;
    }
  }

  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr 1fr;
    > * {
      height: 540px;
    }
  }
`
export const DonBox = styled.div`
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  color: #565656;
  margin-top: 2rem;
  padding: 1rem;
  text-align: start;
  width: 320px;
  height: 446px;
  *:last-child {
    margin-bottom: 0;
  }
`

export const Fund = styled.div`
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  color: #565656;
  margin-top: 2rem;

  padding: 1rem;
  text-align: start;
  width: 555px;
  height: 294px;
  *:last-child {
    padding-bottom: rem;
  }
`
export const CardElementWrapper = styled.div`
  .StripeElement {
    background-color: #fff;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
    font-size: 1rem;
    color: #000;
    padding: 1rem 1rem;
    width: 100%;
    &--focus {
      outline: 0;
      border-color: #8256ff;
    }
    &--webkit-autofill {
      background-color: #ffffff !important;
    }
    &--invalid {
      border-color: #c80048;
    }
  }
`
export const Tabs = styled.div`
  background: #fcfcfc;
  border-bottom: 1px solid #e5e5e5;
  width: 100%;
  padding: 1rem;
`
export const LinkData = styled.a`
  padding-left: 32px;
  color: #565656;
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

    margin-top: 2rem;

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
export const ListItem = styled.li`
  font-size: 14px;
`
export const Para = styled.p`
  margin-top: 16px;
  font-size: 14px;
`
