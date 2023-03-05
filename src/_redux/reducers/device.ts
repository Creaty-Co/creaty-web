import { ValuesOf } from "interfaces/common"
import { MapActions } from "interfaces/reducer"

import { getBrowser, getOrientation, getOS, getTouch } from "../../_legacy/_utils/devise"

const initialState: {
  orientation: string | null 

  browser: string | null
  os: string | null
  
  touch: boolean | null
} = {
  orientation: getOrientation(),
  
  browser: getBrowser(),
  os: getOS(),
  
  touch: getTouch()
}

interface Actions {
  DEVICE_ROTATE: Partial<typeof initialState>
}
type Action = ValuesOf<MapActions<Actions>>

export default (state = initialState, action: Action): typeof initialState => {
  switch (action.type) {
    case "DEVICE_ROTATE":
      return { ...state, ...action.payload }
    default:
      return state
  }
}

/* Plain Redux Actions */
export const topicsUpdate = (payload: Partial<typeof initialState>) => ({
  type: "DEVICE_ROTATE",
  payload
})

/* Selector */
export const selectIsMobile = (state: typeof initialState): boolean | null => state.touch  
export const selectIsTouch = (state: typeof initialState): boolean | null => state.touch 