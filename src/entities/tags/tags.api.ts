import { createApi } from "@reduxjs/toolkit/query/react"
import { PaginationType } from "@shared/types"
import { baseQueryWithReauth } from "@shared/utils"

import { setCategories, setTags } from "./tags.slice"
import { ICategory } from "./tags.types"

export const tagsApi = createApi({
  reducerPath: "tagsApi",

  baseQuery: baseQueryWithReauth(false),

  endpoints: builder => ({
    getCategories: builder.query<PaginationType<ICategory>, void>({
      query: () => "/tags/categories/",
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const tags = [...new Map(data.results.flatMap(topic => topic.tags).map(item => [item["id"], item])).values()]
          dispatch(setCategories({ categories: data.results }))
          dispatch(setTags({ tags }))
        } catch (error) {
          throw new Error("network error")
        }
      },
    }),
  }),
})

export const { useGetCategoriesQuery } = tagsApi
