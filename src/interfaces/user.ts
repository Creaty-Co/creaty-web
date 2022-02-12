export type User = UserSigned | UserAnonymous

export interface UserSigned {
  auth: true
  type: UserType
}

export interface UserAnonymous {
  auth: false
  type: UserType
}

export enum UserType {
  banned, default, admin
}
