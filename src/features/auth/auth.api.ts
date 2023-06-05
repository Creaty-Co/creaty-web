import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "@shared/utils"

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: await baseQueryWithReauth(false),

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
  useLazyRefreshTokenQuery,
  useResendPasswordMutation,
  useResetPasswordMutation,
} = authApi
