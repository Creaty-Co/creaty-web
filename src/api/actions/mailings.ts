import { Action } from "api/client"
import { URLDataBase64 } from "interfaces/common"
import { PaginationType } from "interfaces/Django"
import { MailingPreviewType, MailingType } from "interfaces/types"

/* Mailings */

export const getMailings = (page: number, page_size: number): Action<PaginationType<MailingPreviewType>> => ({
  method: "GET",
  endpoint: "/mailings/",
  params: { page, page_size }
})

export const postMailings = (body: {
  subject: string
  content: string
}): Action<{ id: number }> => ({
  method: "POST",
  endpoint: "/mailings/",
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

export const postMailingSend = (id: number, body: Omit<MailingType, "id">): Action<{ id: number }> => ({
  method: "POST",
  endpoint: `/mailings/${id}/send`,
  body
})

/* Subscribers */

export const getMailingsSubscribers: Action = {
  method: "GET",
  endpoint: `/mailings/subscribers/xlsx/` // Gives headers for downloading
}

export const postMailingsSubscribers = (xlsx: URLDataBase64): Action => ({
  method: "POST",
  endpoint: `/mailings/subscribers/xlsx`,
  body: { xlsx }
})

