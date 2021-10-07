import { MenuItemButtonLink } from '@/common/styled'
import { BaseComponentProps } from '@/common/types'
import { DropdownArrow as SvgDropdownArrow } from '@/generated/svgs'
import * as React from 'react'
import * as sc from './Dropdown.styled'

export interface IDropdownItem {
  id: number
  onClick: () => void
  text: string
}

export interface IDropdownProps extends BaseComponentProps {
  activatorText?: string
  items?: IDropdownItem[]
  disabled?: boolean
}

export const Dropdown: React.FunctionComponent<IDropdownProps> = ({
  activatorText,
  classNames,
  items,
  disabled,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')
  const activatorRef = React.useRef<HTMLButtonElement | null>(null)
  const listRef = React.useRef<HTMLUListElement | null>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(-1)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const keyHandler = (event: React.KeyboardEvent) => {
    if (isOpen) {
      switch (event.key) {
        case 'Escape': {
          setIsOpen(false)
          break
        }
        case 'ArrowDown': {
          const nodeList = listRef.current!.querySelectorAll('button')
          if (activeIndex === items.length - 1) {
            return
          }
          nodeList[activeIndex + 1].focus()
          break
        }
        case 'ArrowUp': {
          const nodeList2 = listRef.current!.querySelectorAll('button')
          if (activeIndex === 0) {
            return
          }
          nodeList2[activeIndex - 1].focus()
          break
        }
      }
    }
  }

  const handleClickOutside = (event: any) => {
    if (
      listRef.current!.contains(event.target) ||
      activatorRef.current!.contains(event.target)
    ) {
      return
    }
    setIsOpen(false)
  }

  React.useEffect(() => {
    if (isOpen) {
      listRef.current!.querySelector('button')!.focus()
      document.addEventListener('mouseup', handleClickOutside)
    } else {
      document.removeEventListener('mouseup', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [isOpen])

  React.useEffect(() => {
    if (!isOpen) {
      setActiveIndex(-1)
    }
  }, [isOpen])

  const focusHandler = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <sc.Wrapper className={className} onKeyUp={keyHandler} {...restProps}>
      <sc.ActivatorButton
        className={`${sc.baseClass}__button`}
        aria-haspopup="true"
        aria-controls="dropdown1"
        type="button"
        disabled={disabled}
        onClick={handleClick}
        ref={activatorRef}
        onFocus={() => setActiveIndex(-1)}
      >
        <span className={`${sc.baseClass}__button__text`}>{activatorText}</span>
        <div className={`${sc.baseClass}__button__arrow`}>
          <SvgDropdownArrow color="#565656" height="14" width="8" />
        </div>
      </sc.ActivatorButton>
      <sc.DropdownList
        className={`${sc.baseClass}__list`}
        id="dropdown1"
        ref={listRef}
        active={isOpen}
        role="list"
      >
        {items.map((item, index) => (
          <li key={item.id}>
            <MenuItemButtonLink
              type="button"
              onClick={item.onClick}
              onFocus={() => focusHandler(index)}
            >
              {item.text}
            </MenuItemButtonLink>
          </li>
        ))}
      </sc.DropdownList>
    </sc.Wrapper>
  )
}
