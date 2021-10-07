import {
  ROUTE_CHAMPION_LOGIN,
  ROUTE_SECURE_CHAMPION_CONTACT_SALES,
  ROUTE_SECURE_CHAMPION_DASHBOARD,
  ROUTE_SECURE_CHAMPION_ONBOARDING_BASE,
  ROUTE_SECURE_CHAMPION_VERIFY_EMAIL_SENT,
} from '@/constants/config'

export type ProfileChampionOnboardingStepSlug =
  | undefined
  | 'project-donation-match'
  | 'build-campaign-profile'
  | 'tell-3-friends'
  | 'done'

export const getAuthRedirect = ({
  accessToken,
  isSalesRequired = false,
  isVerified = false,
  onboardingStep,
  redirectUrlAuth = ROUTE_SECURE_CHAMPION_DASHBOARD,
  redirectUrlContactSales = ROUTE_SECURE_CHAMPION_CONTACT_SALES,
  redirectUrlNotAuth = ROUTE_CHAMPION_LOGIN,
  redirectUrlNotVerified = ROUTE_SECURE_CHAMPION_VERIFY_EMAIL_SENT,
  shouldRedirectOnboardingUrl = true,
  shouldRedirectAuthUrl = false,
}: {
  accessToken: string
  isSalesRequired?: boolean
  isVerified?: boolean
  onboardingStep?: ProfileChampionOnboardingStepSlug
  redirectUrlAuth?: string
  redirectUrlContactSales?: string
  redirectUrlNotAuth?: string
  redirectUrlNotVerified?: string
  shouldRedirectOnboardingUrl?: boolean
  shouldRedirectAuthUrl?: boolean
}): string => {
  if (!accessToken) {
    return redirectUrlNotAuth
  }
  if (!isVerified) {
    return redirectUrlNotVerified
  }
  if (isSalesRequired) {
    return redirectUrlContactSales
  }
  if (shouldRedirectOnboardingUrl && onboardingStep !== 'done') {
    const stepUrl = onboardingStep || 'project-donation-match'
    return `${ROUTE_SECURE_CHAMPION_ONBOARDING_BASE}/${stepUrl}`
  }
  if (shouldRedirectAuthUrl) {
    return redirectUrlAuth
  }
  return ''
}
