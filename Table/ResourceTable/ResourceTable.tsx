import React from 'react'

import * as sc from './ResourceTable.styled'

import { TableV2, TableV2Props } from '../TableV2'

export const ResourceTable: React.FC<TableV2Props> = ({
  classNames,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')
  return (
    <sc.Wrapper className={className} {...restProps}>
      <TableV2 {...restProps} />
    </sc.Wrapper>
  )
}
