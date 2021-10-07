export const DEFAULT_CURRENCY = 'usd'
// Set your amount limits: Use float for decimal currencies and
// Integer for zero-decimal currencies: https://stripe.com/docs/currencies#zero-decimal.
export const MIN_AMOUNT = 10.0
export const MAX_AMOUNT = 5000.0
export const AMOUNT_STEP = 5.0
export const PROCESSING_BASE_FEE = 0.3
export const PROCESSING_ACH_FEE_PERCENT = 0.8
export const PROCESSING_ACH_FEE_FLAT = 5

/* error messages */
export const ERROR_MESSAGE_GENERIC =
  'Something went wrong. Please contact support at support@kernls.com.'
export const ERROR_MESSAGE_FIELD_REQUIRED = 'This information is required.'

/* urls */
export const PROJECT_REQUEST_FORM_URL =
  'https://share.hsforms.com/1ttSZwuqkT6GPH5H92zJYsw5d7ia'
export const PRESS_ROOM_URL = 'https://learn.kernls.com/press-room'
export const FOR_BACKERS_URL = 'https://learn.kernls.com/for-champions/'
export const FAQS_URL = 'https://learn.kernls.com/faqs/'
export const FOR_RESEARCHERS_URL = 'https://learn.kernls.com/for-researchers/'
export const BLOG_URL = 'https://learn.kernls.com/blog/'
export const ABOUT_US_URL = 'https://learn.kernls.com/about-us/'
export const CAREERS_URL = 'https://learn.kernls.com/careers/'
export const URL_LEARN_FORMAT_CSV = '#'

/* cloudinary */
export const PROD_IMAGE_BASE_URL =
  'https://res.cloudinary.com/kernls/image/upload/'
export const PROD_IMAGE_PREFIX_URL = 'prod/public/assets/images/'
export const PROD_SVG_PREFIX_URL = 'prod/public/assets/svgs/'

/* file field names */
export const FILE_FIELD_NAME_AVATAR = 'avatar'
export const FILE_FIELD_NAME_CONTACTS_UPLOAD = 'contacts-upload'

/* segment */
export const SEGMENT_WRITE_KEY = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY || ''

/* google analytics */
export const GA_TRACKING_ID = 'UA-171551487-2'

/* local storage */
export const LOCAL_STORAGE_KEY_QUERY = '@queryParams'

/* routes */
export const ROUTE_PROJECTS = '/projects'

export const ROUTE_CHAMPION_SIGNUP = '/champion/signup'
export const ROUTE_CHAMPION_LOGIN = '/champion/login'
export const ROUTE_CHAMPION_FORGOT_PASSWORD = '/champion/forgot-password'
export const ROUTE_CHAMPION_RESET_PASSWORD = '/champion/reset-password'
export const ROUTE_CHAMPOIN_GOOGLE_LOGIN = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`

export const ROUTE_PREFIX_SECURE_CHAMPION = '/secure/champion'
export const ROUTE_SECURE_CHAMPION_VERIFY_EMAIL_SENT = `${ROUTE_PREFIX_SECURE_CHAMPION}/verify-email-sent`
export const ROUTE_SECURE_CHAMPION_CONTACT_SALES = `${ROUTE_PREFIX_SECURE_CHAMPION}/contact-sales`

export const ROUTE_SECURE_CHAMPION_ONBOARDING_BASE = `${ROUTE_PREFIX_SECURE_CHAMPION}/onboarding`
export const ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_1 = `${ROUTE_SECURE_CHAMPION_ONBOARDING_BASE}/project-donation-match`
export const ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_2 = `${ROUTE_SECURE_CHAMPION_ONBOARDING_BASE}/build-campaign-profile`
export const ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_2_REVIEW = `${ROUTE_SECURE_CHAMPION_ONBOARDING_BASE}/build-campaign-profile/review`
export const ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_2_SUCCESS = `${ROUTE_SECURE_CHAMPION_ONBOARDING_BASE}/build-campaign-profile/success`
export const ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_3 = `${ROUTE_SECURE_CHAMPION_ONBOARDING_BASE}/tell-3-friends`
export const ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_3_REVIEW = `${ROUTE_SECURE_CHAMPION_ONBOARDING_BASE}/tell-3-friends/review-and-send`
export const ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_3_SUCCESS = `${ROUTE_SECURE_CHAMPION_ONBOARDING_BASE}/tell-3-friends/success`

export const ROUTE_SECURE_CHAMPION_DASHBOARD = `${ROUTE_PREFIX_SECURE_CHAMPION}/dashboard`
export const ROUTE_SECURE_CHAMPION_ACCOUNT = `${ROUTE_PREFIX_SECURE_CHAMPION}/account`
export const ROUTE_SECURE_CHAMPION_SHARE = `${ROUTE_PREFIX_SECURE_CHAMPION}/share`
export const ROUTE_SECURE_CHAMPION_SHARE_EMAILS = `${ROUTE_PREFIX_SECURE_CHAMPION}/share/emails`
export const ROUTE_SECURE_CHAMPION_SHARE_EMAILS_VIEW = `${ROUTE_PREFIX_SECURE_CHAMPION}/share/emails/[id]`
export const ROUTE_SECURE_CHAMPION_SHARE_EMAILS_EDIT = `${ROUTE_PREFIX_SECURE_CHAMPION}/share/emails/[id]/edit`
export const ROUTE_SECURE_CHAMPION_SHARE_EMAILS_REVIEW = `${ROUTE_PREFIX_SECURE_CHAMPION}/share/emails/[id]/review-and-send`
export const ROUTE_SECURE_CHAMPION_SHARE_EMAILS_REVIEW_ADD_CONTACTS = `${ROUTE_PREFIX_SECURE_CHAMPION}/share/emails/[id]/review-and-send/add-contacts`
export const ROUTE_SECURE_CHAMPION_SHARE_SOCIAL = `${ROUTE_PREFIX_SECURE_CHAMPION}/share/social`
export const ROUTE_SECURE_CHAMPION_SHARE_SOCIAL_VIEW = `${ROUTE_SECURE_CHAMPION_SHARE_SOCIAL}/[id]`
export const ROUTE_SECURE_CHAMPION_SHARE_SOCIAL_CREATE = `${ROUTE_SECURE_CHAMPION_SHARE_SOCIAL}/create`
export const ROUTE_SECURE_CHAMPION_CONTACTS = `${ROUTE_PREFIX_SECURE_CHAMPION}/contacts`
export const ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_SINGLE = `${ROUTE_PREFIX_SECURE_CHAMPION}/contacts/create`
export const ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_PASTE = `${ROUTE_PREFIX_SECURE_CHAMPION}/contacts/create-by-paste`
export const ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_PASTE_REVIEW = `${ROUTE_PREFIX_SECURE_CHAMPION}/contacts/create-by-paste/review`
export const ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_FILE = `${ROUTE_PREFIX_SECURE_CHAMPION}/contacts/create-by-file`
export const ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_FILE_REVIEW = `${ROUTE_PREFIX_SECURE_CHAMPION}/contacts/create-by-file/[id]/review`
export const ROUTE_SECURE_CHAMPION_PAYMENTS = `${ROUTE_PREFIX_SECURE_CHAMPION}/payments`
export const ROUTE_SECURE_CHAMPION_PAYMENTS_DIRECT = `${ROUTE_PREFIX_SECURE_CHAMPION}/payments/direct-deposit`
export const ROUTE_SECURE_CHAMPION_PAYMENTS_DIRECT_CREATE = `${ROUTE_PREFIX_SECURE_CHAMPION}/payments/direct-deposit/create`
export const ROUTE_SECURE_CHAMPION_PAYMENTS_DIRECT_SUCCESS = `${ROUTE_PREFIX_SECURE_CHAMPION}/payments/direct-deposit/success`
export const ROUTE_SECURE_CHAMPION_PAYMENTS_CREDIT = `${ROUTE_PREFIX_SECURE_CHAMPION}/payments/credit-card`
export const ROUTE_SECURE_CHAMPION_PAYMENTS_CREDIT_SUCCESS = `${ROUTE_PREFIX_SECURE_CHAMPION}/payments/credit-card/success`
export const ROUTE_SECURE_CHAMPION_SETTINGS_CAMPAIGN = `${ROUTE_PREFIX_SECURE_CHAMPION}/settings/campaign`
export const ROUTE_SECURE_CHAMPION_SETTINGS_PROFILE = `${ROUTE_PREFIX_SECURE_CHAMPION}/settings/profile`

/* general */
export const __prod__ = process.env.NODE_ENV === 'production'
export const METATAG_IMAGE =
  'https://kernls.com/assets/images/og/home_kernls-general.png'
export const METATAG_TWITTER_IMAGE =
  'https://kernls.com/assets/images/og/twitter_home_kernls-general.png'
