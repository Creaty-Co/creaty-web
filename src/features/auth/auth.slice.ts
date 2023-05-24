import { RootState } from "@app/store"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IAuthState, ISignUpData, SignUpStepT } from "./auth.types"

const initialState: IAuthState = {
  email: null,
  password: null,
  first_name: null,
  last_name: null,
  signUpStep: null,

  token: null,
  isAuth: false,
}

export const authSlice = createSlice({
  initialState,
  name: "auth",

  reducers: {
    signUpStep1: (state, action: PayloadAction<ISignUpData>) => {
      const { email, password } = action.payload
      state.email = email
      state.password = password
    },

    signUpStep2: (state, action: PayloadAction<ISignUpData>) => {
      const { first_name, last_name } = action.payload
      state.first_name = first_name
      state.last_name = last_name
    },

    setSignUpStep: (state, action: PayloadAction<SignUpStepT>) => {
      state.signUpStep = action.payload
    },

    abortSignUp: state => {
      state.signUpStep = null
      state.email = null
      state.password = null
      state.first_name = null
      state.last_name = null
    },

    signOut: state => {
      state.email = null
      state.password = null
      state.first_name = null
      state.last_name = null
      state.isAuth = false
    },
  },
})
export default authSlice.reducer
export const { signOut, signUpStep1, signUpStep2, setSignUpStep, abortSignUp } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth
export const selectAuthSignUpStep = (state: RootState) => state.auth.signUpStep
export const selectAuthData = createSelector(selectAuth, state => ({
  email: state.email,
  password: state.password,
  first_name: state.first_name,
  last_name: state.last_name,
}))
