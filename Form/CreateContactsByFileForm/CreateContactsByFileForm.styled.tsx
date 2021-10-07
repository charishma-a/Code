import { pxToRem } from '@/utils/pxToRem'
import styled from 'styled-components'

export const baseClass = 'kernls-create-contacts-by-file-form'

export const UploadLabelWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  label {
    color: #000000;
  }
  p {
    color: #565656;
  }
`

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  max-width: 671px;
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
