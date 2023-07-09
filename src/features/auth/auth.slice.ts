import { RootState } from "@app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IAuthState, ITokens } from "./auth.types"

const initialState: IAuthState = {
  accessToken: null,
  refreshToken: null,
}

export const authSlice = createSlice({
  initialState,
  name: "auth",

  reducers: {
    setTokens: (state, action: PayloadAction<ITokens>) => {
      const { accessToken, refreshToken } = action.payload
      try {
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("refreshToken", refreshToken)

        state.accessToken = accessToken
        state.refreshToken = refreshToken
      } catch {
        state.accessToken = null
        state.refreshToken = null
      }
    },
    removeTokens: state => {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")

      state.accessToken = null
      state.refreshToken = null
    },
  },
})

export default authSlice.reducer
export const { setTokens, removeTokens } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth
