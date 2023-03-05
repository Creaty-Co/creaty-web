import { RootState } from "@app/store"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ICategoryState } from "./category.types"

const initialState: ICategoryState = {
  list: [],
  tags: []
}

export const topicsSlice = createSlice({
  initialState,
  name: "topics",
  
  reducers: {
    topicsUpdate: (state, action: PayloadAction<ICategoryState>) => {
      state.list = action.payload.list
      state.tags = action.payload.tags
    }
  },
})

export default topicsSlice.reducer
export const { topicsUpdate } = topicsSlice.actions

export const selectTopics = (state: RootState) => state.topics
export const selectTopicsList = createSelector(selectTopics, state => state.list)
export const selectTopicsTags = createSelector(selectTopics, state => state.tags)