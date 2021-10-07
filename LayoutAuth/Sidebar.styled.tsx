import styled from 'styled-components'

export const baseClass = 'kernls-sidebar'

export const Wrapper = styled.nav`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  width: 235px;
  min-height: 100vh;
  background-color: white;
  position: fixed;
  left: 0;
  top: 0;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  padding: 0.5rem;
  padding-top: calc(56px + 0.5rem);
`
