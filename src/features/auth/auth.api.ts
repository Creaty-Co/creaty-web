import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "@shared/utils"

import { setAuthLoading, setAuthUserData } from "./auth.slice"
import { IUserData } from "./auth.types"

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: baseQueryWithReauth(false, "/users/"),

  endpoints: builder => ({
    signUpEmail: builder.mutation({
      query: body => ({ url: `register/`, method: "POST", body }),
    }),
    loginEmail: builder.mutation({
      query: body => ({ url: `token/`, method: "POST", body }),
    }),
    verifyEmail: builder.mutation({
      query: body => ({ url: `register/`, method: "PUT", body }),
    }),
    resendVerifyEmail: builder.mutation({
      query: body => ({ url: `register/resend/`, method: "POST", body }),
    }),
    refreshToken: builder.query({
      query: () => ({ url: "token/refresh/", method: "POST" }),
    }),
    resendPassword: builder.mutation({
      query: body => ({ url: `password/reset/`, method: "POST", body }),
    }),
    resetPassword: builder.mutation({
      query: body => ({ url: `password/reset/`, method: "PUT", body }),
    }),
    getMe: builder.query({
      query: () => ({ url: "me/", auth: true }),
      extraOptions: { auth: true },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          dispatch(setAuthLoading(true))
          const { data } = await queryFulfilled
          dispatch(setAuthUserData(data as IUserData))
        } catch (error) {
          throw Error("error: users/me/")
        } finally {
          dispatch(setAuthLoading(false))
        }
      },
    }),
  }),
})

export const {
  useSignUpEmailMutation,
  useLoginEmailMutation,
  useVerifyEmailMutation,
  useResendVerifyEmailMutation,
  useLazyRefreshTokenQuery,
  useResendPasswordMutation,
  useResetPasswordMutation,
  useLazyGetMeQuery,
} = authApi
