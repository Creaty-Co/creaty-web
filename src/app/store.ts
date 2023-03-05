import { categoryApi } from "@entities/category/category.api"
import categoryReducer from "@entities/category/category.slice"
import deviceReducer from "@entities/device/device.slice"
import contactFormReducer from "@features/contact-form/contact-from.slice"
import searchReducer from "@features/search/search.slice"
import { configureStore } from "@reduxjs/toolkit"
import { pagesApi } from "@shared/api"
import modalReducer from "@shared/layout/modal/modal.slice"
import { subscribeApi } from "@shared/ui/subscribe"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"


export const store = configureStore({
  reducer: {
    [subscribeApi.reducerPath]: subscribeApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [pagesApi.reducerPath]: pagesApi.reducer,
    
    contactForm: contactFormReducer,
    topics: categoryReducer,
    device: deviceReducer,
    search: searchReducer,
    modal: modalReducer,
  },

  devTools: process.env.NODE_ENV === "development",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      subscribeApi.middleware,
      categoryApi.middleware,
      pagesApi.middleware
    ]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
