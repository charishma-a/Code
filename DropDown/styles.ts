import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
`

export const ActivatorButton = styled.button`
  align-items: left;
  background-color: inherit;
  border: 1px solid transparent;
  border-radius: 3px;
  border-color: #c4c4c4;
  background-color: white;
  color: #565656;
  display: flex;
  font-size: 14px;
  min-width: 160px;
  width: 163px;
  padding: 0.75em;
  height: 48px;

  &:after {
    content: '';
    border-bottom: 1px solid #c4c4c4;
    border-right: 1px solid #c4c4c4;
    height: 0.5em;
    margin-left: 5.4em;
    margin-top: 0.4em;
    width: 0.5em;
    transform: rotate(45deg);
  }

  &:disabled {
    align-items: left;
    border: 1px solid #c4c4c4;
    border-radius: 3px;
    background-color: white;
    color: #c4c4c4;
  }
`

export const DropdownList = styled.ul<{ active: boolean }>`
  background-color: #ffffff;
  display: ${(props) => (props.active ? 'block' : 'none')};
  margin: 0;
  width: 163px;
  padding: 0;
  position: absolute;
  margin-top: 0.25rem;

  margin-left: 8.7rem;

  height: 103px;
  box-shadow: 0px 4px 20px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  z-index: 1000;
  li {
    list-style: none;
    z-index: 1000;
    &:hover {
      display: block;
    }
    a,
    a:link {
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      z-index: 1000;
      &:hover {
        background-color: #eef7ff;
      }
    }
  }
`
