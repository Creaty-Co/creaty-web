import { RootState } from "@app/store"
import { createSelector,createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getBrowser, getOrientation, getOS, getTouch } from "@shared/utils"

import { DeviceStateType } from "./device.types"

const initialState: DeviceStateType = {
  orientation: getOrientation(),
  browser: getBrowser(),
  touch: getTouch(),
  os: getOS()
}

export const deviceSlice = createSlice({
  initialState,
  name: "device",
  
  reducers: {},
})

export default deviceSlice.reducer
export const selectDevice = (state: RootState) => state.device
export const selectIsMobile = createSelector(
  selectDevice,
  state => state.touch
)