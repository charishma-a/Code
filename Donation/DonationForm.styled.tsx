import { HTMLProps } from 'react'
import styled from 'styled-components'

import { DonationFormProps } from './DonationForm'

/* common */
import { FormRow, PurpleBox, PurpleBorderBox } from '@/common/styled'

/* utils */
import { device } from '@/utils/device'

export const ApplicationFeeBox = styled(PurpleBorderBox)`
  margin-top: 0;
  text-align: left;

  *:last-child {
    margin-bottom: 0;
  }
`

export const DonationMatchInfo = styled(PurpleBox)`
  font-size: 14px;
  font-weight: 800;
  margin-top: 0.5rem;
  padding: 0.5rem;

  .matchedAmount {
    font-size: 20px;
  }
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

export const TaxReceiptBox = styled(PurpleBorderBox)`
  color: #000;
  margin-top: 0;
  text-align: left;
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

export const Residence = styled.div``

export const RadioOptions = styled.div`
  margin-top: 1rem;

  p:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`

export const BorderedRadioOptions = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  display: inline-flex;
  flex-direction: column;
  padding: 0.5rem 0;

  .kernls-formik-radio.none {
    padding: 0.5rem 1rem;
    .kernls-formik-radio__input-wrapper {
      margin: 0;
    }
  }

  .kernls-formik-radio:not(.none) {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #c4c4c4;
    .kernls-formik-radio__input-wrapper {
      margin: 0;

      [type='radio']:checked + label,
      [type='radio']:not(:checked) + label {
        position: relative;
        padding-left: 0;
        align-items: center;
        display: flex;
      }
      [type='radio']:checked + label:before,
      [type='radio']:not(:checked) + label:before {
        position: relative;
        margin-right: 1rem;
      }
      [type='radio']:checked + label:after,
      [type='radio']:not(:checked) + label:after {
        position: absolute;
        top: 0.6rem;
        left: 4px;
      }
    }
  }
`

export const Footnote = styled.p`
  margin-top: 1rem;
`

export const FormSection = styled.section`
  z-index: 2;
  padding-right: 2rem;
  width: 55%;
`

export const SummaryAside = styled.aside`
  margin-bottom: 2rem;
  @media ${device.tablet} {
    margin-bottom: 0;
  }
`

export const SummaryAsideWrapper = styled.div`
  position: sticky;
  top: 5rem;
  display: flex;
  height: auto;
  max-width: 43%;
  min-width: 43%;
  flex-direction: column;
`

export const TipContainer = styled.div`
  ${FormRow} {
    justify-content: flex-start;
    > * {
      flex: 0.35;
    }
  }
`

export const Container = styled.div`
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  height: auto;
  max-height: none;
  min-height: 0vh;

  .kernls-donation__form-section {
    padding: 0 1rem;
    width: 100%;

    .kernls-donation__form-section__back-link {
      display: none;
    }
  }

  .kernls-donation__summary-aside-wrapper {
    display: none;
  }
  .kernls-donation__summary-aside-mobile {
    display: block;
  }

  @media ${device.tablet} {
    .kernls-donation__form-section {
      width: 55%;

      .kernls-donation__form-section__back-link {
        display: block;
      }
    }
    .kernls-donation__summary-aside-wrapper {
      padding-right: 1rem;
      display: flex;
    }
    .kernls-donation__summary-aside-mobile {
      display: none;
    }
  }
`

export const Wrapper = styled.div<
  Pick<DonationFormProps, 'showReview'> & HTMLProps<HTMLDivElement>
>`
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
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    margin-bottom: 1rem;

    p:first-child {
      margin-top: 0;
    }
  }

  h3,
  .h3 {
    display: block;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
  }

  a {
    color: #565656;
    font-weight: bold;
  }

  .kernls-donation {
    &__form-review {
      display: ${({ showReview }) => (showReview ? 'flex' : 'none')};
    }
    &__form-container {
      display: ${({ showReview }) => (showReview ? 'none' : 'flex')};
    }
  }
`
