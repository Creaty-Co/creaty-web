import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "@shared/utils"

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: baseQueryWithReauth(false),

  endpoints: builder => ({
    signUpEmail: builder.mutation({
      query: body => ({ url: `/users/register/`, method: "POST", body }),
    }),
    loginEmail: builder.mutation({
      query: body => ({ url: `/users/token/`, method: "POST", body }),
    }),
    verifyEmail: builder.mutation({
      query: body => ({ url: `/users/register/verify/`, method: "PUT", body }),
    }),
    refreshToken: builder.query({
      query: () => ({ url: "users/token/refresh/", method: "POST" }),
    }),
    resendPassword: builder.mutation({
      query: body => ({ url: `/users/password/reset/`, method: "POST", body }),
    }),
    resetPassword: builder.mutation({
      query: body => ({ url: `/users/password/reset/`, method: "PUT", body }),
    }),
  }),
})

export const {
  useSignUpEmailMutation,
  useLoginEmailMutation,
  useVerifyEmailMutation,
  useLazyRefreshTokenQuery,
  useResendPasswordMutation,
  useResetPasswordMutation,
} = authApi
