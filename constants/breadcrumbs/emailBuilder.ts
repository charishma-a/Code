import { BreadcrumbItem } from '@/components/Breadcrumb'
import {
  ROUTE_SECURE_CHAMPION_SHARE,
  ROUTE_SECURE_CHAMPION_SHARE_EMAILS,
  ROUTE_SECURE_CHAMPION_SHARE_EMAILS_REVIEW,
  ROUTE_SECURE_CHAMPION_SHARE_EMAILS_REVIEW_ADD_CONTACTS,
  ROUTE_SECURE_CHAMPION_SHARE_EMAILS_VIEW,
} from '../config'

export const emailBuilderBreadcrumb1: BreadcrumbItem = {
  name: 'share',
  label: 'Campaign tools',
  linkUrl: ROUTE_SECURE_CHAMPION_SHARE,
}
export const emailBuilderBreadcrumb2: BreadcrumbItem = {
  name: 'emails',
  label: 'Email activity',
  linkUrl: ROUTE_SECURE_CHAMPION_SHARE_EMAILS,
}
export const emailBuilderBreadcrumb3: BreadcrumbItem = {
  name: 'email-view',
  label: 'Create an email',
  linkUrl: ROUTE_SECURE_CHAMPION_SHARE_EMAILS_VIEW,
}
export const emailBuilderBreadcrumb4: BreadcrumbItem = {
  name: 'review-and-send',
  label: 'Review and send',
  linkUrl: ROUTE_SECURE_CHAMPION_SHARE_EMAILS_REVIEW,
}
export const emailBuilderBreadcrumb5: BreadcrumbItem = {
  name: 'add-recipients',
  label: 'Add recipients',
  linkUrl: ROUTE_SECURE_CHAMPION_SHARE_EMAILS_REVIEW_ADD_CONTACTS,
}
export const emailBuilderBreadcrumbs = [
  emailBuilderBreadcrumb1,
  emailBuilderBreadcrumb2,
  emailBuilderBreadcrumb3,
  emailBuilderBreadcrumb4,
  emailBuilderBreadcrumb5,
]
