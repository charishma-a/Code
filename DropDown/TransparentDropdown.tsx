import React from 'react'

import * as sc from './Dropdown.styled'

import { Dropdown, IDropdownProps } from './Dropdown'

export const TransparentDropdown: React.FunctionComponent<IDropdownProps> = (
  props
) => (
  <Dropdown
    classNames={[props.classNames, `${sc.baseClass}--transparent`].join(' ')}
    {...props}
  />
)
