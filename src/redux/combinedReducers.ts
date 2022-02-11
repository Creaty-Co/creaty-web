import { combineReducers } from "redux"

import forms from "./reducers/forms"
import search from "./reducers/search"
import topics from "./reducers/topics"
import user from "./reducers/user"

const reducers = {
  forms,
  search,
  topics,
  user
}

type RS = typeof reducers
export type ReducersType = { [key in keyof RS]: ReturnType<RS[key]> }

const combinedReducers = combineReducers(reducers)
export default combinedReducers
