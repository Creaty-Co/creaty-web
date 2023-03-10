import "./assets/scss/base.scss"
import "./assets/scss/app.scss"

import { useGetTagsTopicsQuery } from "@entities/category/category.api"
import { Cookies } from "@features/cookies" 
import { Router } from "@pages"
import { LayoutPage, ModalContainer } from "@shared/layout"
import i18next from "i18next"
import { StrictMode, Suspense } from "react"
import ReactGA from "react-ga4"
import { I18nextProvider } from "react-i18next"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { AppInit } from "./app-init"
import { ErrorBoundary } from "./providers"
import initSentry from "./providers/sentry"
import { store } from "./store"

function App() {
  if (process.env.NODE_ENV === "development") console.clear()

  return (
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <I18nextProvider defaultNS="translation" i18n={i18next}>
            <Suspense fallback="">
              <ErrorBoundary fallback="Error">
                <AppInit />

                <LayoutPage>
                  <Router />
                </LayoutPage>

                <Cookies />
                
                <ModalContainer />
                <ToastContainer />

              </ErrorBoundary>
            </Suspense>
          </I18nextProvider>
        </Provider>
      </BrowserRouter>
    </StrictMode>
  )
}

if (process.env.REACT_APP_API_GA) {
  ReactGA.initialize(process.env.REACT_APP_API_GA)
} else {
  const message = ".env variable `REACT_APP_API_GA` is empty, GA will not be initialized."
  alert(message)
  console.warn(message)
}

if (process.env.NODE_ENV === "production" ) initSentry()

export default App
