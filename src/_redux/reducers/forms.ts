import { getForms } from "api/actions/form"
import ClientAPI from "api/client"
import { ValuesOf } from "interfaces/common"
import { MapActions } from "interfaces/reducer"
import { FormType } from "interfaces/types"
import { Dispatch } from "redux"


const initialState: Partial<Record<FormType["type"], FormType>> = {}

interface Actions {
  FORMS_UPDATE: typeof initialState
}

type Action = ValuesOf<MapActions<Actions>>

export default (state = initialState, action: Action): typeof initialState => {
  switch (action.type) {

    case "FORMS_UPDATE":
      return { ...state, ...action.payload }

    default:
      return state
  }
}

/* Plain Redux Actions */

export const formsUpdate = (payload: Partial<typeof initialState>) => ({
  type: "FORMS_UPDATE",
  payload
})

/* Thunk Actions */

export async function(dispatch: Dispatch) {
  const { error, payload } = await ClientAPI.query(getForms)

  // if (error) throw new Error("formsReducerError: unexpected error")
  // if (!payload) throw new Error("formsReducerError: no payload")

  if (error) return
  if (!payload) return

  const result = payload.results.reduce<typeof initialState>((result, next) => ({ ...result, [next.type]: next }), {})

  dispatch(formsUpdate(result))
}
