import styled, { css } from 'styled-components'
import { ContentContainer, ContentFullContainer } from '@/common/styled'
import { device } from '@/utils/device'
import { HTMLAttributes } from 'react'

export const StickyContainer = styled.div`
  position: sticky;
  top: 78px;
  height: auto;
  flex-direction: column;
`

export const FixedButtonContainer = styled.div`
  z-index: 2;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  outline: #e5e5e5;
  padding: 0.5rem;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
`

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  @media ${device.laptop} {
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;

    > *:first-child {
      flex: 0 1 60%;
    }

    > *:last-child {
      flex: 0 1 38%;
    }
  }
  @media ${device.laptopL} {
    > *:last-child {
      flex: 0 1 37%;
    }
  }
`

export const TabChampionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column-reverse;

  > * {
    margin-bottom: 1rem;
  }

  @media ${device.laptop} {
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
    min-height: 400px;

    > *:first-child {
      flex: 0 1 60%;
    }

    > *:last-child {
      flex: 0 1 38%;
      height: auto;
      max-height: none;
      min-height: 0vh;
    }
  }
  @media ${device.laptopL} {
    > *:last-child {
      flex: 0 1 37%;
    }
  }
`

export const StickyBarContainer = styled(ContentFullContainer)`
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #dadada;
  border-top: 1px solid #dadada;
  display: flex;
  height: 40px;
  margin-top: 1rem;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
  overflow: hidden;
  @media ${device.laptop} {
    height: 80px;
  }
`

export const StickyBar = styled(ContentContainer)`
  height: 100%;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  justify-content: center;

  > *:first-child {
  }

  > *:last-child {
    display: none;
  }
  @media ${device.laptop} {
    flex-direction: row;
    justify-content: space-between;

    > *:first-child {
      flex: 0 1 60%;
    }

    > *:last-child {
      display: flex;
      flex: 0 1 38%;
      padding-right: 0.75rem;
      padding-left: 0.75rem;
    }
  }
  @media ${device.laptopL} {
    > *:last-child {
      flex: 0 1 37%;
    }
  }
`

export const Tabs = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${device.mobileM} {
    justify-content: space-between;
  }
  @media ${device.laptop} {
    justify-content: flex-start;
  }
`

export const TabButton = styled.a<
  HTMLAttributes<HTMLAnchorElement> & { currentTab: boolean }
>`
  outline: 0;
  background: transparent;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  ${(props) =>
    props.currentTab &&
    css`
      color: #8256ff;
      padding: 0 0.25rem 0.25rem 0.25rem;
      border-bottom: 4px solid #8256ff;
      @media ${device.tablet} {
        padding: 0 0.6rem;
      }
      @media ${device.laptop} {
        padding: 0 1rem;
      }
    `}
  font-weight: 400;
  font-family: inherit;
  font-size: 0.65rem;
  @media ${device.mobileM} {
    padding: 0 0.5rem;
  }

  @media ${device.tablet} {
    font-size: 0.875rem;
  }

  @media ${device.laptop} {
    font-size: 1.125rem;
    padding: 0 0.8rem;
  }

  @media ${device.laptopL} {
    padding: 0 1rem;
  }
`

export const Wrapper = styled.div`
  padding-top: 2rem;
  background-color: #f8f8f8;
`
