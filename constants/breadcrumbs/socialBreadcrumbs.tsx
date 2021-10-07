import { BreadcrumbItem } from '@/components/Breadcrumb'
import {
  ROUTE_SECURE_CHAMPION_SHARE,
  ROUTE_SECURE_CHAMPION_SHARE_SOCIAL,
  ROUTE_SECURE_CHAMPION_SHARE_SOCIAL_CREATE,
} from '../config'

export const socialBreadcrumb1: BreadcrumbItem = {
  name: 'share',
  label: 'Campaign tools',
  linkUrl: ROUTE_SECURE_CHAMPION_SHARE,
}
export const socialBreadcrumb2: BreadcrumbItem = {
  name: 'social',
  label: 'Social media activity',
  linkUrl: ROUTE_SECURE_CHAMPION_SHARE_SOCIAL,
}
export const socialBreadcrumb3: BreadcrumbItem = {
  name: 'social-create',
  label: 'Create a post',
  linkUrl: ROUTE_SECURE_CHAMPION_SHARE_SOCIAL_CREATE,
}
export const socialBreadcrumbs = [
  socialBreadcrumb1,
  socialBreadcrumb2,
  socialBreadcrumb3,
]
