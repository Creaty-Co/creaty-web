import { RootState } from "@app/store"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ISearchState } from "./search.types"

const initialState: ISearchState = {
  focused: false
}

export const searchSlice = createSlice({
  initialState,
  name: "search",
  
  reducers: {
    updateSearchTopic: (state, action: PayloadAction<Partial<ISearchState>>) => {
      state.topic = action.payload.topic
      state.tag = undefined
    },
    updateSearchTag: (state, action: PayloadAction<Partial<ISearchState>>) => {
      if (state.topic?.tags.findIndex(tag => tag.id === action.payload.tag?.id) === -1)
        state.topic = undefined
      state.tag = action.payload.tag
    },
    updateSearch: (state, action: PayloadAction<Partial<ISearchState>>) => {
      state = { ...state, ...action.payload }
    }
  },
})

export default searchSlice.reducer
export const { updateSearchTopic, updateSearchTag, updateSearch } = searchSlice.actions

export const selectSearch = (state: RootState) => state.search
export const selectSearchTopic = createSelector(selectSearch, state => state.topic)
// export const selectSearchTag = createSelector(selectSearch, state => state.tag)