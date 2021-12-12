import { Action } from "api/client"

export const getAccount: Action = {
  method: "GET",
  endpoint: "/account",
  config: {
    skipCache: true
  }
}

export const postAccount: Action = {
  method: "POST",
  endpoint: "/account"
}

export const postAccountMePassword: Action = {
  method: "GET",
  endpoint: "/account/me/password"
}

export const postAccountPasswordReset: Action = {
  method: "GET",
  endpoint: "/account/password/reset"
}

export const getAccountMe: Action = {
  method: "GET",
  endpoint: "/account/me"
}

export const putAccountMe: Action = {
  method: "GET",
  endpoint: "/account/me"
}

export const patchAccountMe: Action = {
  method: "GET",
  endpoint: "/account/me"
}

export const deleteAccountMe: Action = {
  method: "GET",
  endpoint: "/account/me"
}

export const postAccountPasswordResetConfirm: Action = {
  method: "GET",
  endpoint: "/account/password/reset/confirm"
}

export const postAccountTokenLogin: Action = {
  method: "GET",
  endpoint: "/account/token/login"
}

export const postAccountTokenLogout: Action = {
  method: "GET",
  endpoint: "/account/token/logout"
}
