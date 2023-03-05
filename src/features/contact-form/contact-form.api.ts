import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { PaginationType } from "@shared/types"
import { getBaseURL } from "@shared/utils"

import { ContactFormRequestParamsType, ContactFormType } from "./contact-form.types"

export const contactFormApi = createApi({
  reducerPath: "contactFormApi",

  baseQuery: fetchBaseQuery({
    baseUrl: getBaseURL(),
    prepareHeaders: (headers) => {
      headers.set("Accept-Language", "en")
      return headers
    }
  }),

  endpoints: builder => ({
    getForms: builder.query<PaginationType<ContactFormType>, void>({
      query: () => "/forms"
    }),

    postFormsIdApplications: builder.mutation<ContactFormType, ContactFormRequestParamsType>({
      query: ({ id, path, ...fields }) => ({
        url: `/forms/${id}/applications`,
        method: "POST",
        body: { path, ...fields }
      })
    })
  })
})

export const {
  usePostFormsIdApplicationsMutation,
  useGetFormsQuery
} = contactFormApi