import { categoryApi } from "@entities/category/category.api"
import ReactGA from "react-ga4"

import initSentry from "./providers/sentry"
import { useAppDispatch } from "./store"

export const AppInit = () => {
  const dispatch = useAppDispatch()
  dispatch(categoryApi.endpoints.getTagsTopics.initiate({ page: 1, page_size: 25 }))
  return null
}

if (process.env.REACT_APP_API_GA) {
  ReactGA.initialize(process.env.REACT_APP_API_GA)
} else {
  const message = ".env variable `REACT_APP_API_GA` is empty, GA will not be initialized."
  alert(message)
  console.warn(message)
}

if (process.env.NODE_ENV === "production") initSentry()