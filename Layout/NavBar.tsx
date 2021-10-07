import React, { HTMLAttributes, useState } from 'react'
import Link from 'next/link'
import { AppBar } from '@material-ui/core'
import styled from 'styled-components'

import { ContentContainer } from '@/common/styled'
import { device, size } from '@/utils/device'
import { useWindowSize } from '@/hooks/useWindowSize'
import {
  ABOUT_US_URL,
  FOR_BACKERS_URL,
  FOR_RESEARCHERS_URL,
  BLOG_URL,
  FAQS_URL,
} from '@/constants/config'

/* utils */
import { trackCategory } from '@/utils/analytics'
import {
  IMAGE_PROPS_LOGO_BETA,
  IMAGE_PROPS_NAV_HAMBURGER_MENU,
  IMAGE_PROPS_NAV_HAMBURGER_MENU_CLOSE,
} from '@/constants/images'
import { ActionLink } from '../ActionLink'

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.75rem 0 0.75rem 0;
`

const Logo = styled.img`
  height: 2rem;
  cursor: pointer;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  @media ${device.tablet} {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    a.link-cta {
      background-color: #000;
      border: 1px solid #000;
      border-radius: 4px;
      color: #fff;
      padding: 0.5rem 1rem;
    }
  }

  a {
    margin-left: 1.5rem;
  }
`

const Icon = styled.img`
  height: 1.5rem;
  width: 1.5rem;
  align-self: center;
`

const HamburgerMenu = styled.div`
  position: relative;
  cursor: pointer;
`
const Items = styled.div<HTMLAttributes<HTMLDivElement> & { open?: boolean }>`
  display: flex;
  flex-direction: column;
  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
  background-color: #fff;
  padding: 3rem;
  position: absolute;
  z-index: 1;
  height: 100vh;
  width: 100%;

  left: 0;
  right: 0;

  a {
    margin: 0;
    margin-left: -1rem;
    margin-top: 1.375rem;
    @media ${device.tablet} {
      margin-left: 2rem;
    }
    font-weight: normal;
    font-size: 0.875rem;
    line-height: 1.1875rem;
    cursor: pointer;
  }
`

const Wrapper = styled.nav`
  position: relative;
`

export interface NavBarProps {
  sticky?: boolean
}

export const NavBar: React.FC<NavBarProps> = ({ sticky }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const { width } = useWindowSize()
  const laptop = parseInt(size.laptop.split('p')[0], 10)

  const trackMainNavLinks = ({ eventProps, ...restProps }) => {
    return trackCategory({
      eventProps: {
        eventAction: 'Main Nav Click',
        eventCategory: 'Navigation',
        ...eventProps,
      },
      ...restProps,
    })
  }

  const links = [
    {
      clickID: 'navigation-click-explore-projects',
      href: '/#explore-projects',
      text: 'Explore Projects',
      internal: true,
    },
    {
      clickID: 'navigation-click-how-it-works',
      href: '/#how-it-works',
      text: 'How it Works',
      internal: true,
    },
    {
      clickID: 'navigation-click-for-champions',
      href: FOR_BACKERS_URL,
      text: 'Champion a Project',
      internal: false,
    },
    {
      clickID: 'navigation-click-faq',
      href: FAQS_URL,
      text: 'FAQs',
      internal: false,
    },
    {
      clickID: 'navigation-click-about-us',
      href: ABOUT_US_URL,
      text: 'About Us',
      internal: false,
    },
    {
      clickID: 'navigation-click-kernls-blog',
      href: BLOG_URL,
      text: 'Blog',
      internal: false,
    },
    {
      className: 'link-cta',
      clickID: 'navigation-click-for-researchers',
      href: FOR_RESEARCHERS_URL,
      text: 'For Researchers',
      internal: false,
    },
  ]

  const renderDesktopNavLinks = () => {
    return links.map((link) => {
      const { className, clickID, href, internal, text } = link

      const onClick = () =>
        trackMainNavLinks({
          eventProps: {
            clickID,
            clickText: text,
          },
        })

      if (internal) {
        return (
          <Link key={clickID} href={href} passHref>
            <ActionLink className={className} onClick={onClick}>
              {text}
            </ActionLink>
          </Link>
        )
      }

      const externalOnClick = async (e) => {
        e.preventDefault()
        onClick()
        window.location.href = href
      }

      return (
        <ActionLink
          className={className}
          key={clickID}
          href={href}
          onClick={externalOnClick}
        >
          {text}
        </ActionLink>
      )
    })
  }

  const renderMobileNavLinks = () => {
    return links.map((link) => {
      const { className, clickID, href, internal, text } = link

      const onClick = () =>
        trackMainNavLinks({
          eventProps: {
            clickID,
            clickText: text,
          },
        })

      if (internal) {
        return (
          <Link key={clickID} href={href} passHref>
            <ActionLink className={className} onClick={onClick}>
              {text}
            </ActionLink>
          </Link>
        )
      }

      const onExternalClick = (e) => {
        e.preventDefault()
        onClick()
        window.location.href = href
      }

      return (
        <ActionLink
          className={className}
          key={clickID}
          href={href}
          onClick={onExternalClick}
        >
          {text}
        </ActionLink>
      )
    })
  }

  return (
    <AppBar
      position={sticky ? 'sticky' : 'relative'}
      color="secondary"
      style={{ boxShadow: '0px 4px 10px 5px rgba(0, 0, 0, 0.02)' }}
    >
      <Wrapper>
        <ContentContainer>
          <Container>
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
              >
                <Logo
                  src={IMAGE_PROPS_LOGO_BETA.getSrc()}
                  alt={IMAGE_PROPS_LOGO_BETA.getAlt()}
                />
              </a>
            </Link>
            {width >= laptop ? (
              <MenuContainer>{renderDesktopNavLinks()}</MenuContainer>
            ) : (
              <HamburgerMenu>
                {openMenu ? (
                  <Icon
                    alt={IMAGE_PROPS_NAV_HAMBURGER_MENU_CLOSE.getAlt()}
                    src={IMAGE_PROPS_NAV_HAMBURGER_MENU_CLOSE.getSrc()}
                    onClick={() => setOpenMenu(!openMenu)}
                  />
                ) : (
                  <Icon
                    alt={IMAGE_PROPS_NAV_HAMBURGER_MENU.getAlt()}
                    src={IMAGE_PROPS_NAV_HAMBURGER_MENU.getSrc()}
                    onClick={() => setOpenMenu(!openMenu)}
                  />
                )}
              </HamburgerMenu>
            )}
          </Container>
        </ContentContainer>

        <Items open={openMenu} onClick={() => setOpenMenu(!openMenu)}>
          {renderMobileNavLinks()}
        </Items>
      </Wrapper>
    </AppBar>
  )
}
