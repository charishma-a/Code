import { Maybe, Profile } from '@/generated/graphql'
import React, { FunctionComponent, ReactNode } from 'react'
import { Sidebar } from './Sidebar'

import * as sc from './LayoutAuth.styled'

import Layout from '../Layout/Layout'
import { HeaderAuth } from './HeaderAuth'

export interface LayoutAuthProps {
  children: ReactNode
  description: string
  me?: Maybe<Profile>
  image: string
  isFullWidth?: boolean
  nonAuthHeaderRightCTA?: 'login' | 'signup'
  showHeader?: boolean
  showSidebar?: boolean
  title: string
  twitterImage: string
  url: string
}

export const LayoutAuth: FunctionComponent<LayoutAuthProps> = (props) => {
  const {
    children,
    description,
    image,
    isFullWidth,
    nonAuthHeaderRightCTA,
    showHeader = true,
    showSidebar = false,
    title,
    twitterImage,
    url,
  } = props
  return (
    <sc.Page>
      <Layout
        description={description}
        footer={null}
        header={
          showHeader ? (
            <HeaderAuth
              isFullWidth={isFullWidth}
              nonAuthHeaderRightCTA={nonAuthHeaderRightCTA}
              sticky
            />
          ) : null
        }
        image={image}
        title={title}
        twitterImage={twitterImage}
        url={url}
      >
        {showSidebar ? (
          <sc.Body>
            <Sidebar />
            <sc.BodyMain>{children}</sc.BodyMain>
          </sc.Body>
        ) : (
          children
        )}
      </Layout>
    </sc.Page>
  )
}
