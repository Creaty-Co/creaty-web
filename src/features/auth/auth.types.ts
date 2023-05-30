export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface IAuthState {
  accessToken: string | null
  refreshToken: string | null
  expAt: number | null
  isAuth: boolean
}
