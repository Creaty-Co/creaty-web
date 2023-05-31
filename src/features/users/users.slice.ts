import { RootState } from "@app/store"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ISignUpFormStep1, ISignUpFormStep2, IUserData, IUsersState } from "./users.types"

const initialState: IUsersState = {
  authUserId: null,

  email: null,
  password: null,
  first_name: null,
  last_name: null,

  hasDiscount: false,
  isVerified: false,
  
  isAuth: false
}

export const usersSlice = createSlice({
  initialState,
  name: "users",

  reducers: {
    setAuthUserData: (state, action: PayloadAction<IUserData>) => {
      const { id, email, first_name, last_name, has_discount, is_verified } = action.payload
      state.authUserId = id
      state.email = email
      state.first_name = first_name
      state.last_name = last_name || null
      state.hasDiscount = has_discount
      state.isVerified = is_verified
      state.isAuth = true
    },

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
  },
})

export default usersSlice.reducer
export const { signUpStep1, signUpStep2, setAuthUserData } = usersSlice.actions

export const selectUsers = (state: RootState) => state.users
export const selectIsAuth = createSelector(selectUsers, state => state.isAuth)
export const selectAuthUsersData = createSelector(selectUsers, state => ({
  email: state.email,
  password: state.password,
  first_name: state.first_name,
  last_name: state.last_name,
  hasDiscount: state.hasDiscount,
  isVerified: state.isVerified,
}))
