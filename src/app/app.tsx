import "./assets/scss/base.scss"
import "./assets/scss/app.scss"

import { Cookies } from "@features/cookies"
import { Router } from "@pages"
import { ModalContainer } from "@shared/layout"
import { Footer } from "@shared/ui"
import { MemoHeader } from "@widgets"
import i18next from "i18next"
import { StrictMode, Suspense } from "react"
import { I18nextProvider } from "react-i18next"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { AppInit } from "./app-init"
import { ErrorBoundary } from "./providers"
import { store } from "./store"

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <I18nextProvider defaultNS="translation" i18n={i18next}>
            <Suspense fallback="">
              <ErrorBoundary fallback="Error">
                <AppInit />

                <MemoHeader />
                <main>
                  <Router />
                </main>

                <Footer />

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

export default App
