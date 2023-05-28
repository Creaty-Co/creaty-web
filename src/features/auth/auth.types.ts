export interface ISignUpFormStep1 {
  email: string
  password: string
}
export interface ISignUpFormStep2 {
  first_name: string
  last_name?: string
}
export interface IUserData {
  id: string
  email: string
  first_name: string
  last_name?: string
  discount: boolean
  verified: boolean
}
export interface ITokens {
  authUserId: string | null
  accessToken: string
  refreshToken: string
}

export interface IAuthState {
  authUserId: string | null

  email: string | null
  password: string | null
  first_name: string | null
  last_name: string | null

  discount: boolean | null
  verified: boolean | null

  accessToken: string | null
  refreshToken: string | null
  isAuth: boolean
}
