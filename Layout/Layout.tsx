import React, { FunctionComponent, ReactNode, useEffect } from 'react'
import Head from 'next/head'

import { Footer } from './Footer'
import { NavBar } from './NavBar'
import { Meta } from '../Meta'

export interface LayoutProps {
  children: ReactNode
  description: string
  footer?: ReactNode
  header?: ReactNode
  image: string
  stickyNavBar?: boolean
  title: string
  twitterImage: string
  url: string
}

export const Layout: FunctionComponent<LayoutProps> = (props) => {
  const {
    children,
    description,
    footer,
    header,
    image,
    stickyNavBar = true,
    title,
    twitterImage,
    url,
  } = props
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Head>
        <Meta
          description={description}
          image={image}
          title={title}
          twitterImage={twitterImage}
          url={url}
        />
      </Head>
      {typeof header !== 'undefined' ? (
        header
      ) : (
        <NavBar sticky={stickyNavBar} />
      )}
      {children}
      {typeof footer !== 'undefined' ? footer : <Footer />}
    </>
  )
}

export default Layout
