import { categoryApi } from "@entities/category/category.api"
import categoryReducer from "@entities/category/category.slice"
import deviceReducer from "@entities/device/device.slice"
import { mentorApi } from "@entities/mentor/mentor.api"
import mentorReducer from "@entities/mentor/mentor.slice"
import { FormApi } from "@features"
import { authApi } from "@features/auth/auth.api"
import authReducer from "@features/auth/auth.slice"
import searchReducer from "@features/search/search.slice"
import { usersApi } from "@features/users/users.api"
import usersReducer from "@features/users/users.slice"
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
  usersApi.middleware,
  FormApi.middleware,
  subscribeApi.middleware,
  categoryApi.middleware,
  mentorApi.middleware,
  pagesApi.middleware,
]

if (development) middlewares.push(logger)

const combinedReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [FormApi.reducerPath]: FormApi.reducer,
  [subscribeApi.reducerPath]: subscribeApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [mentorApi.reducerPath]: mentorApi.reducer,
  [pagesApi.reducerPath]: pagesApi.reducer,

  auth: authReducer,
  users: usersReducer,
  pages: pagesReducer,
  topics: categoryReducer,
  mentor: mentorReducer,
  device: deviceReducer,
  search: searchReducer,
  modal: modalReducer,
})

// todo: add not circular typing
const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/logOut") state = undefined
  return combinedReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
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
