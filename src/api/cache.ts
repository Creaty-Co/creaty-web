import { createCache, QueryResponse } from "react-fetching-library"

import { Action } from "./client"

const cacheTime = 2.5 * 60 * 1000

export const cacheProvider = createCache<QueryResponse<Action>>(
  (action: Action) => {
    if (action.config?.skipCache) return false
    if (process.env.NODE_ENV === "development") return false

    return action.method === "GET"
  },
  response => {
    return Date.now() - response.timestamp < cacheTime
  }
)
