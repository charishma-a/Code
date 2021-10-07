import React, { FunctionComponent, useEffect, useState } from 'react'

import * as sc from './DonorUnsubscribe.styled'

/* common */
import { ContentContainer } from '../../common/styled'

/* components */
import { ErrorMessage } from '../ErrorMessage'

/* generated */
import { useUnsubscribeDonorMutation } from '../../generated/graphql'

export const donorUnsubscribeBaseClass = 'kernls-donor-unsubscribe'

export interface DonorUnsubscribeProps {
  className?: string
  email: string
}

export const DonorUnsubscribe: FunctionComponent<DonorUnsubscribeProps> = (
  props
) => {
  const { className, email } = props
  const classNames = [donorUnsubscribeBaseClass, className].join(' ')
  const [success, setSuccess] = useState(false)
  const [requestError, setRequestError] = useState(null)

  // apollo
  const [unsubscribeDonor, { loading, error }] = useUnsubscribeDonorMutation({
    variables: { input: { email } },
  })

  useEffect(() => {
    async function load() {
      try {
        const result = await unsubscribeDonor()
        if (result && result.data && result.data.unsubscribeDonor) {
          setSuccess(true)
        }
      } catch (e) {
        setRequestError(e)
      }
    }
    load()
  }, [])

  if (loading) {
    return <sc.Wrapper className={classNames}>Loading...</sc.Wrapper>
  }

  if (error) {
    return (
      <sc.Wrapper className={classNames}>
        <ErrorMessage error={error} />
      </sc.Wrapper>
    )
  }

  if (requestError) {
    return (
      <sc.Wrapper className={classNames}>
        <ErrorMessage error={requestError} />
      </sc.Wrapper>
    )
  }

  return (
    <sc.Wrapper className={classNames}>
      {success ? (
        <ContentContainer>
          We are sorry to see you go! You have successfully unsubscribed from
          our mailing list.
        </ContentContainer>
      ) : (
        <ContentContainer>
          Something went wrong. Please contact support at support@kernls.com.
        </ContentContainer>
      )}
    </sc.Wrapper>
  )
}
