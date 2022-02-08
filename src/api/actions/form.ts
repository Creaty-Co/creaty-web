import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"
import { FormType } from "interfaces/types"

export const getForms: Action<PaginationType<FormType>> = {
  method: "GET",
  endpoint: "/forms"
}
