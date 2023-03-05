import { Action } from "api/client"
import { URLDataBase64 } from "interfaces/common"
import { PaginationType } from "interfaces/Django"
import { FormFieldType, FormType } from "interfaces/types"

export const getForms: Action<PaginationType<FormType>> = {
  method: "GET",
  endpoint: "/forms"
}

export const postFormsIdApplications = (id: string | number, path: string, inputs: Record<FormFieldType["type"], string>): Action => ({
  method: "POST",
  endpoint: `/forms/${id}/applications`,
  body: { path, ...inputs }
})

/* Admin 
export const patchForm = (id: string | number, body: {
  description: string
  post_send: string
  fields: FormFieldType[]
}): Action => ({
  method: "PATCH",
  endpoint: `/forms/${id}`,
  body
})
*/

/* Applications XLSX */
/* Admin
export const postFormsApplicationsXLSX: Action<{ link: string }> = {
  method: "POST",
  endpoint: `/forms/applications/xlsx`
}

export const putFormsApplicationsXLSX = (xlsx: URLDataBase64): Action => ({
  method: "PUT",
  endpoint: `/forms/applications/xlsx`,
  body: { xlsx }
})
*/