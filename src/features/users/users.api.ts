import { createApi } from "@reduxjs/toolkit/query/react"
import { getFetchBaseQuery } from "@shared/utils"

import { setAuthUserData } from "./users.slice"

export const usersApi = createApi({
  reducerPath: "usersApi",

  baseQuery: getFetchBaseQuery(true),

  endpoints: builder => ({
    getMe: builder.query({
      query: () => "users/me/",
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled
          dispatch(setAuthUserData(data.data))
        } catch (error) {
          throw Error("error: users/me/")
        }
      },
    }),
  }),
})

export const { useLazyGetMeQuery } = usersApi
