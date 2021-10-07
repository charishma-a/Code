import styled from 'styled-components'

export const DetailSection = styled.div`
  border: 1px solid #e5e5e5;
  margin-bottom: 1rem;
`

export const DetailSectionItem = styled.div`
  align-items: start;
  align-content: start;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 0.5fr 1fr;
  grid-template-rows: auto;
  max-width: 100%;
  margin-right: auto;
  margin-left: auto;
  grid-auto-flow: row dense;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  padding: 1rem;

  p {
    margin: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e5e5e5;
  }
`
