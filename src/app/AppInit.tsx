import { useGetTagsTopicsQuery } from "@entities/category/category.api"
import { useLazyGetMeQuery } from "@features/auth/auth.api"
import { resetAuthState, setTokens } from "@features/auth/auth.slice"
import { useGetPagesLinksDocumentsQuery } from "@shared/api"
import { parseJwt } from "@shared/utils/token"
import { memo, useCallback, useEffect, useRef } from "react"
import ReactGA from "react-ga4"
import { useSearchParams } from "react-router-dom"

import initSentry from "./providers/sentry"
import { useAppDispatch } from "./store"

export const AppInit = memo(function AppInit() {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [getMe] = useLazyGetMeQuery()

  useGetPagesLinksDocumentsQuery()
  useGetTagsTopicsQuery({ page: 1, page_size: 25 })

  const appInited = useRef<boolean>(false)

  const setTokensFromUrlSucceeded = useCallback(() => {
    const urlAccessToken = searchParams.get("access")
    const urlRefreshToken = searchParams.get("refresh")
    if (!urlRefreshToken || !urlAccessToken) return false
    searchParams.delete("refresh")
    searchParams.delete("access")
    setSearchParams(searchParams)
    dispatch(setTokens({ accessToken: urlAccessToken, refreshToken: urlRefreshToken }))
    getMe("")
    return true
  }, [])

  const setTokensFromLS = useCallback(() => {
    const lSAccessToken = localStorage.getItem("accessToken")
    const lSRefreshToken = localStorage.getItem("refreshToken")
    if (!lSAccessToken || !lSRefreshToken) return
    const JWTBody = parseJwt(lSRefreshToken)
    const timestampNow = Math.round(Date.now() / 1000)
    if (JWTBody.exp <= timestampNow) {
      dispatch(resetAuthState())
      return
    }
    dispatch(setTokens({ accessToken: lSAccessToken, refreshToken: lSRefreshToken }))
    getMe("")
  }, [])

  useEffect(() => {
    if (appInited.current) return
    if (setTokensFromUrlSucceeded()) return
    setTokensFromLS()
    appInited.current = true
  }, [])

  return null
})

if (process.env.REACT_APP_API_GA) {
  ReactGA.initialize(process.env.REACT_APP_API_GA)
} else {
  const message = ".env variable `REACT_APP_API_GA` is empty, GA will not be initialized."
  console.warn(message)
}

if (process.env.NODE_ENV === "production") initSentry()
