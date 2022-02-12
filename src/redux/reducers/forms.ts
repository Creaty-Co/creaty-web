import { getForms } from "api/actions/form"
import ClientAPI from "api/client"
import { ValuesOf } from "interfaces/common"
import { MapActions } from "interfaces/reducer"
import { FormType } from "interfaces/types"
import Localization from "modules/localization/controller"
import store from "redux/store"


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


export const updateForms = (payload: Partial<typeof initialState>) => ({
  type: "FORMS_UPDATE",
  payload
})







/// Request
async function requestForms() {
  const { error, payload } = await ClientAPI.query(getForms)

  if (error) throw new Error("formsReducerError: unexpected error")
  if (!payload) throw new Error("formsReducerError: no payload")

  const result = payload.results.reduce<typeof initialState>((result, next) => ({ ...result, [next.type]: next }), {})

  store.dispatch({
    type: "FORMS_UPDATE",
    payload: result
  })
}
window.addEventListener("load", requestForms)
Localization.onTransition(() => requestForms())
