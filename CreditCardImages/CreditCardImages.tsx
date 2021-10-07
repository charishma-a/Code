import React from 'react'

import * as sc from './CreditCardImages.styled'

import { BaseComponentProps } from '@/common/types'
import {
  IMAGE_PROPS_CC_VISA,
  IMAGE_PROPS_CC_MASTERCARD,
  IMAGE_PROPS_CC_MAESTRO,
  IMAGE_PROPS_CC_AMERICAN_EXPRESS,
  IMAGE_PROPS_CC_JCB,
} from '@/constants/images'

export const CreditCardImages: React.FC<BaseComponentProps> = ({
  classNames,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')
  return (
    <sc.Wrapper className={className} {...restProps}>
      <img
        alt={IMAGE_PROPS_CC_VISA.getAlt()}
        src={IMAGE_PROPS_CC_VISA.getSrc()}
      />
      <img
        alt={IMAGE_PROPS_CC_MASTERCARD.getAlt()}
        src={IMAGE_PROPS_CC_MASTERCARD.getSrc()}
      />
      <img
        alt={IMAGE_PROPS_CC_MAESTRO.getAlt()}
        src={IMAGE_PROPS_CC_MAESTRO.getSrc()}
      />
      <img
        alt={IMAGE_PROPS_CC_AMERICAN_EXPRESS.getAlt()}
        src={IMAGE_PROPS_CC_AMERICAN_EXPRESS.getSrc()}
      />
      <img
        alt={IMAGE_PROPS_CC_JCB.getAlt()}
        src={IMAGE_PROPS_CC_JCB.getSrc()}
      />
    </sc.Wrapper>
  )
}
