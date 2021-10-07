import { PROD_IMAGE_BASE_URL, PROD_IMAGE_PREFIX_URL } from '@/constants/config'

export const getImgUrl = ({
  ext,
  name,
}: {
  ext: string
  name: string
}): string => `${PROD_IMAGE_BASE_URL}${PROD_IMAGE_PREFIX_URL}${name}.${ext}`
