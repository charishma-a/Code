import React, { useEffect, useState } from 'react'
import { PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'

import * as sc from './PlaidLink.styled'

/* generated */
import { useCreatePlaidLinkTokenMutation } from '@/generated/graphql'

export const plaidLinkBaseClass = 'kernls-plaid-link'

interface PlaidLinkProps {
  accessCode: string
  className?: string
  linkBankAccountError?: string
  options: Omit<PlaidLinkOptions, 'token'>
  profileId: string
  setLinkBankAccountProcessing: (proccessing: boolean) => void
}

export const PlaidLink: React.FC<PlaidLinkProps> = ({
  accessCode,
  className,
  linkBankAccountError,
  options,
  profileId,
  setLinkBankAccountProcessing,
  ...restProps
}) => {
  const [linkToken, setLinkToken] = useState('')
  const classNames = [plaidLinkBaseClass, className].join(' ')

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
  }

  return (
    <>
      <sc.Link className={classNames} onClick={onClickOpen} {...restProps} />
      {linkBankAccountError || error ? (
        <p>{linkBankAccountError || error.message}</p>
      ) : null}
    </>
  )
}
