import { useRouter } from 'next/router'

import * as sc from './CampaignActions.styled'

import { BaseComponentProps } from '@/common/types'
import {
  CreateEmail as SvgCreateEmail,
  ManageContacts as SvgManageContacts,
  CreateSocialPost as SvgCreateSocialPost,
  ForwardArrow as SvgForwardArrow,
} from '@/generated/svgs'
import {
  ROUTE_SECURE_CHAMPION_CONTACTS,
  ROUTE_SECURE_CHAMPION_SHARE_EMAILS,
  ROUTE_SECURE_CHAMPION_SHARE_SOCIAL,
} from '@/constants/config'

type ActionItem = {
  renderIcon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  onClick?: () => void
  path: string
  title: string
}

const actionItems: ActionItem[] = [
  {
    renderIcon: (props) => <SvgCreateEmail {...props} />,
    path: ROUTE_SECURE_CHAMPION_SHARE_EMAILS,
    title: 'Send an email',
  },
  {
    renderIcon: (props) => <SvgCreateSocialPost {...props} />,
    path: ROUTE_SECURE_CHAMPION_SHARE_SOCIAL,
    title: 'Share on social media',
  },
  {
    renderIcon: (props) => <SvgManageContacts {...props} />,
    path: ROUTE_SECURE_CHAMPION_CONTACTS,
    title: 'Manage contacts',
  },
]

export const CampaignActions: React.FC<BaseComponentProps> = ({
  classNames,
}) => {
  const className = [sc.baseClass, classNames].join(' ')
  const router = useRouter()
  return (
    <section className={className}>
      <h3>Campaign actions</h3>
      <sc.ActionButtons>
        {actionItems.map(({ onClick, path, renderIcon, title }) => {
          const onClickHander = () => {
            if (typeof onClick === 'function') {
              return onClick()
            }
            router.push(path)
          }
          return (
            <sc.ActionButton key={title} onClick={onClickHander} type="button">
              <sc.ActionButtonIconWrapper>
                {renderIcon({ color: '#DADADA', height: '40', width: '50' })}
              </sc.ActionButtonIconWrapper>
              <sc.ActionButtonTextWrapper>
                <span>{title}</span>
                <SvgForwardArrow color="#DADADA" height="14" width="8" />
              </sc.ActionButtonTextWrapper>
            </sc.ActionButton>
          )
        })}
      </sc.ActionButtons>
    </section>
  )
}
