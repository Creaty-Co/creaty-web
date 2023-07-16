import { createApi } from "@reduxjs/toolkit/query/react"
import { PaginationQueryType, PaginationType } from "@shared/types"
import { baseQueryWithReauth } from "@shared/utils"

import { topicsUpdate } from "./category.slice"
import { CategoryType } from "./category.types"

export const categoryApi = createApi({
  reducerPath: "topicsApi",

  baseQuery: baseQueryWithReauth(false),

  endpoints: builder => ({
    getTagsTopics: builder.query<PaginationType<CategoryType>, PaginationQueryType>({
      query: ({ page, page_size }) =>
        "/tags/categories?" + new URLSearchParams({ page: page + "", page_size: page_size + "" }).toString(),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const tags = [...new Map(data.results.flatMap(topic => topic.tags).map(item => [item["id"], item])).values()]
          dispatch(topicsUpdate({ list: data.results, tags }))
        } catch (error) {
          throw new Error("network error")
        }
      },
    }),
  }),
})

export const { useGetTagsTopicsQuery } = categoryApi
