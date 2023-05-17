import { RootState } from "@app/store"
import { createSelector,createSlice, PayloadAction } from "@reduxjs/toolkit"

// import { ContactForm } from "./contact-form"
import { ContactFormType, ContactFormTypes, IContactFormState } from "./contact-form.types"

const initialState: IContactFormState = {
  "still_questions": {
    id: 4,
    type: "still_questions",
    fields: [
      {
        "name": "name"
      }, {
        "name": "email"
      }, {
        "name": "about"
      }
    ],

    submitted: false
  }, 

  "test_meeting": {
    id: 3,
    type: "test_meeting",
    fields: [
      {
        "name": "name"
      }, {
        "name": "email"
      }, {
        "name": "about"
      }
    ],

    submitted: false
  }, 

  "become_mentor": {
    id: 1,
    type: "become_mentor",
    fields: [
      {
        "name": "name"
      }, {
        "name": "email"
      }, {
        "name": "about"
      }
    ],

    submitted: false
  }, 
  
  "choose_mentor": {
    id: 2,
    type: "choose_mentor",
    fields: [
      {
        "name": "name"
      }, {
        "name": "email"
      }, {
        "name": "about"
      }
    ],

    submitted: false
  }, 
  
  "signup_mentor": {
    id: 5,
    type: "signup_mentor",
    fields: [
      {
        "name": "name"
      }, {
        "name": "email"
      }, {
        "name": "about"
      }
    ],

    submitted: false
  }
}

export const contactFormSlice = createSlice({
  initialState,
  name: "contactForm",
  
  reducers: {
    // setForms: (state, action: PayloadAction<Partial<typeof initialState>>) => action.payload,
   
    submit: (state, action: PayloadAction<{ type: ContactFormTypes }>) => {
      state[action.payload.type].submitted = true
    },

    reset: (state, action: PayloadAction<{ type: ContactFormTypes }>) => {
      state[action.payload.type].submitted = false
    }
  },
})

export default contactFormSlice.reducer
export const { submit, reset } = contactFormSlice.actions

export const selectContactForms = (state: RootState) => state.contactForm
export const selectContactFormByType = (type: ContactFormType["type"]) => createSelector(
  selectContactForms,
  (forms) => forms[type]
)