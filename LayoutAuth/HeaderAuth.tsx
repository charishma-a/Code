import React, { useState } from 'react'
import Link from 'next/link'
import { AppBar } from '@material-ui/core'

import * as sc from './HeaderAuth.styled'

import { ContentContainer, MenuItemButtonLink } from '@/common/styled'
import { trackCategory } from '@/utils/analytics'
import { IMAGE_PROPS_LOGO_BETA } from '@/constants/images'
import { useLogoutMutation, useMeQuery } from '@/generated/graphql'
import {
  ROUTE_CHAMPION_LOGIN,
  ROUTE_CHAMPION_SIGNUP,
  ROUTE_SECURE_CHAMPION_ACCOUNT,
  ROUTE_SECURE_CHAMPION_CONTACTS,
  ROUTE_SECURE_CHAMPION_DASHBOARD,
  ROUTE_SECURE_CHAMPION_PAYMENTS,
  ROUTE_SECURE_CHAMPION_SETTINGS_CAMPAIGN,
  ROUTE_SECURE_CHAMPION_SHARE,
} from '@/constants/config'
import { Paragraph } from '../Paragraph'
import Avatar from 'react-avatar'
import { TransparentDropdown } from '../DropDown'
import { useRouter } from 'next/router'
import { useWindowSize } from '@/hooks/useWindowSize'
import { size } from '@/utils/device'
import { Exit as SvgExit, Hamburger as SvgHamburger } from '@/generated/svgs'
import { genProjectPageUrl } from '@/utils/getProjectPageUrl'

type MenuItemData = {
  clickID: string
  onClick?: () => void
  path: string
  matchPath: string
  title: string
}

const menuItemData: MenuItemData[] = [
  {
    clickID: 'navigation-click-dashboard',
    title: 'Dashboard',
    path: ROUTE_SECURE_CHAMPION_DASHBOARD,
    matchPath: ROUTE_SECURE_CHAMPION_DASHBOARD,
  },
  {
    clickID: 'navigation-click-share',
    title: 'Share',
    path: ROUTE_SECURE_CHAMPION_SHARE,
    matchPath: ROUTE_SECURE_CHAMPION_SHARE,
  },
  {
    clickID: 'navigation-click-contacts',
    title: 'Contacts',
    path: ROUTE_SECURE_CHAMPION_CONTACTS,
    matchPath: ROUTE_SECURE_CHAMPION_CONTACTS,
  },
  {
    clickID: 'navigation-click-payments',
    title: 'Payments',
    path: ROUTE_SECURE_CHAMPION_PAYMENTS,
    matchPath: ROUTE_SECURE_CHAMPION_PAYMENTS,
  },
  {
    clickID: 'navigation-click-settings',
    title: 'Settings',
    path: ROUTE_SECURE_CHAMPION_SETTINGS_CAMPAIGN,
    matchPath: ROUTE_SECURE_CHAMPION_SETTINGS_CAMPAIGN.replace('/campaign', ''),
  },
]

export interface HeaderAuthProps {
  isFullWidth?: boolean
  nonAuthHeaderRightCTA?: 'login' | 'signup'
  sticky?: boolean
}

export const HeaderAuth: React.FC<HeaderAuthProps> = ({
  isFullWidth,
  nonAuthHeaderRightCTA,
  sticky,
}) => {
  // hooks
  const router = useRouter()
  const { width } = useWindowSize()

  // apollo
  const meQueryRes = useMeQuery({
    fetchPolicy: 'cache-and-network',
  })
  const me = meQueryRes.data?.me
  const [logout] = useLogoutMutation()

  // state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const trackMainNavLinks = ({ eventProps, ...restProps }) => {
    return trackCategory({
      eventProps: {
        eventAction: 'Main Nav Click',
        eventCategory: 'Champion Navigation',
        ...eventProps,
      },
      ...restProps,
    })
  }

  // handlers
  const onClickLogout = async () => {
    trackMainNavLinks({
      eventProps: {
        clickID: 'navigation-click-logout',
      },
    })
    await logout()
    window.location.href = ROUTE_CHAMPION_LOGIN
  }

  const onClickAccount = () => {
    trackMainNavLinks({
      eventProps: {
        clickID: 'navigation-click-account',
      },
    })
    router.push(ROUTE_SECURE_CHAMPION_ACCOUNT)
  }

  const tablet = parseInt(size.tablet.replace('px', ''), 10)

  const isAuthenticated = !!me

  const projectPageUrl = me
    ? genProjectPageUrl({
        profileId: me.id,
        projectSlug: me.projectChampion?.project.slug,
        isWithReferred: true,
      })
    : ''

  const renderHeaderRight = () => {
    if (isAuthenticated) {
      const activatorText = `${me.firstName} ${me.lastName}`
      if (width > tablet) {
        return (
          <sc.AvatarWrapper>
            <Avatar
              size="25px"
              name={activatorText}
              round={true}
              color="#8256FF"
              src={me.avatar}
            />

            <TransparentDropdown
              activatorText={activatorText}
              items={[
                {
                  id: 1,
                  text: 'Account',
                  onClick: onClickAccount,
                },
                {
                  id: 2,
                  text: 'Logout',
                  onClick: () => {
                    onClickLogout()
                  },
                },
              ]}
            />
          </sc.AvatarWrapper>
        )
      }

      const onClickToggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)

      if (isMobileMenuOpen) {
        const onClickProjectPage = async () => {
          trackMainNavLinks({
            eventProps: {
              clickID: 'navigation-click-project-page',
            },
          })
          window.location.href = projectPageUrl
        }

        const renderMobileNavLinks = () => {
          return (
            <>
              <sc.MobileMenuItemGroup>
                {menuItemData.map((item) => {
                  const onClickHander = () => {
                    if (typeof item.onClick === 'function') {
                      return item.onClick()
                    }
                    trackMainNavLinks({
                      eventProps: {
                        clickID: item.clickID,
                      },
                    })
                    router.push(item.path)
                  }
                  const isActive = router.pathname.includes(item.matchPath)
                  return (
                    <MenuItemButtonLink
                      isActive={isActive}
                      key={item.title}
                      onClick={onClickHander}
                      type="button"
                    >
                      <span>{item.title}</span>
                    </MenuItemButtonLink>
                  )
                })}
              </sc.MobileMenuItemGroup>
              <sc.MobileMenuItemGroup>
                <MenuItemButtonLink
                  isActive={router.pathname === projectPageUrl}
                  onClick={onClickProjectPage}
                  type="button"
                >
                  <span>Project page</span>
                </MenuItemButtonLink>
              </sc.MobileMenuItemGroup>
              <MenuItemButtonLink
                isActive={router.pathname === ROUTE_SECURE_CHAMPION_ACCOUNT}
                onClick={onClickAccount}
                type="button"
              >
                <span>Account</span>
              </MenuItemButtonLink>
              <MenuItemButtonLink onClick={onClickLogout} type="button">
                <span>Logout</span>
              </MenuItemButtonLink>
              <sc.MobileMenuItemGroup></sc.MobileMenuItemGroup>
            </>
          )
        }

        return (
          <>
            <sc.HamburgerMenuButton
              onClick={onClickToggleMobileMenu}
              type="button"
            >
              <SvgExit color="#825EFF" height="12" width="18" />
            </sc.HamburgerMenuButton>

            <sc.MobileMenuItems
              open={isMobileMenuOpen}
              onClick={onClickToggleMobileMenu}
            >
              {renderMobileNavLinks()}
            </sc.MobileMenuItems>
          </>
        )
      }

      return (
        <>
          <sc.HamburgerMenuButton
            onClick={onClickToggleMobileMenu}
            type="button"
          >
            <SvgHamburger color="#825EFF" height="12" width="18" />
          </sc.HamburgerMenuButton>
        </>
      )
    }
    if (nonAuthHeaderRightCTA === 'login') {
      return (
        <Paragraph>
          Already have an account?{' '}
          <Link href={ROUTE_CHAMPION_LOGIN}>
            <a className="kernls-purple">Log in</a>
          </Link>
        </Paragraph>
      )
    }
    if (nonAuthHeaderRightCTA === 'signup') {
      return (
        <Paragraph>
          Don’t have an account?{' '}
          <Link href={ROUTE_CHAMPION_SIGNUP}>
            <a className="kernls-purple">Signup</a>
          </Link>
        </Paragraph>
      )
    }
    return null
  }

  return (
    <AppBar
      position={sticky ? 'sticky' : 'relative'}
      color="secondary"
      style={{
        boxShadow: '0px 4px 10px 5px rgba(253, 159, 159, 0.02)',
      }}
    >
      <sc.Wrapper>
        <ContentContainer isFullWidth={isFullWidth}>
          <sc.Container>
            <Link
              href={
                isAuthenticated
                  ? ROUTE_SECURE_CHAMPION_DASHBOARD
                  : ROUTE_CHAMPION_LOGIN
              }
            >
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
                <sc.Logo
                  src={IMAGE_PROPS_LOGO_BETA.getSrc()}
                  alt={IMAGE_PROPS_LOGO_BETA.getAlt()}
                />
              </a>
            </Link>
            {renderHeaderRight()}
          </sc.Container>
        </ContentContainer>
      </sc.Wrapper>
    </AppBar>
  )
}
