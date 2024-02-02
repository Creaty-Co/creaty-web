import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "./store"

// TODO: finish migration to ant d modal. Delete file after
export interface ModalContainerType {
  elementContent: React.ReactNode
  isActive: boolean
}

const initialState: ModalContainerType = {
  elementContent: null,
  isActive: false,
}

export const ModalContainerSlice = createSlice({
  initialState,
  name: "modal",

  reducers: {
    openModal: (state, action: PayloadAction<ModalContainerType["elementContent"]>) => {
      state.elementContent = action.payload
      state.isActive = true
    },

    closeModal: state => {
      state.elementContent = null
      state.isActive = false
    },
  },
})

export const { openModal, closeModal } = ModalContainerSlice.actions

export const selectModalContainer = (state: RootState) => state.modal
export const selectModalContainerActive = () => createSelector(selectModalContainer, state => state.isActive)
export const selectModalContainerContent = () => createSelector(selectModalContainer, state => state.elementContent)
