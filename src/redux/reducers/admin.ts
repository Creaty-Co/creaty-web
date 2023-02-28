import { ValuesOf } from "interfaces/common"
import { MapActions } from "interfaces/reducer"

interface InitialStateType {
  editing: boolean
}

const initialState: InitialStateType = {
  editing: false
}

interface Actions {
  ADMIN_UPDATE: InitialStateType
}

type Action = ValuesOf<MapActions<Actions>>

export default (state = initialState, action: Action): InitialStateType => {
  switch (action.type) {

    case "ADMIN_UPDATE":
      return { ...state, ...action.payload }

    default:
      return state
  }
}


export const updateAdmin = (payload: Partial<InitialStateType>) => ({
  type: "ADMIN_UPDATE",
  payload
})

export const updateAdminEditing = (editing: InitialStateType["editing"]) => ({
  type: "ADMIN_UPDATE",
  payload: { editing }
})
