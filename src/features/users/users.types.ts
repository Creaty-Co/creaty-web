export interface IUserData {
  id: string
  email: string
  first_name: string
  last_name?: string
  has_discount: boolean
  is_verified: boolean
}

export interface ISignUpFormStep1 {
  email: string
  password: string
}
export interface ISignUpFormStep2 {
  first_name: string
  last_name?: string
}

export interface IUsersState {
  authUserId: string | null
  email: string | null
  password: string | null
  first_name: string | null
  last_name: string | null
  hasDiscount: boolean
  isVerified: boolean
  isAuth: boolean
}
