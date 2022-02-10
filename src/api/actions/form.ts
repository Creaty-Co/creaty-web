import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"
import { FormFieldType, FormType } from "interfaces/types"

export const getForms: Action<PaginationType<FormType>> = {
  method: "GET",
  endpoint: "/forms"
}

export const postFormsIdApplications = (id: string | number, body: Record<FormFieldType["type"], string>): Action => ({
  method: "POST",
  endpoint: `/forms/${id}/applications`,
  body
})
