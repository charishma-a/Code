import styled from 'styled-components'

export const baseClass = 'kernls-size-restrict'

export const Wrapper = styled.div`
  align-items: center;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
  margin-top: 2rem;
  text-align: center;
  p:not(:first-child) {
    margin-top: 1rem;
  }
`
