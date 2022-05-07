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
  SEARCH_TAG_UPDATE: Pick<Partial<SearchState>, "tag">
}

type Action = ValuesOf<MapActions<Actions>>

export default (state = initialState, action: Action): typeof initialState => {
  switch (action.type) {

    case "SEARCH_UPDATE":
      return { ...state, ...action.payload }

    case "SEARCH_TAG_UPDATE":
      // Remove topic if it doesn't have the tag
      if (state.topic?.tags.findIndex(tag => tag.id === action.payload.tag?.id) === -1) {
        return { ...state, ...action.payload, topic: undefined }
      }
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
  payload: { topic, tag: undefined }
})

export const updateSearchTag = (tag: Partial<SearchState["tag"]>) => ({
  type: "SEARCH_TAG_UPDATE",
  payload: { tag }
})
