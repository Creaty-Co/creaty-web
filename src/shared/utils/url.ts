import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const API = process.env.REACT_APP_API_HOST

export function getFetchBaseQuery(url?: string) {
  return fetchBaseQuery({
    baseUrl: API + (url || ""),
    prepareHeaders: (headers) => {
      headers.set("Accept-Language", "en")
      return headers
    }
  })
}