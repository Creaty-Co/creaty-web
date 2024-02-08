import { createSelector, createSlice } from "@reduxjs/toolkit"

import { RootState } from "../store"
import { pagesApi } from "./pages.api"
import { IPagesState, PageLinkType } from "./pages.types"

const initialState: IPagesState = {
  documentsLinks: null,
}

export const pagesSlice = createSlice({
  initialState,
  name: "pages",

  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(pagesApi.endpoints.getPagesLinksDocuments.matchFulfilled, (state, action) => {
      const loadedLinks = action.payload.results.reduce<Record<PageLinkType["type"], PageLinkType>>(
        (result, next) => ({ ...result, [next.type]: next }),
        {} as never
      )
      state.documentsLinks = loadedLinks
    })
  },
})

export const selectPages = (state: RootState) => state.pages
export const selectPagesDocumentsLinks = createSelector(selectPages, state => state.documentsLinks)
