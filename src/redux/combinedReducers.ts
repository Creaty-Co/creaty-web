import { combineReducers } from "redux"

import forms from "./reducers/forms"
import search from "./reducers/search"
import user from "./reducers/user"

const reducers = {
  forms,
  search,
  user
}

const combinedReducers = combineReducers(reducers)
export default combinedReducers
