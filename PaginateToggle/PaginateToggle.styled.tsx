import styled from 'styled-components'

export const ClearButton = styled.button`
  display: inline-block;
  border: none;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  text-decoration: none;
  background: transparent;
  color: #1c1c1c;
  font-size: 0.825rem;
  line-height: 1;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;

  ${({ disabled }) => (disabled ? `cursor: auto; color: #DADADA;` : '')}
`

export const Wrapper = styled.div`
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 2px;
  display: flex;
  height: 18px;
  width: 42px;
  > *:not(:last-child) {
    border-right: 1px solid #c4c4c4;
  }
`
