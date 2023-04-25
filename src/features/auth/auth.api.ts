import { createApi } from "@reduxjs/toolkit/query/react"
import { getFetchBaseQuery } from "@shared/utils"

import { authorize, setUser } from "./auth.slice"
import { IAuthSignIn, IAuthSignUp, IAuthVerifyEmail,IAuthVerifyEmailResponse, IJWTAccess, IUser } from "./auth.types"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: getFetchBaseQuery(),

  endpoints: (builder) => ({
    signupUser: builder.mutation<IUser, IAuthSignUp>({
      query: (data) => ({
        url: "sign-up",
        method: "POST",
        body: data,
      }),
    }),

    signInUser: builder.mutation<IJWTAccess, IAuthSignIn>({
      query: (data) => ({
        url: "sign-in",
        method: "POST",
        body: data,
        credentials: "include",
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(authApi.endpoints.getUserDetails.initiate())
        } catch (error) { console.log(error) }
      },
    }),

    getUserDetails: builder.query<IUser, void>({
      query: () => ({
        url: "user",
        credentials: "include",
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled
          dispatch(setUser(user))
          dispatch(authorize(true))
        } catch (error) { console.log(error) }
      },
    }),

    verifyEmail: builder.mutation<IAuthVerifyEmailResponse,IAuthVerifyEmail>({
      query: ({ code }) => ({
        url: `verify-email/${code}`,
        method: "GET",
      }),
    }),

    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "logout",
        credentials: "include",
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(authorize(false))
          dispatch(setUser(undefined))
        } catch (error) { console.log(error) }
      }
    }),
  }),
})

export const {
  useLogoutUserMutation,
  useVerifyEmailMutation,
  useSignupUserMutation,
  useSignInUserMutation,
  useGetUserDetailsQuery,
} = authApi
