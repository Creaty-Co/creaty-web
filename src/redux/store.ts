import "react-redux"

import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"

import combinedReducers from "./combinedReducers"

const store = createStore(combinedReducers, compose(applyMiddleware(thunk)))
export default store
// Declarations
declare module "redux" {
  interface Store { }
}
declare module "react-redux" {
  interface DefaultRootState extends ReturnType<typeof store.getState> { }
}
