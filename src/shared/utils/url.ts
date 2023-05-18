import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export function getBaseURL() {
  const API_URL = process.env.REACT_APP_API_HOST
  if (API_URL == null) return ""

  const url = new URL(API_URL)
  const protocol = "https://"

  const uri = `${protocol}${url.host}`

  console.log("uri", uri)

  return uri
}

export function getFetchBaseQuery(url?: string) {
  return fetchBaseQuery({
    baseUrl: getBaseURL() + (url || ""),
    prepareHeaders: (headers) => {
      headers.set("Accept-Language", "en")
      return headers
    }
  })
}