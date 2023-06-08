import { createApi } from "@reduxjs/toolkit/query/react"
import { PaginationType } from "@shared/types"
import { baseQueryWithReauth } from "@shared/utils"

import { FormRequestParamsType, FormType } from "./form.types"
import { FormIds } from "./utils"

export const FormApi = createApi({
  reducerPath: "formApi",

  baseQuery: baseQueryWithReauth(false),

  endpoints: builder => ({
    getForms: builder.query<PaginationType<FormType>, void>({
      query: () => "/forms",
    }),

    postFormsIdApplications: builder.mutation<FormType, FormRequestParamsType>({
      query: ({ formName, path, ...fields }) => ({
        url: `/forms/${FormIds[formName]}/applications/`,
        method: "POST",
        body: { path, ...fields },
      }),
    }),
  }),
})

export const { usePostFormsIdApplicationsMutation, useGetFormsQuery } = FormApi
