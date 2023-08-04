import { createApi } from "@reduxjs/toolkit/query/react"
import { PaginationType } from "@shared/types"
import { baseQueryWithReauth } from "@shared/utils"

import { PageFAQType, PageLinkType, PagePersonalType, PageType } from "./pages.types"

export const pagesApi = createApi({
  reducerPath: "pagesApi",

  baseQuery: baseQueryWithReauth(false, "/pages"),

  endpoints: builder => ({
    getPagesMain: builder.query<PageType, void>({
      query: () => "/main",
    }),

    getPagePersonal: builder.query<PagePersonalType, { shortcut: string }>({
      query: ({ shortcut }) => `/personal/${shortcut}`,
    }),

    getPagesLinksDocuments: builder.query<PaginationType<PageLinkType>, void>({
      query: () => "/links/documents",
    }),

    getPagesLinksSocials: builder.query<PaginationType<PageLinkSocialType>, void>({
      query: () => "/links/socials",
    }),

    getPagesFAQs: builder.query<PaginationType<PageFAQType>, void>({
      query: () => "/faqs",
    }),
  }),
})

export const {
  useGetPagesLinksDocumentsQuery,
  useGetPagesLinksSocialsQuery,
  useGetPagePersonalQuery,
  useGetPagesMainQuery,
  useGetPagesFAQsQuery,
} = pagesApi
