import { createApi } from "@reduxjs/toolkit/query/react"
import { getFetchBaseQuery } from "@shared/utils"

export const subscribeApi = createApi({
  reducerPath: "subscribeApi",

  baseQuery: getFetchBaseQuery(false, "/mailings"),

  endpoints: builder => ({
    postMailingsSubscribe: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: "/subscribe",
        method: "POST",
        body: { email },
      }),
    }),
  }),
})

export const { usePostMailingsSubscribeMutation } = subscribeApi
