import { PROD_IMAGE_BASE_URL, PROD_SVG_PREFIX_URL } from '@/constants/config'

export const getSvgUrl = ({ name }: { name: string }): string =>
  `${PROD_IMAGE_BASE_URL}${PROD_SVG_PREFIX_URL}${name}.svg`
