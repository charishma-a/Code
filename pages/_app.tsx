import { ApolloProvider } from '@apollo/client'
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'

import { GlobalStyle } from '../styles/Global.styled'

import { DEFAULT_THEME } from '../constants'
import { useApollo } from '../lib/apolloClient'

import { init, page } from '../utils/analytics'
import { mergeQueryParams, QueryParams } from '@/store/queryParams'
import { isServer } from '@/utils/isServer'

import 'react-toastify/dist/ReactToastify.css'

// customize default MUI light theme
const appTheme = createTheme(DEFAULT_THEME)

export const App = ({ Component, pageProps }: AppProps): React.ReactNode => {
  const client = useApollo(pageProps.initialApolloState)
  const router = useRouter()
  const { events, query } = router

  const queryParams = Object.keys(query).reduce((acc, key) => {
    const paramValue = Array.isArray(query[key]) ? query[key][0] : query[key]
    return {
      ...acc,
      [key]: paramValue,
    }
  }, {} as QueryParams)
  const { referredId } = query

  useEffect(() => {
    if (referredId && !isServer()) {
      mergeQueryParams(queryParams)
    }
  }, [referredId])

  useEffect(() => {
    init()
    page({})
  }, [])

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      page({ url })
    }
    events.on('routeChangeComplete', handleRouteChange)
    return () => {
      events.off('routeChangeComplete', handleRouteChange)
    }
  }, [events])

  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={appTheme}>
        <ThemeProvider theme={appTheme}>
          <GlobalStyle />
          <ToastContainer />
          <Component {...pageProps} />
        </ThemeProvider>
      </MuiThemeProvider>
    </ApolloProvider>
  )
}

export default App
