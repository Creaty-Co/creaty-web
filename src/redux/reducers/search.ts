import { ValuesOf } from "interfaces/common"
import { MapActions } from "interfaces/reducer"

export interface SearchTopic {
  id: number
  name: string
}

export interface SearchTag {
  id: number
  name: string
  text: string
  topic: number
}

export interface SearchState {
  topic?: SearchTopic
  tag?: SearchTag
  focused: boolean
}

const initialState: SearchState = {
  focused: false
}

interface Actions {
  SEARCH_UPDATE: Partial<SearchState>
}

type Action = ValuesOf<MapActions<Actions>>

export default (state = initialState, action: Action): typeof initialState => {
  switch (action.type) {

    case "SEARCH_UPDATE":
      return { ...state, ...action.payload }

    default:
      return state
  }
}


export const updateSearch = (payload: Partial<SearchState>) => ({
  type: "SEARCH_UPDATE",
  payload
})
