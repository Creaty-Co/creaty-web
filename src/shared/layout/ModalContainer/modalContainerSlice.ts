import { RootState } from "@app/store"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"


export interface ModalContainerType {
  elementContent: React.ReactNode
  isActive: boolean
}
const initialState: ModalContainerType = {
  elementContent: null,
  isActive: false
}

export const ModalContainerSlice = createSlice({
  initialState,
  name: "modal",
  
  reducers: {
    open: (state, action: PayloadAction<ModalContainerType["elementContent"]>) => {
      state.elementContent = action.payload
      state.isActive = true
    },

    close: (state) => {
      state.elementContent = null
      state.isActive = false
    },
    
    /* Content */
    setContent: (state, action: PayloadAction<ModalContainerType["elementContent"]>) => {
      state.elementContent = action.payload
    },


  }
})

export default ModalContainerSlice.reducer
export const { open, close, setContent } = ModalContainerSlice.actions

export const selectModalContainer = (state: RootState) => state.modal
export const selectModalContainerActive = () => createSelector(
  selectModalContainer,
  state => state.isActive
)
export const selectModalContainerContent = () => createSelector(
  selectModalContainer,
  state => state.elementContent
)