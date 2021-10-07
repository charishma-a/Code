import { device } from '@/utils/device'
import { HTMLAttributes } from 'react'
import styled from 'styled-components'

export const baseClass = 'kernls-breadcrumb'

export const MobileBackSpan = styled.span`
  display: inline-block;
  position: absolute;
  left: 1rem;
  @media ${device.tablet} {
    display: none;
  }
`

export const MobileBackLink = styled.a`
  display: inline-block;
  position: absolute;
  left: 1rem;
  @media ${device.tablet} {
    display: none;
  }
`

export const BreadcrumbItem = styled.li<
  HTMLAttributes<HTMLLinkElement> & { isActive?: boolean }
>`
  &&,
  a,
  span {
    color: ${({ isActive }) => (isActive ? '#000' : '#828282')};
  }

  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;

  svg {
    margin-left: 0.5rem;
    width: 10px;
    height: 16px;
  }

  .kernls-next {
    display: none;
  }

  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};

  @media ${device.tablet} {
    display: flex;
    justify-content: center;
    width: auto;
    svg {
      width: 5px;
      height: 9px;
    }

    .kernls-next {
      display: block;
    }
  }
`

export const Wrapper = styled.ul`
  align-items: center;
  list-style: none;
  display: flex;
  justify-content: center;
  padding-left: 0;
  margin: 0;
  width: 100%;
  li:not(:last-child) {
    margin-right: 0.5rem;
  }

  font-size: 0.825rem;
`
