import React from 'react'

import * as sc from './ModalDeleteContacts.styled'
import { IModalProps, Modal } from '../Modal'

import { ForwardArrow as SvgForwardArrow } from '@/generated/svgs'
import { Paragraph } from '@/components/Paragraph'
import { CancelButton, DeleteButton } from '@/components/Form/SubmitButton'

export interface IModalDeleteContactsProps extends IModalProps {
  numberOfContacts: number
  onClickCancel: () => void
  onClickDelete: () => void
}

export const ModalDeleteContacts: React.FC<IModalDeleteContactsProps> = ({
  classNames,
  numberOfContacts,
  onClickCancel,
  onClickDelete,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')

  return (
    <Modal
      classNames={className}
      title={`Are you sure you want to delete ${numberOfContacts} contacts?`}
      {...restProps}
    >
      <sc.Wrapper className={`${sc.baseClass}__wrapper`} {...restProps}>
        <Paragraph>You can’t undo this action once it’s done.</Paragraph>
        <sc.Actions>
          <CancelButton onClick={onClickCancel} type="button">
            Cancel
          </CancelButton>
          <DeleteButton onClick={onClickDelete} type="button">
            Yes, delete
          </DeleteButton>
        </sc.Actions>
      </sc.Wrapper>
    </Modal>
  )
}
