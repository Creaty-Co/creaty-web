import { createCache, QueryResponse } from "react-fetching-library"

import { Action } from "./client"

const cacheTime = Number(process.env.REACT_APP_API_CACHE_TIME)

export const cacheProvider = createCache<QueryResponse<Action>>(
  (action: Action) => {
    if (action.config?.skipCache) return false
    if (process.env.NODE_ENV === "development") return false
    if (!process.env.REACT_APP_API_CACHE) return false

    return action.method === "GET"
  },
  response => {
    return Date.now() - response.timestamp < cacheTime
  }
)
