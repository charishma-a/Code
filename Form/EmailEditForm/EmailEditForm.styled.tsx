import styled from 'styled-components'
import { pxToRem } from '@/utils/pxToRem'

export const baseClass = 'kernls-email-edit-form'

export const TipWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: flex-start;
  margin-top: 0.5rem;

  svg {
    fill: #8256ff;
    width: 12px;
    height: 17px;
    margin-right: 0.5rem;
  }
`

export const ContentContainer = styled.div`
  padding: 0 1.5rem;
  margin: 0 auto;
  width: 100%;
  position: relative;
  max-width: 672px;
`

export const Header = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
`

export const Body = styled.div`
  .kernls-form-group {
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 2rem;

    .kernls-form-row {
      margin-bottom: 0;
      &:not(:first-child) {
        margin-top: 1rem;
      }
    }
  }
`

export const BodySection = styled.div``

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;

  p,
  label {
    font-size: ${pxToRem({ px: 14 })};
    line-height: ${pxToRem({ px: 21 })};
  }

  fieldset .kernls-form-group .kernls-formik-input__char-count {
    font-weight: normal;
  }
  fieldset .kernls-form-group label:not(.kernls-formik-checkbox__label) {
    margin-bottom: 0.5rem;
    display: block;
  }
  fieldset .kernls-form-group label.kernls-formik-checkbox__label:before {
    height: 18px;
    width: 18px;
    margin-right: 0.5rem;
  }
  input:checked + label.kernls-formik-checkbox__label:after {
    top: 5px;
    left: 7px;
  }

  h3,
  .h3 {
    color: #000000;
    font-weight: normal;
    font-size: ${pxToRem({ px: 18 })};
    line-height: ${pxToRem({ px: 28 })};
  }
`

export const Wrapper = styled.div`
  width: 100%;
`
