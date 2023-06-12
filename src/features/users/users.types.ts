export interface IUserData {
  id: string
  email: string
  first_name: string
  last_name?: string
  has_discount: boolean
  is_verified: boolean
  is_staff: boolean
}

export interface ISignUpFormStep1 {
  email: string
  password: string
}
export interface ISignUpFormStep2 {
  firstName: string
  lastName?: string
}

export interface IUsersState {
  authUserId: string | null

  email: string | null
  password: string | null
  firstName: string | null
  lastName: string | null

  hasDiscount: boolean
  isVerified: boolean
  isAdmin: boolean

  isAuth: boolean | null
  isAuthLoading: boolean
}
