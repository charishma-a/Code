import React from 'react'
import { useRouter } from 'next/router'

import * as sc from './ModalAddContacts.styled'
import { IModalProps, Modal } from '../Modal'
import { trackCategory } from '@/utils/analytics'
import { ForwardArrow as SvgForwardArrow } from '@/generated/svgs'
import {
  ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_FILE,
  // ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_PASTE,
  ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_SINGLE,
} from '@/constants/config'

export const ModalAddContacts: React.FC<IModalProps> = ({
  classNames,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')
  const router = useRouter()

  const onClickSingleContact = () => {
    trackCategory({
      eventProps: {
        eventAction: 'Add Single Contact',
        eventCategory: 'Add Contacts',
        clickID: 'contacts-add-single-option',
      },
    })

    router.push(ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_SINGLE)
  }

  // const onClickPasteContact = () => {
  //   router.push(ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_PASTE)
  // }

  const onClickFileContact = () => {
    trackCategory({
      eventProps: {
        eventAction: 'Add Contacts Upload File',
        eventCategory: 'Add Contacts',
        clickID: 'contacts-add-file-upload-option',
      },
    })

    router.push(ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_FILE)
  }

  const buttons: {
    id: string
    contentMain: string
    contentSub: string
    onClick: () => void
  }[] = [
    {
      id: 'single-contact',
      contentMain: 'Single contact',
      contentSub: 'Manually enter the information',
      onClick: onClickSingleContact,
    },
    // {
    //   id: 'pasge-contact',
    //   contentMain: 'Copy and paste multiple contacts',
    //   contentSub: 'Copy and paste contacts from a spreadsheet',
    //   onClick: onClickPasteContact,
    // },
    {
      id: 'file-contact',
      contentMain: 'Upload multiple contacts by file import',
      contentSub: 'Add contacts from .xls .xlsx .ods, .csv files',
      onClick: onClickFileContact,
    },
  ]
  return (
    <Modal classNames={className} title="Add contact methods" {...restProps}>
      <sc.Wrapper className={`${sc.baseClass}__wrapper`} {...restProps}>
        {buttons.map(({ id, contentMain, contentSub, onClick }) => {
          return (
            <sc.AddContactsButton
              key={id}
              onClick={onClick}
              className={`${sc.baseClass}__button`}
            >
              <div className={`${sc.baseClass}__button__content`}>
                <p className={`${sc.baseClass}__button__content__main`}>
                  {contentMain}
                </p>
                <p className={`${sc.baseClass}__button__content__sub`}>
                  {contentSub}
                </p>
              </div>
              <div className={`${sc.baseClass}__button__arrow`}>
                <SvgForwardArrow
                  color="rgba(0, 0, 0, 0.54)"
                  height="20"
                  width="12"
                />
              </div>
            </sc.AddContactsButton>
          )
        })}
      </sc.Wrapper>
    </Modal>
  )
}
