import styled from 'styled-components'

/* utils */
import { device } from '../../utils/device'

export const Header = styled.p`
  text-align: center;
  align-self: center;
  color: #565656;
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.425;
  padding: 0 1rem;
  @media ${device.tablet} {
    font-size: 1.25rem;
    line-height: 1.9375rem;
  }
`

export const InputButtonContainer = styled.div`
  position: relative;
  input {
    padding-right: 104px;
  }
  button {
    position: absolute;
    top: 7px;
    right: 7px;
    height: 37px;
    width: 90px;
    border-radius: 0;
  }
  @media ${device.tablet} {
    input {
      padding-right: 134px;
    }
    button {
      width: 120px;
      border-radius: 4px;
    }
  }
`

export const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  padding: 1rem 1rem 2rem 1rem;
  @media ${device.tablet} {
    width: 80%;
  }
`
export const Icon = styled.div`
  display: flex;
  flex-direction: column;
`
export const EmbedLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  border-top: 1px solid #c4c4c4;
  padding: 0.5rem 0;
  text-align: left;
`

export const EmbedLink = styled.p`
  background-color: #f2f2f2;
  color: #565656;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 0.25rem;
  padding: 0.5rem 0 0.2rem 0.5rem;
  font-weight: normal;
  font-size: 0.875rem;

  @media ${device.tablet} {
    font-size: 1rem;
  }
  line-height: 1.5625rem;
`
export const CloseButton = styled.button`
  border: none;
  color: #979797;
  background-color: #fff;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.3125rem;
`
export const Paragraph = styled.p`
  margin: 0;
  color: #979797;
  font-weight: 600;
  font-size: 0.62rem;
  line-height: 1.3125rem;
  @media ${device.tablet} {
    font-size: 0.875rem;
  }
`

export const ShareViaContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 372px;
  width: 100%;
`

export const SuccessMessage = styled.div`
  color: #8256ff;
`

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  form {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    > * {
      margin-bottom: 1rem;
    }
    fieldset {
      width: 100%;
      max-width: 520px;
    }
  }
`
