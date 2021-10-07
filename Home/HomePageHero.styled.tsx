import styled from 'styled-components'
import { device } from '@/utils/device'

export const HeroContainer = styled.section`
  align-items: start;
  align-content: start;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  max-width: 100%;
  margin-right: auto;
  margin-left: auto;
  grid-auto-flow: row dense;
  grid-column-gap: 24px;
  grid-row-gap: 24px;

  .kernls-image {
    min-height: 150px;
    height: 150px;
    border-radius: 5px;
  }

  @media ${device.mobileL} {
    .kernls-image {
      min-height: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }

  @media ${device.laptop} {
    grid-template-columns: 2fr 1fr;
    > * {
      height: 16rem;
    }
  }
`
export const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: 1rem;
  }

  @media ${device.tablet} {
    flex-direction: row;

    > *:not(:last-child) {
      margin-bottom: 0;
    }
  }

  @media ${device.laptop} {
    flex-direction: column;

    > *:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`
export const LinkContainer = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 31px;
  border-radius: 5px;
  &:hover {
    background-color: #f6f3ff;
  }
  cursor: pointer;
  background-color: #fff;
  border: 0;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  height: 100%;

  @media ${device.tablet} {
    width: 48%;
  }
  @media ${device.laptop} {
    width: 100%;
  }
`
export const StyledLinkText = styled.p`
  font-weight: 600;
  font-size: 12px;
  margin: 0;

  @media ${device.tablet} {
    font-weight: 600;
    font-size: 16px;
  }
  @media ${device.laptop} {
    font-weight: 600;
    font-size: 20px;
  }
`
export const ArrowContainer = styled.div`
  padding-bottom: 13px;
  height: 10px;
  width: 6px;

  @media ${device.tablet} {
    height: 12px;
    width: 7px;
  }
  @media ${device.laptop} {
    height: 17px;
    width: 10px;
  }
`
