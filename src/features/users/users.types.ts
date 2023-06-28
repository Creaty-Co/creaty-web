export interface IUserData {
  id: string | null
  email: string | null
  first_name: string | null
  last_name?: string | null
  has_discount: boolean
  is_verified: boolean
  is_staff: boolean
  is_mentor: boolean
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
  isMentor: boolean

  isAuth: boolean | null
  isAuthLoading: boolean
}
