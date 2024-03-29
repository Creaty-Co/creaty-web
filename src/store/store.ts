import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { authApi } from "@store/auth/auth.api"
import { authSlice } from "@store/auth/auth.slice"
import { ModalContainerSlice } from "@store/modalContainer.slice"
import { pagesSlice } from "@store/pages/pages.slice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { createLogger } from "redux-logger"

import { formApi } from "./forms/form.api"
import { mentorApi } from "./mentor/mentor.api"
import { mentorSlice } from "./mentor/mentor.slice"
import { pagesApi } from "./pages/pages.api"
import { subscribeApi } from "./subscribe.api"
import { tagsApi } from "./tags/tags.api"
import { tagsSlice } from "./tags/tags.slice"

const development = process.env.NODE_ENV === "development"

const logger: any = createLogger()

const middlewares = [
  authApi.middleware,
  formApi.middleware,
  subscribeApi.middleware,
  tagsApi.middleware,
  mentorApi.middleware,
  pagesApi.middleware,
]

if (development) middlewares.push(logger)

const combinedReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [formApi.reducerPath]: formApi.reducer,
  [subscribeApi.reducerPath]: subscribeApi.reducer,
  [tagsApi.reducerPath]: tagsApi.reducer,
  [mentorApi.reducerPath]: mentorApi.reducer,
  [pagesApi.reducerPath]: pagesApi.reducer,

  auth: authSlice.reducer,
  pages: pagesSlice.reducer,
  tags: tagsSlice.reducer,
  mentor: mentorSlice.reducer,
  modal: ModalContainerSlice.reducer,
})

export const store = configureStore({
  reducer: combinedReducer,
  devTools: development,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
})

type AppStore = typeof store.getState
type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<AppStore>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
