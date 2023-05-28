import { RootState } from "@app/store"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IAuthState, ISignUpFormStep1, ISignUpFormStep2, ITokens, IUserData } from "./auth.types"

const initialState: IAuthState = {
  authUserId: null,

  email: null,
  password: null,
  first_name: null,
  last_name: null,

  discount: null,
  verified: null,

  accessToken: null,
  refreshToken: null,
  isAuth: false,
}

export const authSlice = createSlice({
  initialState,
  name: "auth",

  reducers: {
    signUpStep1: (state, action: PayloadAction<ISignUpFormStep1>) => {
      const { email, password } = action.payload
      state.email = email
      state.password = password
    },

    signUpStep2: (state, action: PayloadAction<ISignUpFormStep2>) => {
      const { first_name, last_name } = action.payload
      state.first_name = first_name
      state.last_name = last_name || null
    },

    signOut: state => {
      state.email = null
      state.password = null
      state.first_name = null
      state.last_name = null
      state.isAuth = false
    },

    setUserData: (state, action: PayloadAction<IUserData>) => {
      const { id, email, first_name, last_name, discount, verified } = action.payload
      state.authUserId = id
      state.email = email
      state.first_name = first_name
      state.last_name = last_name || null
      state.discount = discount
      state.verified = verified
    },

    setTokens: (state, action: PayloadAction<ITokens>) => {
      const { authUserId, accessToken, refreshToken } = action.payload
      state.authUserId = authUserId
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.isAuth = true
    },
  },
})

export default authSlice.reducer
export const { signOut, signUpStep1, signUpStep2, setUserData, setTokens } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth
export const selectAuthData = createSelector(selectAuth, state => ({
  email: state.email,
  password: state.password,
  first_name: state.first_name,
  last_name: state.last_name,
}))
