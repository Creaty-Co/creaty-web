// Redux
import searchCalendar from "components/DropDownCalendar/DropDownCalendarReducer"
import { combineReducers } from "redux"

import search from "./reducers/search"

const reducers = {
  search,
  searchCalendar
}

const combinedReducers = combineReducers(reducers)
export default combinedReducers
