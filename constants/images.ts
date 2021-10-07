import { getGoodJpgUrl } from '@/utils/cloudinary/getGoodJpgUrl'
import { getImgUrl } from '@/utils/cloudinary/getImgUrl'

type ImageProps = {
  getAlt?: () => string
  getSrc: () => string
}

/* general */
export const IMAGE_PROPS_LOGO_BETA_4X: ImageProps = {
  getAlt: () => 'Kernls Beta',
  getSrc: () => getImgUrl({ ext: 'png', name: 'logo-beta-4x' }),
}
export const IMAGE_PROPS_LOGO_BETA: ImageProps = {
  getAlt: () => 'Kernls Beta',
  getSrc: () => getGoodJpgUrl({ name: 'logo-beta' }),
}
export const IMAGE_PROPS_LOGO: ImageProps = {
  getAlt: () => 'Kernls',
  getSrc: () => getGoodJpgUrl({ name: 'logo' }),
}
export const IMAGE_PROPS_INFO_PURPLE: ImageProps = {
  getAlt: () => 'info',
  getSrc: () => getGoodJpgUrl({ name: 'info-purple' }),
}
export const IMAGE_PROPS_ARROW_BACK_IOS: ImageProps = {
  getAlt: () => 'Back',
  getSrc: () => getGoodJpgUrl({ name: 'arrow-back-ios' }),
}
export const IMAGE_PROPS_LOCATION_GREY: ImageProps = {
  getSrc: () => getGoodJpgUrl({ name: 'location-grey' }),
}
export const IMAGE_PROPS_LOCATION_PURPLE: ImageProps = {
  getSrc: () => getGoodJpgUrl({ name: 'location-purple' }),
}
export const IMAGE_PROPS_NAV_HAMBURGER_MENU: ImageProps = {
  getAlt: () => 'open navigation',
  getSrc: () => getGoodJpgUrl({ name: 'hamburger-menu' }),
}
export const IMAGE_PROPS_NAV_HAMBURGER_MENU_CLOSE: ImageProps = {
  getAlt: () => 'close navigation',
  getSrc: () => getGoodJpgUrl({ name: 'hamburger-menu-close' }),
}
export const IMAGE_PROPS_TOOLTIP_PURPLE: ImageProps = {
  getSrc: () => getGoodJpgUrl({ name: 'tooltip-purple' }),
}

/* payment options */
export const IMAGE_PROPS_CC_AMERICAN_EXPRESS: ImageProps = {
  getAlt: () => 'AMERICAN EXPRESS',
  getSrc: () => getGoodJpgUrl({ name: 'cc_americanexpress' }),
}
export const IMAGE_PROPS_CC_JCB: ImageProps = {
  getAlt: () => 'JCB',
  getSrc: () => getGoodJpgUrl({ name: 'cc_jcb' }),
}
export const IMAGE_PROPS_CC_MAESTRO: ImageProps = {
  getAlt: () => 'maestro',
  getSrc: () => getGoodJpgUrl({ name: 'cc_maestro' }),
}
export const IMAGE_PROPS_CC_MASTERCARD: ImageProps = {
  getAlt: () => 'mastercard',
  getSrc: () => getGoodJpgUrl({ name: 'cc_mastercard' }),
}
export const IMAGE_PROPS_CC_VISA: ImageProps = {
  getAlt: () => 'VISA',
  getSrc: () => getGoodJpgUrl({ name: 'cc_visa' }),
}

/* homepage */
export const IMAGE_PROPS_HOMEPAGE_HERO: ImageProps = {
  getSrc: () => getGoodJpgUrl({ name: 'homepage-hero' }),
}
export const IMAGE_PROPS_HOMEPAGE_HERO_V2: ImageProps = {
  getSrc: () => getImgUrl({ ext: 'png', name: 'homepage-hero-v2' }),
}

/* foundations */
export const IMAGE_PROPS_FOUNDATION_ALBERT_EINSTEIN: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'foundations/albert-einstein-college-medicine',
    }),
}
export const IMAGE_PROPS_FOUNDATION_ALBERT_EINSTEIN_LOGO: ImageProps = {
  getAlt: () => 'EINSTEIN - Albert Einstein College of Medicine',
  getSrc: () =>
    getImgUrl({
      ext: 'png',
      name: 'foundations/albert-einstein-college-medicine-logo',
    }),
}
export const IMAGE_PROPS_FOUNDATION_PMCF_UHN: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'foundations/pmcf-uhn',
    }),
}
export const IMAGE_PROPS_FOUNDATION_PMCF_UHN_LOGO: ImageProps = {
  getAlt: () => 'UHN - The Princess Margaret Cancer Foundation',
  getSrc: () =>
    getImgUrl({
      ext: 'png',
      name: 'foundations/pmcf-uhn-logo',
    }),
}
export const IMAGE_PROPS_FOUNDATION_ATRI_USC: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'foundations/atri-usc',
    }),
}
export const IMAGE_PROPS_FOUNDATION_ATRI_USC_LOGO: ImageProps = {
  getAlt: () =>
    "USC - Keck School Medicine of USC - Alzeimer's Therapeutic Research Insitituion",
  getSrc: () =>
    getImgUrl({
      ext: 'png',
      name: 'foundations/atri-usc-logo',
    }),
}
export const IMAGE_PROPS_FOUNDATION_CORNELL_BURKE_NEROLOGICAL_INSTITUTE_LOGO: ImageProps =
  {
    getAlt: () =>
      'Weill Cornell Medicine - Burke Neurological Institute - The science hope demands',
    getSrc: () =>
      getImgUrl({
        ext: 'png',
        name: 'foundations/cornell-burke-nerological-institute-logo',
      }),
  }

/* how it works */
export const IMAGE_PROPS_HOW_IT_WORKS_DONOR: ImageProps = {
  getAlt: () =>
    'We pair Researchers with donors who support projects by sharing them and matching donations.',
  getSrc: () =>
    getGoodJpgUrl({
      name: 'how-it-works-donor',
    }),
}
export const IMAGE_PROPS_HOW_IT_WORKS_CHAMPION: ImageProps = {
  getAlt: () =>
    'We pair Researchers with donors who support projects by sharing them and matching donations.',
  getSrc: () =>
    getGoodJpgUrl({
      name: 'how-it-works-champion',
    }),
}
export const IMAGE_PROPS_HOW_IT_WORKS_RESEARCHER: ImageProps = {
  getAlt: () =>
    'We pair Researchers with donors who support projects by sharing them and matching donations.',
  getSrc: () =>
    getGoodJpgUrl({
      name: 'how-it-works-researcher',
    }),
}

/* become a champion */
export const IMAGE_PROPS_BECOME_A_CHAMPION: ImageProps = {
  getAlt: () => 'become a champion',
  getSrc: () =>
    getGoodJpgUrl({
      name: 'become-a-champion',
    }),
}

/* project */
export const IMAGE_PROPS_PROJECT_REQUEST_CARD_BG: ImageProps = {
  getSrc: () => getGoodJpgUrl({ name: 'projects/project-request-card-bg' }),
}
export const IMAGE_PROPS_PROJECT_MATCHING_AVAILABLE: ImageProps = {
  getAlt: () => 'Project matching available',
  getSrc: () =>
    getGoodJpgUrl({
      name: 'project-matching-available',
    }),
}
export const IMAGE_PROPS_PROJECT_GRAPH_LOCKED: ImageProps = {
  getAlt: () => 'Project matching available',
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/graph-locked',
    }),
}
// LK4S12M
export const IMAGE_PROPS_PROJECT_LK4S12M_MAIN: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/LK4S12M-main',
    }),
}
export const IMAGE_PROPS_PROJECT_LK4S12M_GRAPH: ImageProps = {
  getAlt: () =>
    'Facilities & admin (2.5%), Personnel (50%), Equipment (10%), Materials and supplied (25%), Animal models (10%), Drugs (2.5%), Publication (1.5%) = $200,000 (USD)',
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/LK4S12M-graph',
    }),
}
export const IMAGE_PROPS_PROJECT_LK4S12M_HARRIS_GOLDSTEIN: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/LK4S12M-harris-goldstein',
    }),
}
// A4D04DF
export const IMAGE_PROPS_PROJECT_A4D04DF_MAIN: ImageProps = {
  getAlt: () => 'Dr. Autry working with fellow researchers in the lab.',
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/A4D04DF-main',
    }),
}
export const IMAGE_PROPS_PROJECT_A4D04DF_GRAPH: ImageProps = {
  getAlt: () =>
    'Facilities & admin (20%), Lab consumables (20%), Animal models (60%) = $25,000 (USD)',
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/A4D04DF-graph',
    }),
}
export const IMAGE_PROPS_PROJECT_A4D04DF_AVATAR_ANITA: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/A4D04DF-avatar-anita',
    }),
}
export const IMAGE_PROPS_PROJECT_A4D04DF_AVATAR_BRENDA: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/A4D04DF-avatar-brenda',
    }),
}
// 35UEmH7
export const IMAGE_PROPS_PROJECT_35UEmH7_MAIN: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/35UEmH7-main',
    }),
}
export const IMAGE_PROPS_PROJECT_35UEmH7_GRAPH: ImageProps = {
  getAlt: () =>
    'Cost of materials, reagents and supplies (33.3%), Hiring a post doctoral fellow (66.6%) = $60,000 (USD)',
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/35UEmH7-graph',
    }),
}
export const IMAGE_PROPS_PROJECT_35UEmH7_AVATAR_ARMAND_KEATING: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/35UEmH7-avatar-armand-keating',
    }),
}
// 7CRQ2B2
export const IMAGE_PROPS_PROJECT_7CRQ2B2_MAIN: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/7CRQ2B2-main',
    }),
}
export const IMAGE_PROPS_PROJECT_7CRQ2B2_GRAPH: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/7CRQ2B2-graph',
    }),
}
export const IMAGE_PROPS_PROJECT_7CRQ2B2_AVATAR_STEVE_GALLINGER: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/7CRQ2B2-avatar-steve-gallinger',
    }),
}
export const IMAGE_PROPS_PROJECT_7CRQ2B2_AVATAR_GRAINNE_OKANE: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/7CRQ2B2-avatar-grainne-okane',
    }),
}
// 57E36H3
export const IMAGE_PROPS_PROJECT_57E36H3_MAIN: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/57E36H3-main',
    }),
}
export const IMAGE_PROPS_PROJECT_57E36H3_GRAPH: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/57E36H3-graph',
    }),
}
export const IMAGE_PROPS_PROJECT_57E36H3_AVATAR_MATHIEU_LUPIEN: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/57E36H3-avatar-mathieu-lupien',
    }),
}
export const IMAGE_PROPS_PROJECT_57E36H3_AVATAR_DAVID_CESCON: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/57E36H3-avatar-david-cescon',
    }),
}
// YR8UGE2
export const IMAGE_PROPS_PROJECT_YR8UGE2_MAIN: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/YR8UGE2-main',
    }),
}
export const IMAGE_PROPS_PROJECT_YR8UGE2_GRAPH: ImageProps = {
  getAlt: () =>
    '$1M (USD), Blood tests (100%), *1 Blood test = $500 ($500 x 2000 people)',
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/YR8UGE2-graph',
    }),
}
export const IMAGE_PROPS_PROJECT_YR8UGE2_TEAM_TAB: ImageProps = {
  getAlt: () => 'The ATRI team at their office in San Diego.',
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/YR8UGE2-team-tab',
    }),
}
export const IMAGE_PROPS_PROJECT_YR8UGE2_AVATAR_PAUL_AISEN: ImageProps = {
  getSrc: () =>
    getGoodJpgUrl({
      name: 'projects/YR8UGE2-avatar-paul-aisen',
    }),
}
