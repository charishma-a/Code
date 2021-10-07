import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import * as sc from './Modal.styled'

import { BaseComponentProps } from '@/common/types'
import { useIsBrowser } from '@/hooks/useIsBrowser'
import { Exit as SvgExit } from '@/generated/svgs'
import { ButtonLink } from '@/common/styled'

export interface IModalProps extends BaseComponentProps {
  isActive?: boolean
  maxWidthPx?: string
  onClose: () => void
  title?: string
}

export const Modal: React.FC<IModalProps> = ({
  classNames,
  children,
  isActive,
  maxWidthPx,
  onClose,
  title,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')
  const isBrowser = useIsBrowser()

  // create ref for the Wrapper component
  const modalWrapperRef = useRef(null)

  // check if the user has clicked inside or outside the modal
  const backDropHandler: EventListener = (e) => {
    if (modalWrapperRef?.current === e.target) {
      onClose()
    }
  }

  useEffect(() => {
    // attach event listener to the whole window with our handler
    window.addEventListener('click', backDropHandler)

    // remove the event listener when the modal is closed
    return () => window.removeEventListener('click', backDropHandler)
  }, [])

  const handleCloseClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    onClose()
  }

  const renderModal = () => {
    if (isActive) {
      return (
        <sc.Overlay className={className} ref={modalWrapperRef} {...restProps}>
          <sc.Wrapper
            className={`${sc.baseClass}__wrapper`}
            maxWidthPx={maxWidthPx}
          >
            <sc.Container className={`${sc.baseClass}__container`}>
              <sc.Header className={`${sc.baseClass}__header`}>
                {title ? (
                  <span className={`${sc.baseClass}__header__title`}>
                    {title}
                  </span>
                ) : null}
                <div className={`${sc.baseClass}__header__close`}>
                  <ButtonLink onClick={handleCloseClick} type="button">
                    <SvgExit color="#000" />
                  </ButtonLink>
                </div>
              </sc.Header>
              <sc.Body className={`${sc.baseClass}__body`}>{children}</sc.Body>
            </sc.Container>
          </sc.Wrapper>
        </sc.Overlay>
      )
    }
    return null
  }

  if (isBrowser) {
    return ReactDOM.createPortal(
      renderModal(),
      document.getElementById('modal-root')
    )
  }

  return null
}
