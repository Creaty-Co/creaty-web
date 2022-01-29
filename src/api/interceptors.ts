import { QueryResponse } from "react-fetching-library"
import { toast } from "react-toastify"
import { createQuery } from "utils/common"

import { Action, APIResponseError } from "./client"


type Response<T = unknown> = QueryResponse<T & APIResponseError>

export function requestInterceptor() {
  return async (action: Action) => {
    const endpoint = process.env.REACT_APP_BASE_URL + action.endpoint + "/"
    const query = createQuery(action.params)

    return {
      ...action,
      endpoint: endpoint + (query && "?" + query),
      headers: {
        Authorization: !action.config?.skipAuth && localStorage.getItem("token") || ""
      }
    }
  }
}
export function responseInterceptor() {
  return async (_action: Action, response: Response) => {
    if (response.payload == null && response.status !== 204) {
      return {
        ...response,
        error: true
      }
    }

    if (response.payload?.error) {
      return responseErrorHandling(response)
    }

    return response
  }
}

function responseErrorHandling(response: Response) {
  if (response.payload == null) {
    return { ...response, error: true }
  }

  toast.error(response.payload.error.code)
  if (process.env.NODE_ENV === "development") {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const field of Object.values(response.payload?.error.detail) as any) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        for (const fieldError of Object.values(field) as any) {
          toast.error(fieldError.message)
        }
      }
    } catch (error) {
      if (response.payload.error.detail != null) {
        toast.error(JSON.stringify(response.payload.error.detail))
      } else {
        toast.error(JSON.stringify(response.payload.error))
      }

      toast.info(JSON.stringify(error))
    }
  }

  return { ...response, error: true }
}
