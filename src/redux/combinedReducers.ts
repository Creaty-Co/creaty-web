import { combineReducers } from "redux"

import search from "./reducers/search"

const reducers = {}

const combinedReducers = combineReducers(reducers)
export default combinedReducers
