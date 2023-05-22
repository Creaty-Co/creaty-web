export interface IAuthState extends ISignUpData {
  isAuth: boolean 
}

export interface ISignUpData {
  email?: string | null
  password?: string | null
  first_name?: string | null
  last_name?: string | null
}
