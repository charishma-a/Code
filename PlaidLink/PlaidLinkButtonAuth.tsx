import React, { useEffect, useState } from 'react'
import { PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'

import * as sc from './PlaidLinkButtonAuth.styled'

/* generated */
import { useCreatePlaidLinkTokenAuthMutation } from '@/generated/graphql'

interface PlaidLinkButtonAuthProps {
  className?: string
  linkBankAccountError?: string
  linkBankAccountProccessing?: boolean
  onClick?: () => void
  options: Omit<PlaidLinkOptions, 'token'>
  setLinkBankAccountProcessing: (proccessing: boolean) => void
}

export const PlaidLinkButtonAuth: React.FC<PlaidLinkButtonAuthProps> = ({
  className,
  linkBankAccountError,
  linkBankAccountProccessing,
  onClick,
  options,
  setLinkBankAccountProcessing,
  ...restProps
}) => {
  const [linkToken, setLinkToken] = useState('')
  const classNames = [sc.baseClass, className].join(' ')

  const [createPlaidLinkTokenAuth] = useCreatePlaidLinkTokenAuthMutation()

  useEffect(() => {
    async function load() {
      const linkTokenResponse = await createPlaidLinkTokenAuth()
      const data = linkTokenResponse.data.createPlaidLinkTokenAuth
      setLinkToken(data.link_token)
    }
    if (!linkToken) {
      load()
    }
  }, [linkToken])

  const config = {
    token: linkToken,
  }

  const { open, ready, error } = usePlaidLink({
    ...config,
    ...options,
  })

  const onClickOpen = () => {
    setLinkBankAccountProcessing(true)
    open()
    if (typeof onClick === 'function') {
      onClick()
    }
  }

  return (
    <>
      <sc.Button
        className={classNames}
        onClick={onClickOpen}
        disabled={!ready && linkBankAccountProccessing}
        {...restProps}
      />
      {linkBankAccountError || error ? (
        <p>{linkBankAccountError || error.message}</p>
      ) : null}
    </>
  )
}
