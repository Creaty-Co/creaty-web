import { getTags, getTagsTopics } from "api/actions/tags"
import ClientAPI from "api/client"
import { ValuesOf } from "interfaces/common"
import { MapActions } from "interfaces/reducer"
import { TagType, TopicType } from "interfaces/types"
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


export const updateUser = (payload: Partial<typeof initialState>) => ({
  type: "TOPICS_UPDATE",
  payload
})








/// Request
window.addEventListener("load", async () => {
  const { error, payload } = await ClientAPI.query(getTagsTopics(1, 25))

  if (error) throw new Error("unexpected error")
  if (!payload) throw new Error("no payload")

  store.dispatch({
    type: "TOPICS_UPDATE",
    payload: { list: payload.results }
  })
})

/// Request
window.addEventListener("load", async () => {
  const { error, payload } = await ClientAPI.query(getTags(1, 1000))

  if (error) throw new Error("unexpected error")
  if (!payload) throw new Error("no payload")

  store.dispatch({
    type: "TOPICS_UPDATE",
    payload: { tags: payload.results }
  })
})
