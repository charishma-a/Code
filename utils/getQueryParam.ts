export function getQueryParam(url: string, param: string): string {
  // Expects a raw URL
  param = param.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
  const regexS = '[\\?&]' + param + '=([^&#]*)',
    regex = new RegExp(regexS),
    results = regex.exec(url)
  if (
    results === null ||
    (results && results[1].length && typeof results[1] !== 'string')
  ) {
    return ''
  } else {
    return decodeURIComponent(results[1]).replace(/\\W/gi, ' ')
  }
}
