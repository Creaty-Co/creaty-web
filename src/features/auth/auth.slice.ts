import { history } from "@app/App"
import { RootState } from "@app/store"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { parseJwt } from "@shared/utils/token"

import { IAuthState, ITokens } from "./auth.types"

const initialState: IAuthState = {
  accessToken: null,
  refreshToken: null,
  expAt: null,
}

export const authSlice = createSlice({
  initialState,
  name: "auth",

  reducers: {
    setTokens: (state, action: PayloadAction<ITokens>) => {
      const { accessToken, refreshToken } = action.payload
      try {
        const JWTBody = parseJwt(accessToken)
        state.expAt = JWTBody.exp

        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("refreshToken", refreshToken)
        localStorage.setItem("expAt", JWTBody.exp)

        state.accessToken = accessToken
        state.refreshToken = refreshToken
      } catch {
        state.accessToken = null
        state.refreshToken = null
        state.expAt = null
      }
    },

    logOut: () => {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("expAt")
      history.push("/")
    },
  },
})

export default authSlice.reducer
export const { logOut, setTokens } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth
export const selectExpAt = createSelector(selectAuth, state => state.expAt)