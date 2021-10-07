import { FC } from 'react'
import styled from 'styled-components'

export const Overview = styled.div`
  position: absolute;
  margin-left: 50%;
`
export const Share: FC = () => {
  return <Overview>Share</Overview>
}

export const Contacts: FC = () => {
  return <div className="overview">Contacts</div>
}

export const Payments: FC = () => {
  return <div className="overview">Payment</div>
}

export const Settings: FC = () => {
  return <div className="overview">Settings</div>
}
