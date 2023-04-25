import { RootState } from "@app/store"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IAuthSignUp, IUser, RoleType } from "./auth.types"

export interface IAuthState {
  user?: IUser
  roles?: RoleType
  isAuth: boolean
}

const initialState: IAuthState = {
  isAuth: false
}

export const authSlice = createSlice({
  initialState,
  name: "auth",
  
  reducers: {
    /* Registration */
    signUp: (state, action: PayloadAction<IAuthSignUp>) => {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const user = users.find((user: IUser) => user.email === action.payload.email)

      if (user) localStorage.setItem("users", JSON.stringify([...users.filter((u: IUser) => u.email !== user.email), action.payload]))
      else localStorage.setItem("users", JSON.stringify([...users, action.payload]))

      state.user = {
        verified: false,
        email: action.payload.email
      }
    },

    signIn: (state, action: PayloadAction<IAuthSignUp>) => {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const user = users.find((user: IUser) => user.email === action.payload.email)

      if (user) {
        state.isAuth = true
        state.roles = "mentee"
        state.user = {
          verified: user.verified,
          email: user.email
        }
      }
    },

    setUser: (state, action: PayloadAction<IUser|undefined>) => {
      if (action.payload === undefined) {
        state = {
          roles: undefined,
          user: undefined,
          isAuth: false
        }
      } else {
        state = {
          user: action.payload,
          roles: "mentee",
          isAuth: true
        }
      }
    },

    setRoles: (state, action: PayloadAction<RoleType|undefined>) => {
      state.roles = action.payload
    },

    authorize: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    }
  },
})

export default authSlice.reducer
export const { setUser, authorize, setRoles, signUp, signIn } = authSlice.actions

export const selectAuthSlice = (state: RootState) => state.auth
export const selectAuthRoles = createSelector(selectAuthSlice, (state) => state.roles)
export const selectAuthUser = createSelector(selectAuthSlice, (state) => state.user)