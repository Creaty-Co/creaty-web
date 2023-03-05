import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const subscribeApi = createApi({
  reducerPath: "subscribeApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/mailings"
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