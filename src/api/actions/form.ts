import { Action } from "api/client"
import { URLDataBase64 } from "interfaces/common"
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

export const patchForm = (id: string | number, body: {
  description: string
  post_send: string
  fields: FormFieldType[]
}): Action => ({
  method: "PATCH",
  endpoint: `/forms/${id}`,
  body
})

/* Applications XLSX */

export const getFormsApplicationsXLSX: Action = {
  method: "GET",
  endpoint: `/forms/applications/xlsx` // Gives headers for downloading
}

export const putFormsApplicationsXLSX = (xlsx: URLDataBase64): Action => ({
  method: "PUT",
  endpoint: `/forms/applications/xlsx`,
  body: { xlsx }
})
