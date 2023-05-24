import { createApi } from "@reduxjs/toolkit/query/react"
import { getFetchBaseQuery } from "@shared/utils"

export const AuthApi = createApi({
  reducerPath: "authApi",

  baseQuery: getFetchBaseQuery(),

  endpoints: builder => ({
    signUpEmail: builder.mutation({
      query: body => ({
        url: `/users/register/`,
        method: "POST",
        body,
      }),
    }),
    signUpGoogle: builder.query({
      query: () => "users/register/social/google/",
    }),
  }),
})

export const { useSignUpEmailMutation, useLazySignUpGoogleQuery } = AuthApi
