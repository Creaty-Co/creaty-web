import { categoryApi } from "@entities/category/category.api"
import { setTokens } from "@features/auth/auth.slice"
import { useLazyGetMeQuery } from "@features/users/users.api"
import { skipToken } from "@reduxjs/toolkit/dist/query"
import { useEffect } from "react"
import ReactGA from "react-ga4"
import { useSearchParams } from "react-router-dom"

import initSentry from "./providers/sentry"
import { useAppDispatch } from "./store"

export const AppInit = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [getMe] = useLazyGetMeQuery()

  useEffect(() => {
    dispatch(categoryApi.endpoints.getTagsTopics.initiate({ page: 1, page_size: 25 }))

    const urlAccessToken = searchParams.get("access")
    const urlRefreshToken = searchParams.get("refresh")
    if (urlRefreshToken && urlAccessToken) {
      searchParams.delete("refresh")
      searchParams.delete("access")
      setSearchParams(searchParams)
      dispatch(setTokens({ accessToken: urlAccessToken, refreshToken: urlRefreshToken }))
      getMe(skipToken)
      return
    }
    const lSAccessToken = localStorage.getItem("accessToken")
    const lSRefreshToken = localStorage.getItem("refreshToken")
    if (lSAccessToken && lSRefreshToken) {
      dispatch(setTokens({ accessToken: lSAccessToken, refreshToken: lSRefreshToken }))
      getMe(skipToken)
      return
    }
  }, [])

  return null
}

if (process.env.REACT_APP_API_GA) {
  ReactGA.initialize(process.env.REACT_APP_API_GA)
} else {
  const message = ".env variable `REACT_APP_API_GA` is empty, GA will not be initialized."
  console.warn(message)
}

if (process.env.NODE_ENV === "production") initSentry()
