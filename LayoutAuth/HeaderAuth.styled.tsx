import { device } from '@/utils/device'
import { HTMLAttributes } from 'react'
import styled from 'styled-components'

export const AvatarMobileWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  padding: 1rem;

  .kernls-dropdown {
    width: 100%;
    &__button {
      justify-content: flex-start;
      width: 100%;
      &__arrow {
        margin-left: auto;
      }
    }
  }
`

export const AvatarWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
`

export const HamburgerMenuButton = styled.button`
  border: 0;
  padding: 0;
  margin: 0;
  background: transparent;
  position: relative;
  cursor: pointer;
`
export const MobileMenuItems = styled.div<
  HTMLAttributes<HTMLDivElement> & { open?: boolean }
>`
  display: flex;
  flex-direction: column;
  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
  background-color: #fff;
  padding: 1rem;
  position: absolute;
  z-index: 1;
  height: 100vh;
  width: 100%;

  left: 0;
  right: 0;
  bottom: 0;
  top: 49px;

  button.kernls-menu-item-button-link {
    margin: 0;
    padding: 1rem;
    font-weight: normal;
    cursor: pointer;
  }
  a {
    background-color: #fff;
  }
`

export const MobileMenuItemGroup = styled.div`
  &&:not(:last-child) {
    border-bottom: 1px solid #e5e5e5;
  }
`

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.75rem 0 0.75rem 0;
`

export const Logo = styled.img`
  height: 1.5rem;
  cursor: pointer;

  @media ${device.tablet} {
    height: 2rem;
  }
`

export const Wrapper = styled.nav`
  position: relative;
  border-bottom: 1px solid #e5e5e5;

  .kernls-dropdown {
    button {
      height: auto;
    }
    &__list {
      margin-top: 1.1rem;
      margin-left: -1rem;
    }
  }
`
