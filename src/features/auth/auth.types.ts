export type AuthFormTypes = "sign-in" | "sign-up"

export interface IUser {
  email: string
  username?: string
  fullname?: string
  avatar?: string
  verified?: boolean
} 

export type RoleType = "admin" | "mentee" | "mentor"

export interface IAuthSignUp {
  email: string
  password: string
}

export interface IAuthSignIn {
  email: string
  password: string
}

export interface IJWTAccess {
  access_token: string
  status: string
}

export interface IAuthVerifyEmailResponse {
  status: string
}

export interface IAuthVerifyEmail {
  code: string
}