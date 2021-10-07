import styled from 'styled-components'

export const baseClass = 'kernls-champion-onboarding-step-three-review-form'

export const SuccessContainer = styled.div`
  text-align: center;
`

export const ActionsContainer = styled.div`
  margin-top: 2rem;
  p,
  button {
    font-size: 0.875rem;
    line-height: 1.313rem;
  }
`

export const ActionItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  p {
    margin-bottom: 0;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  > * {
    flex-basis: 0;
  }
  > *:first-child {
    flex-grow: 2;
  }

  > *:last-child {
    flex-grow: 1;
  }
`

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;

  fieldset .kernls-form-group label,
  fieldset .kernls-form-group h3 {
    font-size: 0.875rem;
    line-height: 1.313rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
    display: block;
  }
`
export const Wrapper = styled.div``
