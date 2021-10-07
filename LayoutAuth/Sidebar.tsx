import React, { FC } from 'react'

import * as sc from './Sidebar.styled'

import { useRouter } from 'next/router'
import {
  ROUTE_SECURE_CHAMPION_CONTACTS,
  ROUTE_SECURE_CHAMPION_DASHBOARD,
  ROUTE_SECURE_CHAMPION_PAYMENTS,
  ROUTE_SECURE_CHAMPION_SETTINGS_CAMPAIGN,
  ROUTE_SECURE_CHAMPION_SHARE,
} from '@/constants/config'
import {
  Contacts as SvgContacts,
  Dashboard as SvgDashboard,
  Payment as SvgPayment,
  ProjectPage as SvgProjectPage,
  Settings as SvgSettings,
  Share as SvgShare,
} from '@/generated/svgs'
import { BaseComponentProps } from '@/common/types'
import Link from 'next/link'
import { useMeQuery } from '@/generated/graphql'
import { genProjectPageUrl } from '@/utils/getProjectPageUrl'
import { MenuItemButtonLink, MenuExternalLink } from '@/common/styled'

type SidebarItemData = {
  renderIcon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  onClick?: () => void
  path: string
  matchPath: string
  title: string
}

const sidebarItemData: SidebarItemData[] = [
  {
    renderIcon: (props: React.SVGProps<SVGSVGElement>) => (
      <SvgDashboard {...props} />
    ),
    title: 'Dashboard',
    path: ROUTE_SECURE_CHAMPION_DASHBOARD,
    matchPath: ROUTE_SECURE_CHAMPION_DASHBOARD,
  },
  {
    renderIcon: (props: React.SVGProps<SVGSVGElement>) => (
      <SvgShare {...props} />
    ),
    title: 'Share',
    path: ROUTE_SECURE_CHAMPION_SHARE,
    matchPath: ROUTE_SECURE_CHAMPION_SHARE,
  },
  {
    renderIcon: (props: React.SVGProps<SVGSVGElement>) => (
      <SvgContacts {...props} />
    ),
    title: 'Contacts',
    path: ROUTE_SECURE_CHAMPION_CONTACTS,
    matchPath: ROUTE_SECURE_CHAMPION_CONTACTS,
  },
  {
    renderIcon: (props: React.SVGProps<SVGSVGElement>) => (
      <SvgPayment {...props} />
    ),
    title: 'Payments',
    path: ROUTE_SECURE_CHAMPION_PAYMENTS,
    matchPath: ROUTE_SECURE_CHAMPION_PAYMENTS,
  },
  {
    renderIcon: (props: React.SVGProps<SVGSVGElement>) => (
      <SvgSettings {...props} />
    ),
    title: 'Settings',
    path: ROUTE_SECURE_CHAMPION_SETTINGS_CAMPAIGN,
    matchPath: ROUTE_SECURE_CHAMPION_SETTINGS_CAMPAIGN.replace('/campaign', ''),
  },
]

export const Sidebar: FC<BaseComponentProps> = ({
  classNames,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')

  const router = useRouter()

  // apollo
  const { data } = useMeQuery()

  const url =
    data && data.me
      ? genProjectPageUrl({
          profileId: data.me.id,
          projectSlug: data.me.projectChampion?.project.slug,
          isWithReferred: true,
        })
      : ''
  const svgProps = {
    color: '#DADADA',
    width: '17',
    height: '14',
  }
  return (
    <sc.Wrapper className={className} {...restProps}>
      {sidebarItemData.map((item) => {
        const onClickHander = () => {
          if (typeof item.onClick === 'function') {
            return item.onClick()
          }
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
            {item.renderIcon(svgProps)}
            <span>{item.title}</span>
          </MenuItemButtonLink>
        )
      })}
      <Link passHref href={url}>
        <MenuExternalLink target="_blank" rel="noreferrer">
          <span>Project page</span>
          <SvgProjectPage {...svgProps} />
        </MenuExternalLink>
      </Link>
    </sc.Wrapper>
  )
}
