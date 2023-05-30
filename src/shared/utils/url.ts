import { RootState } from "@app/store"
import { logOut } from "@features/auth/auth.slice"
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const API = process.env.REACT_APP_API_HOST

export function getFetchBaseQuery(authRequired: boolean, url?: string) {
  const baseQuery = fetchBaseQuery({
    baseUrl: API + (url || ""),
    prepareHeaders: (headers, { getState }) => {
      headers.set("Accept-Language", "en")
      if (!authRequired) return headers
      const token = (getState() as RootState).auth.accessToken
      if (token) headers.set("Authorization", `Bearer ${token}`)
      return headers
    },
  })
  
  return baseQuery
  // if (!authRequired)  return baseQuery

  // const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  //   args,
  //   api,
  //   extraOptions
  // ) => {
  //   let result = await baseQuery(args, api, extraOptions)
  //   if (result.error && result.error.status === 401) {
  //     // try to get a new token
  //     const refreshResult = await baseQuery("/refreshToken", api, extraOptions)
  //     if (refreshResult.data) {
  //       // store the new token
  //       api.dispatch(tokenReceived(refreshResult.data))
  //       // retry the initial query
  //       result = await baseQuery(args, api, extraOptions)
  //     } else {
  //       api.dispatch(logOut())
  //     }
  //   }
  //   return result
  // }
}
