import styled from 'styled-components'
import { pxToRem } from '@/utils/pxToRem'
import { HTMLAttributes } from 'react'

export const baseClass = 'kernls-modal'

export const Container = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 2rem;
  height: 100%;
  width: 100%;
`

export const Header = styled.div`
  align-items: center;
  color: #000000;
  display: flex;
  justify-content: center;
  font-size: ${pxToRem({ px: 18 })};
  line-height: ${pxToRem({ px: 28 })};
  position: relative;
  padding-bottom: 1rem;

  .${baseClass}__header {
    &__close {
      position: absolute;
      right: 0;
      button {
        padding: 0;
        margin: 0;
      }
    }
  }
`
export const Body = styled.div``

export const Wrapper = styled.div<
  HTMLAttributes<HTMLDivElement> & { maxWidthPx?: string }
>`
  max-width: ${({ maxWidthPx }) => maxWidthPx || '555px'};
  width: 100%;
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.23);
  z-index: 1200; /* higher than header sticky */
`
