import styled from 'styled-components'
import { device, size } from '@/utils/device'

export const Wrapper = styled.div`
  position: relative;
`

export const ActivatorButton = styled.button`
  border: 1px solid white;
  border-radius: 3px;
  background-color: white;
  color: rgb(86, 86, 86);
  display: flex;
  font-size: inherit;
  min-width: 160px;
  padding: 1em;
  height: 0.4em;
  right: 0rem;
  position: absolute;
  top: -2.4rem;

  @media ${device.desktop} {
  }
  @media ${device.laptop} {
  }

  &:after {
    content: '';
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    height: 0.5em;
    margin-left: 1em;
    margin-top: 0.4em;
    width: 0.5em;
    transform: rotate(45deg);
  }
`

export const DropdownList = styled.ul<{ active: boolean }>`
  background-color: white;
  display: ${(props) => (props.active ? 'block' : 'none')};
  margin: 0;
  max-width: 303px;
  padding: 0;
  position: fixed;
  margin: 1rem 0px 0px 77rem;
  height: 98px;
  box-shadow: 0px 4px 20px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  align-items: left;

  li {
    list-style: none;
    margin: 0;
    // margin-left: -1rem;
    width: 203px;

    a,
    a:link {
      display: fix;
      padding: 0.8em;
      margin-left: 1rem;
      color: #565656;
      max-width: 203px;

      &:hover {
        background-color: #f8f8f8;
        border-left: 4px solid #825eff;
        color: #825eff;
        border-radius: 4px;
        max-width: 203px;
        margin-left: 0.6rem;
        display: fix;
        width: 186px;
        margin-top: 5px;
      }
    }
  }
`
