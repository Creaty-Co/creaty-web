import { ValuesOf } from "interfaces/common"
import { MapActions } from "interfaces/reducer"
import { User, UserType } from "interfaces/user"


const initialState: User = {
  auth: !!localStorage.getItem("token"),
  type: UserType.admin
}

interface Actions {
  USER_UPDATE: Partial<User>
}

type Action = ValuesOf<MapActions<Actions>>

export default (state = initialState, action: Action): User => {
  switch (action.type) {

    case "USER_UPDATE":
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export const updateUser = (payload: Partial<User>) => ({
  type: "USER_UPDATE",
  payload
}) as const
