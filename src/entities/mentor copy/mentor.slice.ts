import { RootState } from "@app/store"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IMentorState, MentorType } from "./mentor.types"

const initialState: IMentorState = {
  list: []
}

export const mentorSlice = createSlice({
  initialState,
  name: "mentor",
  
  reducers: {
    mentorUpdate: (state, action: PayloadAction<MentorType[]>) => {
      state.list = action.payload
    },
    
    mentorsPush: (state, action: PayloadAction<MentorType[]>) => {
      state.list = [...state.list, ...action.payload]
    }
  },
})

export default mentorSlice.reducer
export const { mentorUpdate, mentorsPush } = mentorSlice.actions

export const selectMentor = (state: RootState) => state.mentor
export const selectMentorList = createSelector(selectMentor, state => state.list)