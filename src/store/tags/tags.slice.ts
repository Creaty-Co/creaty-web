import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "@store/store"

import { ITagsState } from "./tags.types"

const initialState: ITagsState = {
  tags: [],
  categories: [],
}

export const tagsSlice = createSlice({
  initialState,
  name: "tags",

  reducers: {
    setTags: (state, action: PayloadAction<ITagsState>) => {
      state.tags = action.payload.tags
    },
    setCategories: (state, action: PayloadAction<ITagsState>) => {
      state.categories = action.payload.categories
    },
  },
})

export const { setTags, setCategories } = tagsSlice.actions

const tagsStateS = (state: RootState) => state.tags

export const tagsS = createSelector(tagsStateS, state => state.tags)
export const categoriesS = createSelector(tagsStateS, state => state.categories)
