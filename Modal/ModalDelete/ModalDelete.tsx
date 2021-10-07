import React from 'react'

import * as sc from './ModalDelete.styled'
import { IModalProps, Modal } from '../Modal'

import { Paragraph } from '@/components/Paragraph'
import { CancelButton, DeleteButton } from '@/components/Form/SubmitButton'

export interface IModalDeleteProps extends IModalProps {
  title?: string
  onClickCancel: () => void
  onClickDelete: () => void
}

export const ModalDelete: React.FC<IModalDeleteProps> = ({
  classNames,
  title,
  onClickCancel,
  onClickDelete,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')

  return (
    <Modal classNames={className} title={title} {...restProps}>
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
