export function getBaseURL() {
  const API_URL = process.env.REACT_APP_API_HOST
  if (API_URL == null) return ""

  /*
  For the best times
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https"
  */
  const url = new URL(API_URL)
  const protocol = "https://"
  // const protocol = url.protocol + "//"

  const uri = `${protocol}${url.host}`

  console.log("uri", uri)

  return uri
}