import { PROD_IMAGE_BASE_URL, PROD_IMAGE_PREFIX_URL } from '@/constants/config'

export const getGoodJpgUrl = ({ name }: { name: string }): string =>
  `${PROD_IMAGE_BASE_URL}q_auto:good/${PROD_IMAGE_PREFIX_URL}${name}.jpg`
