import { CardPrimary, CardPrimaryProps } from '@/components/Card'
import { pxToRem } from '@/utils/pxToRem'
import { HTMLAttributes } from 'react'
import styled from 'styled-components'

import { device, size } from '../utils/device'

export const EmptyCenterView = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const FormContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const PageBreadcumbsActionItems = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  button {
    width: auto;
    padding: 1rem;

    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
`

export const PageBreadcrumbs = styled.div<
  HTMLAttributes<HTMLDivElement> & { justifyCenter?: boolean }
>`
  align-items: center;
  background: #fcfcfc;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: ${({ justifyCenter }) =>
    justifyCenter ? 'center' : 'space-between'};
  width: 100%;
  padding: 1rem;
`

export const BackLink = styled.a`
  color: #565656;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

export const ButtonLink = styled.button.attrs((p) => {
  return {
    className: 'kernls-button-link',
    ...p,
  }
})`
  border: 0;
  border-radius: 0;
  background: transparent;
  color: #565656;
  font-size: 1rem;
  white-space: nowrap;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  margin-top: 0.25rem;
  margin-left: -4.5rem;
  cursor: pointer;
  text-align: center;
`

export const MenuItemButtonLink = styled(ButtonLink).attrs((p) => ({
  ...p,
  className: 'kernls-menu-item-button-link',
}))<HTMLAttributes<HTMLButtonElement> & { isActive?: boolean }>`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  text-align: left;
  padding-bottom: 1rem;
  padding-top: 1rem;
  margin: 0;
  font-size: 0.825rem;
  color: #565656;
  border-radius: 4px;
  svg {
    margin-right: 1rem;
    color: #565656;
    path {
      fill: #565656;
    }
  }
  &:focus {
    background-color: #f8f8f8;
    border-left: 4px solid #6d44dc;
    color: #6d44dc;
    svg.kernls-svg {
      color: #6d44dc;
      path {
        fill: #6d44dc;
      }
    }
  }
  ${({ isActive }) => {
    if (isActive) {
      return `
        background-color: #f8f8f8;
        border-left: 4px solid #6d44dc;
        color: #6d44dc;
        svg.kernls-svg {
          color: #6d44dc;
          path {
            fill: #6d44dc;
          }
        }
      `
    }
    return ''
  }}
  &:hover {
    background-color: #faf9ff;
  }
`

export const MenuExternalLink = styled.a`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  padding: 1rem;
  margin: 0;
  font-size: 0.825rem;
  color: #565656;
  background-color: #f8f8f8;
  border-radius: 4px;
  margin-top: auto;
  border-radius: 4px;
  &:focus {
    background-color: #f8f8f8;
    border-left: 4px solid #6d44dc;
    color: #6d44dc;
    svg.kernls-svg {
      color: #6d44dc;
      path {
        fill: #6d44dc;
      }
    }
  }
  &:hover {
    background-color: #faf9ff;
  }
`

export const LinkButtonPurple = styled.a<
  HTMLAttributes<HTMLAnchorElement> & { topMargin?: boolean }
>`
  align-items: center;
  background-color: #8256ff;
  border: 1px solid transparent;
  border-radius: 4px;
  box-sizing: border-box;
  color: #ffffff !important;
  text-decoration: none !important;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  height: 50px;
  justify-content: center;
  width: 100%;
  margin-top: ${({ topMargin }) => (topMargin ? '1rem' : 0)};

  &:disabled {
    background-color: rgba(130, 86, 255, 0.35);
    cursor: not-allowed;
  }

  @media ${device.tablet} {
    font-size: 1.125rem;
    height: 50px;
  }
`

export const GoogleLinkButton = styled.a<
  HTMLAttributes<HTMLAnchorElement> & { topMargin?: boolean }
>`
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  box-sizing: border-box;
  color: #565656 !important;
  text-decoration: none !important;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  height: 50px;
  justify-content: center;
  width: 100%;
  margin-top: ${({ topMargin }) => (topMargin ? '1rem' : 0)};

  img {
    margin-right: 1rem;
  }

  @media ${device.tablet} {
    font-size: 1.125rem;
    height: 50px;
  }
`

export const Circle = styled.div<
  HTMLAttributes<HTMLDivElement> & { completed?: boolean }
>`
  align-items: center;
  background: ${({ completed }) => (completed ? '#0099a3' : '#F6F3FF')};
  border-radius: 50%;
  color: #ffffff;
  display: flex;
  height: 17px;
  justify-content: center;
  width: 17px;
`

export const ContentContainer = styled.div<
  HTMLAttributes<HTMLDivElement> & { isFullWidth?: boolean }
>`
  padding: 0 1.5rem;
  margin: 0 auto;
  width: 100%;
  position: relative;

  ${({ isFullWidth }) => {
    if (isFullWidth) {
      return ''
    }

    return `
    @media ${device.tablet} {
      padding: 0 4.5rem;
      max-width: ${size.tablet};
    }
    @media ${device.laptop} {
      padding: 0 4rem;
      max-width: ${size.laptop};
    }
    @media ${device.laptopL} {
      padding: 0 10rem;
      max-width: ${size.laptopL};
    }
    @media ${device.desktop} {
      padding: 0 10rem;
      max-width: ${size.laptopL};
    }
    `
  }}
`

export const ContentFullContainer = styled.div`
  margin: 0 auto;
  width: 100%;
`

export const Block = styled.div`
  margin-bottom: 2rem;
`

export const Fieldset = styled.fieldset`
  border: 0;
  padding: 0;
  width: 100%;

  &[disabled] {
    opacity: 0.5;
  }
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const FlexRowSpaceBetween = styled(FlexRow)`
  justify-content: space-between;
`

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > *:not(:last-child) {
    margin-bottom: 1rem;
    margin-right: 0;
  }

  @media ${device.tablet} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > * {
      flex-basis: 0;
    }

    > *:first-child {
      flex-grow: 1.5;
    }

    > *:last-child {
      flex-grow: 1;
    }

    > *:not(:last-child) {
      margin-bottom: 0;
      margin-right: 1rem;
    }
  }
`
export const FinePrint = styled.p`
  font-size: 14px;
  line-height: 21px;
`

export const baseClassFormRow = 'kernls-form-row'
export const FormRow = styled.div.attrs((props) => {
  return {
    className: [baseClassFormRow, props.className].join(' '),
  }
})`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;

  > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  @media ${device.tablet} {
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    width: 100%;

    > * {
      flex: 1 1 0px;
    }

    > *:not(:last-child) {
      margin-right: 0.5rem;
      margin-bottom: 0;
    }
  }
`

export const baseClassFormGroup = 'kernls-form-group'
export const FormGroup = styled.div.attrs((props) => {
  return {
    className: [baseClassFormGroup, props.className].join(' '),
  }
})`
  margin-bottom: 2rem;

  ${FormRow}:last-child {
    margin-bottom: 0;
  }
`

export const MainContainer = styled.div`
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;

  @media ${device.tablet} {
    padding-left: 0;
    padding-right: 0;
  }
`

export const AuthPageCard = styled(CardPrimary)<
  CardPrimaryProps & { maxWidth?: string }
>`
  && {
    padding: 2rem;
    width: 100%;
    margin: 0 auto;
    margin-top: 2rem;
    max-width: ${({ maxWidth }) => maxWidth || '576px'};

    color: #565656;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
    }

    h2,
    .h2 {
      display: block;
      font-size: ${pxToRem({ px: 18 })};
      font-weight: 600;
      line-height: ${pxToRem({ px: 28 })};
      margin-bottom: 0.5rem;
      text-align: center;
    }

    a {
      color: #000;
      text-decoration: underline;
    }

    .${baseClassFormGroup} {
      margin-bottom: 1rem;
    }
    .${baseClassFormRow} {
      margin-bottom: 1rem;
    }
  }
`

export const LineItem = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Ol = styled.ol`
  padding-left: 1rem;
  li:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`

export const PurpleBox = styled.div`
  background: #720ced;
  border: 1px solid #720ced;
  border-radius: 5px;
  color: #ffffff;
  margin-top: 1rem;
  padding: 1rem;
  text-align: center;
`

export const PurpleBorderBox = styled.div`
  background: #f9f8ff;
  border: 1px solid #8256ff;
  border-radius: 4px;
  margin-top: 1rem;
  padding: 1rem;
  text-align: center;
`

export const PurpleBorderBox2 = styled.div`
  background: #f9f8ff;
  border: 1px solid #8256ff;
  border-radius: 4px;
  padding: 1rem;
  margin-top: 0;
  text-align: left;

  *:last-child {
    margin-bottom: 0;
  }
`

export const StripeCardElementWrapper = styled.div`
  .StripeElement {
    background-color: #fff;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
    font-size: 1rem;
    color: #000;
    padding: 1rem 1rem;
    width: 100%;
    &--focus {
      outline: 0;
      border-color: #8256ff;
    }
    &--webkit-autofill {
      background-color: #ffffff !important;
    }
    &--invalid {
      border-color: #c80048;
    }
  }
`

export const ApplicationFeePurpleBox = styled(PurpleBorderBox)`
  margin-top: 0;
  text-align: left;
  *:last-child {
    margin-bottom: 0;
  }
`

export const ApplicationFeeBox = styled.div`
  margin-top: 0;
  text-align: left;

  *:last-child {
    margin-bottom: 0;
  }
`

type Direction = 'right' | 'left' | 'up' | 'down'

const getDirection = ({ direction }: { direction: Direction }) => {
  if (direction === 'right') {
    return `
      transform: rotate(-45deg);
      margin-right: 6px;
    `
  }
  if (direction === 'left') {
    return `
      transform: rotate(135deg);
      margin-right: 6px;
    `
  }
  if (direction === 'up') {
    return `
      transform: rotate(-135deg);
      margin-right: 6px;
      margin-top: 6px;
    `
  }
  if (direction === 'down') {
    return `
      transform: rotate(45deg);
      margin-right: 6px;
      margin-bottom: 6px;
    `
  }
  return ``
}

const commonArrowStyle = ({ direction }: { direction: Direction }): string => `
  border: solid #565656;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 6px;
  border-radius: 0;
  background: transparent;
  text-decoration: none;
  outline: none;
  ${getDirection({ direction })}
`

export const ArrowButton = styled.button<
  HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean
    direction: Direction
  }
>`
  ${({ direction }) => commonArrowStyle({ direction })}

  border: solid ${({ disabled }) => (disabled ? '#E5E5E5' : '#565656')};
  border-width: 0 2px 2px 0;
  ${({ disabled }) =>
    disabled
      ? ''
      : `
    cursor: pointer;
    :hover {
      border: solid #E5E5E5;
      border-width: 0 2px 2px 0;
    }
  `}
`

export const ArrowSpan = styled.span<
  HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean
    direction: Direction
  }
>`
  ${({ direction }) => commonArrowStyle({ direction })}
`

export const ImpactTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  > *:first-child {
    margin-right: 0.2rem;
  }
`

export const HomepageSectionHeading = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.6rem;
  margin-top: 3rem;
  margin-bottom: 2rem;

  @media ${device.tablet} {
    font-size: 1.33rem;
    line-height: 1.89rem;
  }

  @media ${device.laptop} {
    font-size: 1.78rem;
    line-height: 2.72rem;
  }
`

export const InfoBox = styled.div`
  align-items: center;
  display: flex;
  background: #373737;
  border-radius: 0px 0px 4px 4px;
  color: #ffffff;
  padding: 0.3rem 1rem;
  justify-content: start;

  a {
    color: #ffffff;
    cursor: pointer;
    text-decoration: underline;
  }

  @media ${device.tablet} {
    justify-content: center;
  }
`

export const H1Purple = styled.h1`
  color: #8256ff;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.724rem;
  margin-top: 0;
`

export const H2 = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.724rem;
  margin-top: 0;
`

export const SimpleErrorMessage = styled.p`
  .icon {
    display: inline-block;
    margin-right: 0.3rem;
    height: 14px;
    width: 14px;
  }
  color: #c80048;
`

export const SROnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`

export const Title = styled.h2<
  HTMLAttributes<HTMLHeadingElement> & { topPadding?: boolean }
>`
  margin: 0;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;
  padding-top: ${({ topPadding }) => (topPadding ? '1rem' : 0)};
  @media ${device.tablet} {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
  @media ${device.laptop} {
    padding-top: ${({ topPadding }) => (topPadding ? '3rem' : 0)};
    font-size: 1.5rem;
    line-height: 2.3125rem;
  }
`

export const TopTitle = styled(Title)`
  @media ${device.laptop} {
    padding-top: ${({ topPadding }) => (topPadding ? '1rem' : 0)};
  }
`

export const TooltipText = styled.p`
  display: none;
  width: 12rem;
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 1.25rem;
  @media ${device.tablet} {
    width: 16rem;
    font-size: 0.875rem;
  }
  background-color: #000;
  color: #fff;
  padding: 1rem;
  position: absolute;
  z-index: 1;
`

export const TooltipIcon = styled.img`
  width: 0.75rem;
  height: 0.75rem;
  @media ${device.tablet} {
    width: 1rem;
    height: 1rem;
  }
`

export const Tooltip = styled.div`
  position: relative;
  cursor: pointer;

  :hover {
    ${TooltipText} {
      display: block;
    }
  }
`

export const TooltipLeft = styled(Tooltip)`
  position: relative;
  cursor: pointer;

  :hover {
    ${TooltipText} {
      display: block;
      right: 0;
    }
  }
`

export const TooltipBottomCenter = styled(Tooltip)`
  position: relative;
  cursor: pointer;

  :hover {
    ${TooltipText} {
      display: block;
      right: -6rem;
      @media ${device.tablet} {
        right: -8rem;
      }
    }
  }
`

export const Impact = styled.span`
  min-width: 5rem;
  margin: 0;
  border-radius: 100px;
  text-align: center;
  align-self: center;
  color: #fff;
  background-color: #8256ff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.4rem 0.5rem;
  @media ${device.tablet} {
    font-size: 1rem;
    line-height: 1.0625rem;
  }
  position: relative;
  cursor: pointer;

  :hover {
    ${TooltipText} {
      visibility: visible;
      right: 0;
    }
  }
`

export const ImpactBlack = styled(Impact)`
  background-color: #1c1c1c;
  min-width: 6rem;
`

export const Disease = styled.p<
  HTMLAttributes<HTMLParagraphElement> & { hero?: boolean }
>`
  margin-bottom: 0;
  color: #8256ff;
  font-weight: 800;
  font-size: ${(props) => (props.hero ? '0.55rem' : '0.75rem')};
  line-height: ${(props) => (props.hero ? '1.33rem' : '1.2rem')};
  padding: ${(props) => (props.hero ? '0 0.1rem' : '0.1rem 0.1rem')};

  @media ${device.tablet} {
    width: max-content;
    background-color: #8256ff;
    color: #fff;
    border-radius: 5px;
    padding: 0.15rem 0.5rem;
    font-weight: 800;
    font-size: 0.67rem;
    line-height: 0.93rem;
  }
`
