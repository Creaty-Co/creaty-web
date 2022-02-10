import { ValuesOf } from "interfaces/common"
import { MapActions } from "interfaces/reducer"
import { TagType, TopicType } from "interfaces/types"


export interface SearchState {
  topic?: TopicType
  tag?: TagType
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


export const updateSearchTopic = (topic: Partial<SearchState["topic"]>) => ({
  type: "SEARCH_UPDATE",
  payload: {
    topic,
    tag: undefined,
    focused: true
  }
})

export const updateSearchTag = (tag: Partial<SearchState["topic"]>) => ({
  type: "SEARCH_UPDATE",
  payload: {
    tag,
    focused: false
  }
})
