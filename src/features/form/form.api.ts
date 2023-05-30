import { createApi } from "@reduxjs/toolkit/query/react"
import { PaginationType } from "@shared/types"
import { getFetchBaseQuery } from "@shared/utils"

import { FormRequestParamsType, FormType } from "./form.types"

export const FormApi = createApi({
  reducerPath: "formApi",

  baseQuery: getFetchBaseQuery(false),

  endpoints: builder => ({
    getForms: builder.query<PaginationType<FormType>, void>({
      query: () => "/forms"
    }),

    postFormsIdApplications: builder.mutation<FormType, FormRequestParamsType>({
      query: ({ id, path, ...fields }) => ({
        url: `/forms/${id}/applications/`,
        method: "POST",
        body: { path, ...fields }
      })
    })
  })
})

export const {
  usePostFormsIdApplicationsMutation,
  useGetFormsQuery
} = FormApi