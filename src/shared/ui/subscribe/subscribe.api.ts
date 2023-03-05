import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getBaseURL } from "@shared/utils"

export const subscribeApi = createApi({
  reducerPath: "subscribeApi",

  baseQuery: fetchBaseQuery({
    baseUrl: getBaseURL() + "/mailings"
  }),

  endpoints: builder => ({
    postMailingsSubscribe: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: "/subscribe",
        method: "POST",
        body: { email }
      })
    })
  })
})

export const {
  usePostMailingsSubscribeMutation,
} = subscribeApi