import { categoryApi } from "@entities/category/category.api"
import categoryReducer from "@entities/category/category.slice"
import deviceReducer from "@entities/device/device.slice"
import { mentorApi } from "@entities/mentor/mentor.api"
import mentorReducer from "@entities/mentor/mentor.slice"
import { authApi } from "@features/auth/auth.api"
import authReducer from "@features/auth/auth.slice"
import { contactFormApi } from "@features/contact-form/contact-form.api"
import contactFormReducer from "@features/contact-form/contact-from.slice"
import searchReducer from "@features/search/search.slice"
import { configureStore } from "@reduxjs/toolkit"
import { pagesApi } from "@shared/api"
import modalReducer from "@shared/layout/modal/modal.slice"
import { subscribeApi } from "@shared/ui/subscribe"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const store = configureStore({
  reducer: {
    [contactFormApi.reducerPath]: contactFormApi.reducer,
    [subscribeApi.reducerPath]: subscribeApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [mentorApi.reducerPath]: mentorApi.reducer,
    [pagesApi.reducerPath]: pagesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    
    contactForm: contactFormReducer,
    topics: categoryReducer,
    mentor: mentorReducer,
    device: deviceReducer,
    search: searchReducer,
    modal: modalReducer,
    auth: authReducer,
  },

  devTools: process.env.NODE_ENV === "development",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat([
      contactFormApi.middleware,
      subscribeApi.middleware,
      categoryApi.middleware,
      mentorApi.middleware,
      pagesApi.middleware,
      authApi.middleware
    ]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

