import styled from 'styled-components'

/* utils */
import { device } from '@/utils/device'

export const Container = styled.div`
  padding: 0 1rem;
`

export const StepWrapper = styled.div`
  padding: 0 1rem;
`

export const StepsBreadcumb = styled.p`
  font-size: 0.875rem;
  line-height: 1.225rem;
  margin: 1rem 0;

  @media ${device.tablet} {
    margin-top: 0;
  }
`

export const SummaryWrapper = styled.div`
  display: none;

  @media ${device.tablet} {
    display: block;
  }
`

export const Wrapper = styled.div``
