import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ResponseLocaleLanguage } from "@shared/lib/i18n"
import { PaginationType } from "@shared/types"
import { ResourceKey } from "i18next"

import { PageFAQType, PageLinkSocialType, PageLinkType, PagePersonalType, PageType } from "./pages.types"

export const pagesApi = createApi({
  reducerPath: "pagesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/pages"
  }),

  endpoints: builder => ({
    getPagesMain: builder.query<PageType, void>({
      query: () => "/main"
    }),

    getPagePersonal: builder.query<PagePersonalType, { shortcut: string }>({
      query: ({ shortcut }) => `/personal/${shortcut}`
    }),

    getPagesLinksDocuments: builder.query<PaginationType<PageLinkType>, void>({
      query: () => "/links/documents"
    }),

    getPagesLinksSocials: builder.query<PaginationType<PageLinkSocialType>, void>({
      query: () => "/links/socials"
    }),

    getPagesFAQs: builder.query<PaginationType<PageFAQType>, void>({
      query: () => "/faqs"
    }),

    getPagesLocalesLanguageNamespace: builder.query<ResourceKey, ResponseLocaleLanguage>({
      query: ({ language, namespace }) => `/locales/${language}/${namespace}.json`
    }),

  })
})

export const {
  useGetPagesLocalesLanguageNamespaceQuery,
  useGetPagesLinksDocumentsQuery,
  useGetPagesLinksSocialsQuery,
  useGetPagePersonalQuery,
  useGetPagesMainQuery,
  useGetPagesFAQsQuery
} = pagesApi