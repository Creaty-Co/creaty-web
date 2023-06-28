import { RootState } from "@app/store"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ISignUpFormStep1, ISignUpFormStep2, IUserData, IUsersState } from "./users.types"

const initialState: IUsersState = {
  authUserId: null,

  email: null,
  password: null,
  firstName: null,
  lastName: null,

  hasDiscount: false,
  isVerified: false,
  isAdmin: false,
  isMentor: false,

  isAuth: null,
  isAuthLoading: false,
}

export const usersSlice = createSlice({
  initialState,
  name: "users",

  reducers: {
    setAuthUserData: (state, action: PayloadAction<IUserData>) => {
      const { id, email, first_name, last_name, has_discount, is_verified, is_staff, is_mentor, isAuth } =
        action.payload
      state.authUserId = id
      state.email = email
      state.firstName = first_name
      state.lastName = last_name || null
      state.hasDiscount = has_discount
      state.isVerified = is_verified
      state.isAdmin = is_staff
      state.isMentor = is_mentor
      state.isAuth = typeof isAuth === "undefined" ? true : isAuth
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
  },
})

export default usersSlice.reducer
export const { signUpStep1, signUpStep2, setAuthUserData, setAuthLoading } = usersSlice.actions

export const selectUsers = (state: RootState) => state.users
export const selectIsAuth = createSelector(selectUsers, state => state.isAuth)
export const selectIsAuthLoading = createSelector(selectUsers, state => state.isAuthLoading)

export const selectAuthUsersData = createSelector(selectUsers, state => ({
  email: state.email,
  password: state.password,
  firstName: state.firstName,
  lastName: state.lastName,
  hasDiscount: state.hasDiscount,
  isVerified: state.isVerified,
  isAdmin: state.isAdmin,
  isMentor: state.isMentor,
}))
