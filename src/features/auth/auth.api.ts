import { createApi } from "@reduxjs/toolkit/query/react"
import { getFetchBaseQuery } from "@shared/utils"

export const AuthApi = createApi({
  reducerPath: "authApi",

  baseQuery: getFetchBaseQuery(),

  endpoints: builder => ({
    signUpEmail: builder.mutation({
      query: body => ({ url: `/users/register/`, method: "POST", body }),
    }),
    loginEmail: builder.mutation({
      query: body => ({ url: `/users/token/`, method: "POST", body }),
    }),
    refreshToken: builder.query({
      query: () => ({ url: "users/token/refresh/", method: "POST" }),
    }),
    getUserData: builder.query({
      query: () => "users/me/",
    }),
    resendPassword: builder.mutation({
      query: body => ({ url: `/users/register/resend/`, method: "POST", body }),
    }),
    resetPassword: builder.mutation({
      query: body => ({ url: `/users/password`, method: "PUT", body }),
    }),
  }),
})

export const {
  useSignUpEmailMutation,
  useLoginEmailMutation,
  useLazyRefreshTokenQuery,
  useGetUserDataQuery,
  useResendPasswordMutation,
  useResetPasswordMutation,
} = AuthApi
