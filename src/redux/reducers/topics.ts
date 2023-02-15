import { getTagsTopics } from "api/actions/tags"
import ClientAPI from "api/client"
import { ValuesOf } from "interfaces/common"
import { MapActions } from "interfaces/reducer"
import { TagType, TopicType } from "interfaces/types"
import { Dispatch } from "redux"

/*
const mokaTags = [
  {
    id: 1,
    shortcut: "tag-one",
    title: "tag-1"
  }, {
    id: 2,
    shortcut: "tag-two",
    title: "tag-2"
  }, {
    id: 3,
    shortcut: "tag-three",
    title: "tag-3"
  }
]

const mokaTopics = [
  {
    id: 1,
    shortcut: "topic-1",
    title: "Topic one",
    icon: "",
    tags: [
      {
        id: 1,
        shortcut: "tag-one",
        title: "tag-1"
      }
    ]
  }, {
    id: 2,
    shortcut: "topic-2",
    title: "Topic two",
    icon: "",
    tags: [
      {
        id: 2,
        shortcut: "tag-two",
        title: "tag-2"
      }
    ]
  }, {
    id: 3,
    shortcut: "topic-3",
    title: "Topic three",
    icon: "",
    tags: [
      {
        id: 3,
        shortcut: "tag-three",
        title: "tag-3"
      }
    ]
  }
]
*/

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

/* Plain Redux Actions */
export const topicsUpdate = (payload: Partial<typeof initialState>) => ({
  type: "TOPICS_UPDATE",
  payload
})

/* Thunk Actions */
export async function topicsFetch(dispatch: Dispatch) {
  const { error, payload } = await ClientAPI.query(getTagsTopics(1, 25), true)

  /*
  if (error) throw new Error("unexpected error")
  if (!payload) throw new Error("no payload")
  */

  if (error) return
  if (!payload) return

  dispatch(topicsUpdate({ list: payload.results, tags: payload.results.flatMap(topic => topic.tags) }))
}
