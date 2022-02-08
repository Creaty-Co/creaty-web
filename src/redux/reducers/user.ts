import { ValuesOf } from "interfaces/common"
import { MapActions } from "interfaces/reducer"
import { User } from "interfaces/user"


const initialState: User = {
  auth: false
}

interface Actions {
  USER_UPDATE: typeof initialState
}

type Action = ValuesOf<MapActions<Actions>>

export default (state = initialState, action: Action): typeof initialState => {
  switch (action.type) {

    case "USER_UPDATE":
      return { ...state, ...action.payload }

    default:
      return state
  }
}


export const updateUser = (payload: Partial<typeof initialState>) => ({
  type: "USER_UPDATE",
  payload
})
