import { Action } from "api/client"
import { URLDataBase64 } from "interfaces/common"
import { PaginationType } from "interfaces/Django"
import { MailingPreviewType, MailingType } from "interfaces/types"

/* Mailings */

export const getMailings = (page: number, page_size: number): Action<PaginationType<MailingPreviewType>> => ({
  method: "GET",
  endpoint: "/mailings",
  params: { page, page_size }
})

export const postMailings = (body: {
  subject: string
  content: string
}): Action<{ id: number }> => ({
  method: "POST",
  endpoint: "/mailings",
  body
})

export const postMailingsSubscribe = (email: string): Action => ({
  method: "POST",
  endpoint: "/mailings/subscribe",
  body: { email }
})

/* Mailing */

export const getMailing = (id: number): Action<MailingType> => ({
  method: "GET",
  endpoint: `/mailings/${id}`
})

export const postMailingSend = (id: number): Action<{ id: number }> => ({
  method: "POST",
  endpoint: `/mailings/${id}/send`
})

/* Subscribers */

export const postMailingsSubscribersXLSX: Action<{ link: string }> = {
  method: "POST",
  endpoint: `/mailings/subscribers/xlsx`
}

export const putMailingsSubscribersXLSX = (xlsx: URLDataBase64): Action => ({
  method: "PUT",
  endpoint: `/mailings/subscribers/xlsx`,
  body: { xlsx }
})
