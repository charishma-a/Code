export const pxToRem = ({
  base = 16,
  px = 16,
}: {
  base?: number
  px: number
}): string => {
  let remSize = px / base
  if (isNaN(remSize)) {
    remSize = 1
  }
  return `${remSize.toFixed(2)}rem`
}
