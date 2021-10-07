import React, { MouseEventHandler } from 'react'

import * as sc from './ResourceActions.styled'

import { BaseComponentProps } from '@/common/types'
import { Dropdown, IDropdownItem, IDropdownProps } from '../DropDown/Dropdown'
import { Button, IButtonProps } from '../Form/SubmitButton'

export interface IResourceActionsProps extends BaseComponentProps {
  ctaOnClick?: MouseEventHandler<HTMLButtonElement>
  ctaProps?: IButtonProps
  ctaText?: string
  dropdownItems: IDropdownItem[]
  dropdownProps?: IDropdownProps
  heading: string
  showDropdown?: boolean
}

export const ResourceActions: React.FC<IResourceActionsProps> = ({
  classNames,
  ctaOnClick,
  ctaProps,
  ctaText,
  dropdownItems = [],
  dropdownProps,
  heading,
  showDropdown = true,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')
  return (
    <sc.Wrapper className={className} {...restProps}>
      <div className={`${sc.baseClass}__heading`}>
        <h3>{heading}</h3>
      </div>
      <div className={`${sc.baseClass}__actions`}>
        {showDropdown ? (
          <Dropdown
            classNames={`${sc.baseClass}__actions__dropdown`}
            activatorText="Actions"
            items={dropdownItems}
            {...dropdownProps}
          />
        ) : null}
        {ctaText ? (
          <Button
            className={`${sc.baseClass}__actions__button`}
            type="button"
            role="button"
            onClick={ctaOnClick}
            {...ctaProps}
          >
            {ctaText}
          </Button>
        ) : null}
      </div>
    </sc.Wrapper>
  )
}
