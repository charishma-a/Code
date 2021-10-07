import styled from 'styled-components'
import React from 'react'

import PropTypes from 'prop-types'
import { BaseComponentProps } from '@/common/types'

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`

export interface IErrorMessageProps extends BaseComponentProps {
  error: any
}

export const ErrorMessage: React.FC<IErrorMessageProps> = ({
  classNames,
  error,
  ...restProps
}) => {
  if (!error || !error.message) return null
  const className = ['kernls-error-message', classNames].join(' ')
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorStyles className={className} key={i} {...restProps}>
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    ))
  }
  return (
    <ErrorStyles className={className} {...restProps}>
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        {error.message.replace('GraphQL error: ', '')}
        <br />
      </p>
    </ErrorStyles>
  )
}

ErrorMessage.defaultProps = {
  error: {},
}

ErrorMessage.propTypes = {
  error: PropTypes.object,
}
