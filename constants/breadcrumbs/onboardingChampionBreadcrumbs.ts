import { BreadcrumbItem } from '@/components/Breadcrumb'
import {
  ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_1,
  ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_2,
  ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_2_REVIEW,
} from '../config'

export const onboardingChampionBreadcrumb1: BreadcrumbItem = {
  name: 'project-and-donation-match',
  label: '1. Project and donation match',
  linkUrl: ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_1,
}
export const onboardingChampionBreadcrumb2: BreadcrumbItem = {
  name: 'build-campaign-profile',
  label: '2. Build your campaign profile',
  linkUrl: ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_2,
}
export const onboardingChampionBreadcrumb3: BreadcrumbItem = {
  name: 'review-push-live',
  label: '3. Review and push your campaign live',
  linkUrl: ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_2_REVIEW,
}
export const onboardingChampionBreadcrumbs = [
  onboardingChampionBreadcrumb1,
  onboardingChampionBreadcrumb2,
  onboardingChampionBreadcrumb3,
]
