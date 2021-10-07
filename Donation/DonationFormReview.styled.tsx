import styled from 'styled-components'

/* common */
import { BackLink, PurpleBox } from '../../common/styled'

/* components */
import { CardSecondary } from '../Card'

/* utils */
import { device } from '../../utils/device'

export const BackLinkReview = styled(BackLink)`
  padding: 0 1rem 1rem 1rem;

  @media ${device.tablet} {
    padding: 0;
    padding-bottom: 1rem;
  }
`

export const Foundation = styled.div`
  margin-top: 1rem;
`

export const FoundationInfo = styled.div`
  color: #8256ff;
  img {
    display: inline-block;
  }
`

export const Container = styled(CardSecondary)`
  background-color: #fff;
  color: #565656;
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  border-radius: 0;

  p {
    margin: 0;
    margin-bottom: 0.5rem;
  }

  > div:not(:last-child) {
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 1rem;
  }
  > div:not(:first-child) {
    padding-top: 1.5rem;
  }

  @media ${device.tablet} {
    border: 1px solid #e5e5e5;
    flex-direction: row;
    padding: 1.5rem 2rem;
    border-radius: 5px;

    > div:not(:last-child) {
      border-bottom: 0;
      border-right: 1px solid #e5e5e5;

      padding-bottom: 0;
      padding-right: 2rem;
    }
    > div:not(:first-child) {
      padding-left: 2rem;
      padding-top: 0;
    }
  }
`

export const DonationMatchInfo = styled(PurpleBox)`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;

  .matchedAmount {
    font-size: 20px;
  }

  @media ${device.tablet} {
    padding-left: 5rem;
    padding-right: 5rem;
    font-size: 14px;
  }
`

export const DonatingTo = styled.div`
  margin-top: 1rem;
`

export const FoundationHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
  > *:last-child {
    margin-left: 0.5rem;
  }
`

export const InfoContainer = styled.div`
  width: 100%;
  font-size: 1rem;
  @media ${device.tablet} {
    font-size: 14px;
    line-height: 21px;
  }
`

export const InfoIcon = styled.img`
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.3rem;
`

export const LineItem = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

export const Note = styled.div`
  color: #8256ff;
  margin-bottom: 1rem;
  font-size: 14px;
  line-height: 21px;
`

export const Total = styled.div`
  border-top: 1px solid #f2f2f2;
  color: #000000;
  font-weight: bold;
  margin-top: 1rem;
  padding-top: 1rem;
`

export const TransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Wrapper = styled.div`
  color: #565656;
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;

  h2 {
    color: #000000;
  }

  p {
    margin: 0;
    margin-bottom: 0.5rem;
  }
`
