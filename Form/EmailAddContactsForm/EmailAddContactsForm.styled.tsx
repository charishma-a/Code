import styled from 'styled-components'
import { pxToRem } from '@/utils/pxToRem'
import { HTMLAttributes } from 'react'

export const baseClass = 'kernls-email-add-contacts-form'

export const Header = styled.div`
  text-align: center;
`

export const ContentContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > *:not(:last-child) {
    margin-right: 1rem;
  }
`

export const ContactsWrapper = styled.div<
  HTMLAttributes<HTMLDivElement> & { isView?: boolean; contactsLength?: number }
>`
  height: 100%;
  width: 100%;
  .header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    color: #828282;
    margin-bottom: 1rem;

    &__main {
      color: #000;
    }
  }
  .body {
    background-color: ${({ isView }) => (isView ? '#FAFAFA' : '#fff')};
    border: 1px solid #e5e5e5;
    height: 395px;
    overflow-y: scroll;
    padding: 1rem;
    width: 100%;

    ${({ contactsLength }) => {
      if (!contactsLength) {
        return `
          align-items: center;
          display: flex;
          justify-content: center;
        `
      }
      return ``
    }}
  }
  .actions {
    margin-top: 1rem;
  }
`

export const ContactItem = styled.div`
  padding: 1rem 0;
  color: #828282;
  &:not(:last-child) {
    border-bottom: 1px solid #e5e5e5;
  }
  .checkbox-content {
    margin-left: 1rem;
    .name {
      color: #565656;
    }
  }
`

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;

  max-height: 645px;
  height: 100%;
  max-width: 905px;
  margin: 0 auto;
  margin-top: 2rem;
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 5px;

  padding: 2rem;

  font-size: ${pxToRem({ px: 14 })};
  line-height: ${pxToRem({ px: 21 })};

  p,
  label {
    font-size: ${pxToRem({ px: 14 })};
    line-height: ${pxToRem({ px: 21 })};
  }
  a {
    margin: 0;
    padding: 0;
    color: #006acb;
    font-weight: 600;
  }

  fieldset .kernls-form-group {
    .kernls-form-row {
      .kernls-formik-checkbox {
        label:not(.kernls-formik-checkbox__label) {
          margin-bottom: 0.5rem;
          display: block;
        }
        label.kernls-formik-checkbox__label:before {
          height: 18px;
          width: 18px;
          margin-top: 0.5rem;
          margin-left: 1rem;
          margin-right: 0;
        }
        input:checked + label.kernls-formik-checkbox__label:after {
          top: calc(0.5rem + 3px);
          left: calc(1rem + 7px);
        }
      }
    }
  }

  h3,
  .h3 {
    color: #000000;
    font-weight: normal;
    font-size: ${pxToRem({ px: 18 })};
    line-height: ${pxToRem({ px: 28 })};
  }

  h2,
  .h2 {
    font-size: ${pxToRem({ px: 18 })};
    line-height: ${pxToRem({ px: 28 })};
    color: #000;
    margin: 0;
    margin-bottom: 2rem;
  }
`

export const Wrapper = styled.div`
  width: 100%;
`
