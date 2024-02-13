import { createApi } from "@reduxjs/toolkit/query/react"
import { PaginationQueryType, PaginationType } from "@shared/types/types"
import { baseQueryWithReauth } from "@shared/utils/url"

import { mentorsPush } from "./mentor.slice"
import { IMentor, IMentorDetailed } from "./mentor.types"

export const mentorApi = createApi({
  reducerPath: "mentorApi",

  baseQuery: baseQueryWithReauth(false),

  endpoints: builder => ({
    getMentors: builder.query<PaginationType<IMentor>, PaginationQueryType>({
      query: ({ page, page_size, tag_set__in }) =>
        "/mentors/?" +
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

    getMentorBySlug: builder.query<IMentorDetailed, string>({
      query: slug => `/mentors/${slug}`,
    }),

    bookTrialSession: builder.mutation({
      query: body => ({ url: `/bookings/trial/`, method: "POST", body }),
    }),
    bookHourlySession: builder.mutation({
      query: body => ({ url: `/bookings/hourly/`, method: "POST", body }),
    }),
    bookPackSession: builder.mutation({
      query: body => ({ url: `/bookings/package/`, method: "POST", body }),
    }),
  }),
})

export const {
  useGetMentorBySlugQuery,
  useGetMentorsQuery,
  useBookTrialSessionMutation,
  useBookHourlySessionMutation,
  useBookPackSessionMutation,
} = mentorApi
