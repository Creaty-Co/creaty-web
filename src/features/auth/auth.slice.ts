import { history } from "@app/App"
import { RootState } from "@app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { parseJwt } from "@shared/utils/token"

import { IAuthState, ITokens } from "./auth.types"

const initialState: IAuthState = {
  accessToken: null,
  refreshToken: null,
  expAt: null,
  isAuth: false,
}

export const authSlice = createSlice({
  initialState,
  name: "auth",

  reducers: {
    setTokens: (state, action: PayloadAction<ITokens>) => {
      const { accessToken, refreshToken } = action.payload
      try {
        const JWTBody = parseJwt(accessToken)
        console.log("JWTBody: ", JWTBody)
        state.expAt = JWTBody.exp

        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("refreshToken", refreshToken)
        localStorage.setItem("expAt", JWTBody.exp)

        state.accessToken = accessToken
        state.refreshToken = refreshToken
        state.isAuth = true
      } catch {
        state.isAuth = false
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
