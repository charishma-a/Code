import styled from 'styled-components'
import { IMAGE_PROPS_PROJECT_REQUEST_CARD_BG } from '@/constants/images'
import { device } from '@/utils/device'

export const BASE_CLASS = 'kernls-project-request-card'

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 1.5rem;

  color: #fff;
  text-align: center;

  p {
    font-size: 0.563rem;
    @media ${device.tablet} {
      font-size: 1.25rem;
    }
  }

  h3 {
    font-weight: 600;
    font-size: 0.75rem;
    @media ${device.tablet} {
      font-size: 1.875rem;
    }
  }

  h3,
  p {
    margin: 0;
  }

  span {
    color: #fff;
    border: 1px solid #ffffff;
    border-radius: 4px;
    display: block;
    width: 100%;
    cursor: pointer;

    font-size: 0.75rem;
    padding: 0.5rem;
    @media ${device.tablet} {
      font-size: 1.25rem;
      padding: 1rem;
    }
  }

  > *:not(:last-child) {
    margin-bottom: 1rem;
    @media ${device.tablet} {
      margin-bottom: 3rem;
    }
  }
`

export const Wrapper = styled.div`
  height: 100%;
  background: #000;

  @media ${device.tablet} {
    background-image: url(${IMAGE_PROPS_PROJECT_REQUEST_CARD_BG.getSrc()});
    background-size: cover;
    background-position: 0px 0px;
  }
`
