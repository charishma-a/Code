import styled from 'styled-components'

export const baseClass = 'kernls-dropdown'

export const Wrapper = styled.div`
  position: relative;

  &.${baseClass}--transparent {
    .${baseClass}__button {
      align-items: center;
      background-color: transparent;
      border: 1px solid transparent;
      .${baseClass}__button__arrow {
        border-left: 0;
        padding-left: 0;
      }
    }
  }
`

export const ActivatorButton = styled.button`
  align-items: center;
  background-color: inherit;
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  color: #565656;
  display: flex;
  font-size: 1rem;
  justify-content: center;
  height: 48px;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    color: #c4c4c4;
    svg {
      color: #c4c4c4;
      path {
        fill: #c4c4c4;
      }
    }
  }
  .${baseClass}__button {
    &__text {
      padding: 0 1rem;
    }
    &__arrow {
      align-items: center;
      display: flex;
      justify-content: center;
      border-left: 1px solid #c4c4c4;
      height: 100%;
      padding: 0 1rem;
    }
  }
`

export const DropdownList = styled.ul<{ active: boolean }>`
  background-color: white;
  display: ${(props) => (props.active ? 'block' : 'none')};
  margin: 0;
  padding: 0;
  position: absolute;
  box-shadow: 0px 4px 20px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  align-items: left;
  padding: 0.5rem;
  width: 100%;

  li {
    list-style: none;
    margin: 0;
  }
`
