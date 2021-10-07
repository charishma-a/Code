import Link from 'next/link'
import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { DonationSubmitButton } from './SubmitButton'

export const Footnote = styled.p`
  margin-top: 1rem;
`

export interface StripePayButtonProps
  extends HTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset'
}

export const StripePayButton: React.FC<StripePayButtonProps> = (props) => {
  return (
    <>
      <DonationSubmitButton {...props} />

      <Footnote>
        Your payment information is securely processed through Stripe. By
        continuing, you agree to Kernls{' '}
        <Link href="/terms-of-use">
          <a target="_blank" rel="noreferrer">
            Terms of Use
          </a>
        </Link>{' '}
        and{' '}
        <Link href="/privacy-policy">
          <a target="_blank" rel="noreferrer">
            Privacy Policy
          </a>
        </Link>
        .
      </Footnote>
    </>
  )
}
