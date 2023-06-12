import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "@shared/utils"

import { FormIds, FormRequestParamsType } from "./form.types"

export const FormApi = createApi({
  reducerPath: "formApi",

  baseQuery: baseQueryWithReauth(false),

  endpoints: builder => ({
    postFormsIdApplications: builder.mutation<{}, FormRequestParamsType>({
      query: ({ formName, ...fields }) => ({
        url: `/forms/${FormIds[formName]}/applications/`,
        method: "POST",
        body: fields,
      }),
    }),
  }),
})

export const { usePostFormsIdApplicationsMutation } = FormApi
