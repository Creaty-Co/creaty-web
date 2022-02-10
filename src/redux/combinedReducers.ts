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

const combinedReducers = combineReducers(reducers)
export default combinedReducers
