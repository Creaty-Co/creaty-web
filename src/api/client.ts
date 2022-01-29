import { Action as BaseAction, createClient } from "react-fetching-library"

import { cacheProvider } from "./cache"
import { requestInterceptor, responseInterceptor } from "./interceptors"

declare module "react-fetching-library" {
  // https://marcin-piela.github.io/react-fetching-library/#/?id=config-object
  export interface Action<R = any, Ext = any> {
    params?: Record<string, unknown>
  }
}

export interface APIResponseError {
  error: {
    type: "error" | "warning"
    code: string | number
    detail: any // For development
  }
}

interface ActionConfig {
  skipAuth: boolean
  skipCache: boolean
}

export type Action<P = unknown> = BaseAction<P & APIResponseError, Partial<ActionConfig>>

export const ClientAPI = createClient({
  requestInterceptors: [requestInterceptor],
  responseInterceptors: [responseInterceptor],
  cacheProvider,
  fetch: (input, init) => {
    const response = fetch(input, init)
    // Error displaying
    if (process.env.NODE_ENV === "development") {
      response.catch(error => {
        if (error.message.includes("The user aborted a request.")) return
        throw error
      })
    }
    // ...
    return response
  }
})

if (process.env.NODE_ENV === "development") {
  // https://webpack.js.org/guides/dependency-management/#context-module-api
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const importAll = r => r.keys().reduce((a, k) => ({ ...a, ...r(k) }), {})
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  window.ClientAPI = ClientAPI
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  window.ActionsAPI = importAll(require.context("./actions/", true, /\.ts$/, "sync"))
}

export default ClientAPI

