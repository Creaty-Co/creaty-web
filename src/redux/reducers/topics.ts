import { getTags, getTagsTopics } from "api/actions/tags"
import ClientAPI from "api/client"
import { ValuesOf } from "interfaces/common"
import { MapActions } from "interfaces/reducer"
import { TagType, TopicType } from "interfaces/types"
import Localization from "modules/localization/controller"
import store from "redux/store"


const initialState: {
  list: TopicType[]
  tags: TagType[]
} = {
  list: [],
  tags: []
}

interface Actions {
  TOPICS_UPDATE: Partial<typeof initialState>
}

type Action = ValuesOf<MapActions<Actions>>

export default (state = initialState, action: Action): typeof initialState => {
  switch (action.type) {

    case "TOPICS_UPDATE":
      return { ...state, ...action.payload }

    default:
      return state
  }
}


export const updateTopics = (payload: Partial<typeof initialState>) => ({
  type: "TOPICS_UPDATE",
  payload
})








/// Request
export async function requestTopics() {
  const { error, payload } = await ClientAPI.query(getTagsTopics(1, 25), true)

  if (error) throw new Error("unexpected error")
  if (!payload) throw new Error("no payload")

  store.dispatch({
    type: "TOPICS_UPDATE",
    payload: { list: payload.results }
  })
}
export async function requestTags() {
  const { error, payload } = await ClientAPI.query(getTags(1, 1000), true)

  if (error) throw new Error("unexpected error")
  if (!payload) throw new Error("no payload")

  store.dispatch({
    type: "TOPICS_UPDATE",
    payload: { tags: payload.results }
  })
}
window.addEventListener("load", requestTopics)
window.addEventListener("load", requestTags)
Localization.onTransition(() => {
  requestTopics()
  requestTags()
})
