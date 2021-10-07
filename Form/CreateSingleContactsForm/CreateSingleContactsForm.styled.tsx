import { pxToRem } from '@/utils/pxToRem'
import styled from 'styled-components'

export const baseClass = 'kernls-create-single-contacts-form'

export const AddDeleteWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;

  button:first-child {
    color: #006acb;
  }
  button:last-child {
    width: auto;
    padding-left: 2rem;
    padding-right: 2rem;
  }
`

export const AddWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;

  button {
    width: auto;
    padding-left: 2rem;
    padding-right: 2rem;
  }
`

export const DeleteWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;

  button {
    color: #006acb;
  }
`

export const ContactFields = styled.div`
  .kernls-form-group:not(:first-child) {
    border-top: 1px solid #e5e5e5;
    padding-top: 2rem;
  }
`

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  max-width: 438px;
  margin: 0 auto;
  margin-top: 2rem;
  width: 100%;
  font-size: ${pxToRem({ px: 14 })};
  line-height: ${pxToRem({ px: 21 })};

  p,
  label,
  button {
    font-size: ${pxToRem({ px: 14 })};
    line-height: ${pxToRem({ px: 21 })};
  }
  a {
    margin: 0;
    padding: 0;
    color: #006acb;
    font-weight: 600;
  }

  h3,
  .h3 {
    color: #000000;
    font-weight: normal;
    font-size: ${pxToRem({ px: 18 })};
    line-height: ${pxToRem({ px: 28 })};
    margin-top: 0;
  }
`

export const Wrapper = styled.div`
  width: 100%;
`
