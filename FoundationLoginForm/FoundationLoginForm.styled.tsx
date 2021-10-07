import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const Wrapper = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  h2,
  .h2 {
    display: block;
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  a {
    color: #000;
    text-decoration: underline;
  }
`
