import { createApi } from "@reduxjs/toolkit/query/react"
import { PaginationQueryType, PaginationType } from "@shared/types"
import { baseQueryWithReauth } from "@shared/utils"

import { mentorsPush } from "./mentor.slice"
import { MentorDetailedType, MentorType } from "./mentor.types"

export const mentorApi = createApi({
  reducerPath: "mentorApi",

  baseQuery: baseQueryWithReauth(false, "/mentors"),

  endpoints: builder => ({
    getMentors: builder.query<PaginationType<MentorType>, PaginationQueryType>({
      query: ({ page, page_size, tag_set__in }) =>
        "/?" +
        new URLSearchParams({
          page: page + "",
          page_size: page_size + "",
          tag_set__in: tag_set__in?.filter(Boolean).join(",") || "",
        }).toString(),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(mentorsPush(data.results))
        } catch (error) {
          throw new Error("network error")
        }
      },
    }),

    getMentorBySlug: builder.query<MentorDetailedType, string>({
      query: slug => `/${slug}`,
    }),
  }),
})

export const { useGetMentorBySlugQuery, useGetMentorsQuery } = mentorApi
