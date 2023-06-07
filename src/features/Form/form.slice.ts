import { RootState } from "@app/store"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { FormTypes, IFormState } from "./form.types"

const initialState: IFormState = {
  still_questions: {
    id: 4,
    type: "still_questions",
    fields: [
      {
        name: "name",
      },
      {
        name: "email",
      },
      {
        name: "about",
      },
    ],

    submitted: false,
  },

  test_meeting: {
    id: 3,
    type: "test_meeting",
    fields: [
      {
        name: "name",
      },
      {
        name: "email",
      },
      {
        name: "about",
      },
    ],

    submitted: false,
  },

  choose_mentor: {
    id: 2,
    type: "choose_mentor",
    fields: [
      {
        name: "name",
      },
      {
        name: "email",
      },
      {
        name: "about",
      },
    ],

    submitted: false,
  },

  signup_mentor: {
    id: 5,
    type: "signup_mentor",
    fields: [
      {
        name: "name",
      },
      {
        name: "email",
      },
      {
        name: "about",
      },
    ],

    submitted: false,
  },
}

export const contactFormSlice = createSlice({
  initialState,
  name: "contactForm",

  reducers: {
    submit: (state, action: PayloadAction<{ type: FormTypes }>) => {
      state[action.payload.type].submitted = true
    },

    reset: (state, action: PayloadAction<{ type: FormTypes }>) => {
      state[action.payload.type].submitted = false
    },
  },
})

export default contactFormSlice.reducer
export const { submit, reset } = contactFormSlice.actions

export const selectContactForms = (state: RootState) => state.form
export const selectContactFormByType = (type: FormTypes) => createSelector(selectContactForms, forms => forms[type])
