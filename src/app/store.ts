import { mentorApi } from "@entities/mentor/mentor.api"
import mentorReducer from "@entities/mentor/mentor.slice"
import { tagsApi } from "@entities/tags/tags.api"
import tagsReducer from "@entities/tags/tags.slice"
import { FormApi } from "@features"
import { authApi } from "@features/auth/auth.api"
import authReducer from "@features/auth/auth.slice"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { pagesApi } from "@shared/api"
import pagesReducer from "@shared/api/pages/pages.slice"
import modalReducer from "@shared/layout/ModalContainer/modalContainerSlice"
import { subscribeApi } from "@shared/ui/subscribe"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import logger from "redux-logger"

const development = process.env.NODE_ENV === "development"

const middlewares = [
  authApi.middleware,
  FormApi.middleware,
  subscribeApi.middleware,
  tagsApi.middleware,
  mentorApi.middleware,
  pagesApi.middleware,
]

if (development) middlewares.push(logger)

const combinedReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [FormApi.reducerPath]: FormApi.reducer,
  [subscribeApi.reducerPath]: subscribeApi.reducer,
  [tagsApi.reducerPath]: tagsApi.reducer,
  [mentorApi.reducerPath]: mentorApi.reducer,
  [pagesApi.reducerPath]: pagesApi.reducer,

  auth: authReducer,
  pages: pagesReducer,
  tags: tagsReducer,
  mentor: mentorReducer,
  modal: modalReducer,
})

export const store = configureStore({
  reducer: combinedReducer,
  devTools: development,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
