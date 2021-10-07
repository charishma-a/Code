import React, { useEffect, useState } from 'react'
import { PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'

import * as sc from './PlaidLinkButton.styled'

/* generated */
import { useCreatePlaidLinkTokenMutation } from '@/generated/graphql'

export const plaidLinkButtonBaseClass = 'kernls-plaid-link-button'

interface PlaidLinkButtonProps {
  accessCode: string
  className?: string
  linkBankAccountError?: string
  linkBankAccountProccessing?: boolean
  onClick?: () => void
  options: Omit<PlaidLinkOptions, 'token'>
  profileId: string
  setLinkBankAccountProcessing: (proccessing: boolean) => void
}

export const PlaidLinkButton: React.FC<PlaidLinkButtonProps> = ({
  accessCode,
  className,
  linkBankAccountError,
  linkBankAccountProccessing,
  onClick,
  options,
  profileId,
  setLinkBankAccountProcessing,
  ...restProps
}) => {
  const [linkToken, setLinkToken] = useState('')
  const classNames = [plaidLinkButtonBaseClass, className].join(' ')

  const [createPlaidLinkToken] = useCreatePlaidLinkTokenMutation({
    variables: {
      input: {
        code: accessCode,
        profileId,
      },
    },
  })

  useEffect(() => {
    async function load() {
      const linkTokenResponse = await createPlaidLinkToken()
      const data = linkTokenResponse.data.createPlaidLinkToken
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
