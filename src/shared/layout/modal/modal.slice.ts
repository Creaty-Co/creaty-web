import { RootState } from "@app/store"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ModalType } from "./modal.types"

const initialState: ModalType = {
  elementContent: null,
  isActive: false
}

export const modalSlice = createSlice({
  initialState,
  name: "modal",
  
  reducers: {
    /* Abstract */
    open: (state, action: PayloadAction<ModalType["elementContent"]>) => {
      state.elementContent = action.payload
      state.isActive = true
    },

    close: (state) => {
      state.elementContent = null
      state.isActive = false
    },

    // /* Content */
    // setContent: (state, action: PayloadAction<ModalType["elementContent"]>) => {
    //   state.elementContent = action.payload
    // },

    // /* Visibility */ 
    // toggle: (state) => {
    //   state.isActive = !state.isActive
    // },

    // show: (state) => {
    //   state.isActive = true
    // },

    // hide: (state) => {
    //   state.isActive = false
    // }
  }
})

export default modalSlice.reducer
export const { open, close } = modalSlice.actions

export const selectModal = (state: RootState) => state.modal
export const selectModalActive = () => createSelector(
  selectModal,
  state => state.isActive
)
export const selectModalContent = () => createSelector(
  selectModal,
  state => state.elementContent
)