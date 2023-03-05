import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"

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

export interface IConfigurationConnection {
  baseUrl: string
  prepareHeaders: (headers: Headers) => Headers
}

export const configurationConnection: IConfigurationConnection = {
  baseUrl: getBaseURL(),
  prepareHeaders: (headers) => {
    headers.set("Accept-Language", "en")
    return headers
  }
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