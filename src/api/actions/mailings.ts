import { Action } from "api/client"

export const postMailingsSubscribe = (email: string): Action => ({
  method: "POST",
  endpoint: "/mailings/subscribe",
  body: { email }
})
