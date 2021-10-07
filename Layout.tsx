import React, { FunctionComponent, ReactNode, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'

import { device, size } from '../utils/device'
import { trackCategory } from '@/utils/analytics'
import {
  IMAGE_PROPS_ARROW_BACK_IOS,
  IMAGE_PROPS_LOGO_BETA_4X,
} from '@/constants/images'

const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #fff;
  margin-bottom: 3rem;
  padding: 1rem;
  position: relative;
  width: 100%;
  @media ${device.tablet} {
    background-color: transparent;
    justify-content: flex-start;
    margin: 0 0 1rem 0;
    max-width: ${size.laptop};
    width: 100%;
  }
`
const Main = styled.main`
  max-width: ${size.laptop};
  width: 100%;
  height: 100%;
`
const Footer = styled.footer`
  max-width: ${size.laptop};
  width: 100%;
`

const BackLink = styled.a`
  cursor: pointer;
  width: 30px;
`

const BackLinkWrapper = styled.div`
  position: absolute;
  left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  @media ${device.tablet} {
    display: none;
  }
`

const BackImg = styled.img`
  width: 12px;
`

export interface LayoutProps {
  backLink?: string
  backLinkOnClick?: () => void
  children: ReactNode
  description: string
  image: string
  title: string
  twitterImage: string
  url: string
}

export const Layout: FunctionComponent<LayoutProps> = (props) => {
  const {
    backLink,
    backLinkOnClick,
    children,
    description,
    image,
    title,
    twitterImage,
    url,
  } = props
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const renderBackLink = () => {
    if (backLinkOnClick) {
      return (
        <BackLink className="back-link" onClick={backLinkOnClick}>
          <BackImg
            alt={IMAGE_PROPS_ARROW_BACK_IOS.getAlt()}
            src={IMAGE_PROPS_ARROW_BACK_IOS.getSrc()}
          />
        </BackLink>
      )
    }
    if (backLink) {
      return (
        <Link href={backLink} passHref>
          <BackLink className="back-link">
            <BackImg
              alt={IMAGE_PROPS_ARROW_BACK_IOS.getAlt()}
              src={IMAGE_PROPS_ARROW_BACK_IOS.getSrc()}
            />
          </BackLink>
        </Link>
      )
    }
    return null
  }
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />

        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="url" content={url} />
        <meta name="author" content="Kernls" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta property="og:author" content="Kernls" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:image" content={twitterImage} />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Header>
        <BackLinkWrapper>{renderBackLink()}</BackLinkWrapper>
        <Link href="/">
          <a
            onClick={() => {
              trackCategory({
                eventProps: {
                  eventAction: 'Main Nav Click',
                  eventCategory: 'Navigation',
                  clickID: 'navigation-click-logo',
                },
              })
            }}
            className="logo"
          >
            <img
              alt={IMAGE_PROPS_LOGO_BETA_4X.getAlt()}
              src={IMAGE_PROPS_LOGO_BETA_4X.getSrc()}
              width="84"
              height="34"
            />
          </a>
        </Link>
      </Header>
      <Main>{children}</Main>
      <Footer>&nbsp;</Footer>
    </>
  )
}
