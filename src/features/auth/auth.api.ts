import { createApi } from "@reduxjs/toolkit/query/react"
import { getFetchBaseQuery } from "@shared/utils"

export const AuthApi = createApi({
  reducerPath: "authApi",

  baseQuery: getFetchBaseQuery(),

  endpoints: builder => ({
    signUpEmail: builder.mutation({
      query: autData => ({
        url: `/users/register`,
        method: "POST",
        body: { ...autData },
      }),
    }),
  }),
})

export const { useSignUpEmailMutation } = AuthApi
