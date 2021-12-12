import { Action as BaseAction, createClient, QueryResponse } from "react-fetching-library"

import { cacheProvider } from "./cache"

interface APIResponseError {
  error: {
    type: "error" | "warning"
    code: string | number
  }
}

interface ActionConfig {
  skipAuth: boolean
  skipCache: boolean
}

export type Action<P = unknown> = BaseAction<P & APIResponseError, Partial<ActionConfig>>

function requestInterceptor() {
  return async (action: Action) => {
    return {
      ...action,
      headers: {
        "content-type": "application/json",
        // Authorization
      }
    }
  }
}
function responseInterceptor() {
  return async (_action: BaseAction, response: QueryResponse) => {
    if (process.env.NODE_ENV === "development") {
      // Show debug messages
      if (response.errorObject instanceof Error) {
        // response.errorObject.message
      }
    }
    return response
  }
}

export const ClientAPI = createClient({
  requestInterceptors: [requestInterceptor],
  responseInterceptors: [responseInterceptor],
  cacheProvider
})

export default ClientAPI

