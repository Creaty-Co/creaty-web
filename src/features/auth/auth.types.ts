export type SignUpStepT = 1 | 2 | 3 | 4 | null
export interface IAuthState extends ISignUpData {
  isAuth: boolean
  token: string | null
  signUpStep: SignUpStepT
}

export interface ISignUpData {
  email?: string | null
  password?: string | null
  first_name?: string | null
  last_name?: string | null
}
