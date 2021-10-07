import { BreadcrumbItem } from '@/components/Breadcrumb'
import {
  ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_3,
  ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_3_REVIEW,
} from '../config'

export const tellThreeFriendsBreadcrumb1: BreadcrumbItem = {
  name: 'tell-3-friends',
  label: 'Tell 3 friends',
  linkUrl: ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_3,
}
export const tellThreeFriendsBreadcrumb2: BreadcrumbItem = {
  name: 'tell-3-friends-review',
  label: 'Review and send',
  linkUrl: ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_3_REVIEW,
}
export const tellThreeFriendsBreadcrumbs = [
  tellThreeFriendsBreadcrumb1,
  tellThreeFriendsBreadcrumb2,
]
