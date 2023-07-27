export const extractUuid = (url, endpoint) => {
  const regex = new RegExp(`/${endpoint}/([a-fA-F0-9-]+)`)
  const matchResult = url.pathname.match(regex)
  return matchResult[1]
}