import { RootState } from "@app/store"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IAuthState, ISignUpFormStep1, ISignUpFormStep2, ITokens, IUserData } from "./auth.types"

const initialState: IAuthState = {
  authUserId: null,
  email: null,
  password: null,
  firstName: null,
  lastName: null,
  photo: null,

  hasDiscount: false,
  isVerified: false,
  isAdmin: false,
  isMentor: false,

  isAuthLoading: null,
  accessToken: null,
  refreshToken: null,
}

export const authSlice = createSlice({
  initialState,
  name: "auth",

  reducers: {
    setTokens: (state, action: PayloadAction<ITokens>) => {
      const { accessToken, refreshToken } = action.payload
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      state.accessToken = accessToken
      state.refreshToken = refreshToken
    },
    setAuthUserData: (state, action: PayloadAction<IUserData>) => {
      const { id, email, first_name, last_name, has_discount, is_verified, is_staff, is_mentor, photo } = action.payload
      state.authUserId = id
      state.email = email
      state.firstName = first_name
      state.lastName = last_name || null
      state.photo = photo || null
      state.hasDiscount = has_discount
      state.isVerified = is_verified
      state.isAdmin = is_staff
      state.isMentor = is_mentor
    },
    signUpStep1: (state, action: PayloadAction<ISignUpFormStep1>) => {
      const { email, password } = action.payload
      state.email = email
      state.password = password
    },
    signUpStep2: (state, action: PayloadAction<ISignUpFormStep2>) => {
      const { firstName, lastName } = action.payload
      state.firstName = firstName
      state.lastName = lastName || null
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isAuthLoading = action.payload
    },
    resetAuthState: () => {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      return initialState
    },
  },
})

export default authSlice.reducer
export const { setTokens, resetAuthState, signUpStep1, signUpStep2, setAuthUserData, setAuthLoading } =
  authSlice.actions

export const authS = (state: RootState) => state.auth
export const authStartedS = createSelector(authS, state => state.isAuthLoading === true && !state.authUserId)
export const authPassedS = createSelector(authS, state => state.isAuthLoading === false && !!state.authUserId)
export const accessToken = createSelector(authS, state => state.accessToken)
export const isAdminS = createSelector(authS, state => state.isAdmin && authPassedS)
export const isMentorS = createSelector(authS, state => state.isMentor && authPassedS)

export const authUserDataS = createSelector(authS, state => ({
  authUserId: state.authUserId,
  email: state.email,
  password: state.password,
  firstName: state.firstName,
  lastName: state.lastName,
  photo: state.photo,
  hasDiscount: state.hasDiscount,
  isVerified: state.isVerified,
  isAdmin: state.isAdmin,
  isMentor: state.isMentor,
}))
