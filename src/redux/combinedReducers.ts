import { combineReducers } from "redux"

import forms from "./reducers/forms"
import search from "./reducers/search"

const reducers = {
  search,
}

const combinedReducers = combineReducers(reducers)
export default combinedReducers
