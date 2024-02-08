import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setTokens } from "@store/auth/auth.slice"
import { RootState } from "@store/store"
import { Mutex } from "async-mutex"
import { setTokens } from "src/store/auth/auth.slice"
import { RootState } from "src/store/store"

const API = process.env.REACT_APP_API_HOST
const mutex = new Mutex()

export const baseQueryWithReauth =
  (authRequired: boolean, url?: string): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =>
  async (args, api, extraOptions: { auth?: boolean }) => {
    const authRequest = authRequired || !!extraOptions?.auth
    const baseQuery = fetchBaseQuery({
      baseUrl: API + (url || ""),
      prepareHeaders: (headers, { getState }) => {
        headers.set("Accept-Language", "en")
        if (!authRequest) return headers
        const token = (getState() as RootState).auth.accessToken
        if (token) headers.set("Authorization", `Bearer ${token}`)
        return headers
      },
    })

    await mutex.waitForUnlock()

    const { refreshToken } = (api.getState() as RootState).auth
    let result = await baseQuery(args, api, extraOptions)

    if (authRequest && result.error && result.error.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire()
        try {
          const refreshResult = await baseQuery(
            { url: "token/refresh/", method: "POST", body: { refresh: refreshToken } },
            api,
            extraOptions
          )

          if (refreshResult.data) {
            const { access, refresh } = refreshResult.data as { access: string; refresh: string }
            const tokens = { accessToken: access, refreshToken: refresh }
            api.dispatch(setTokens(tokens))
            result = await baseQuery(args, api, extraOptions)
          } else {
            api.dispatch({ type: "auth/logOut" })
          }
        } finally {
          release()
        }
      } else {
        await mutex.waitForUnlock()
        result = await baseQuery(args, api, extraOptions)
      }
    }
    return result
  }
