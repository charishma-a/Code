export const genProjectPageUrl = ({
  isWithReferred,
  profileId,
  projectSlug,
}: {
  profileId: string
  projectSlug: string
  isWithReferred?: boolean
}): string => {
  let referredQuery = ''
  if (isWithReferred) {
    referredQuery += `?referredId=${profileId}`
  }
  return `/projects/${projectSlug}${referredQuery}`
}
