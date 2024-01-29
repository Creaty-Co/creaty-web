import "./scss/style.scss"
import "antd/dist/reset.css"
import "./scss/base.scss"
import "./scss/app.scss"
import "./scss/ant.scss"

import { Cookies } from "@features/cookies"
import { Router } from "@pages"
import { ModalContainer } from "@shared/layout"
import { Footer } from "@shared/ui"
import { ConfigProvider } from "antd"
import { createBrowserHistory } from "history"
import i18next from "i18next"
import { StrictMode, Suspense } from "react"
import { I18nextProvider } from "react-i18next"
import { Provider } from "react-redux"
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom"

import { Header } from "../components/Header/Header"
import { AppInit } from "./AppInit"
import { ErrorBoundary } from "./providers"
import { store } from "./store"

export const history = createBrowserHistory()

function App() {
  return (
    <StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#070707",
            fontFamily: "Google Sans",
          },
        }}
      >
        {/* @ts-ignore */}
        <HistoryRouter history={history}>
          <Provider store={store}>
            <I18nextProvider defaultNS="translation" i18n={i18next}>
              <Suspense fallback="">
                <ErrorBoundary fallback="Error">
                  <AppInit />

                  <Header />
                  <main>
                    <Router />
                  </main>

                  <Footer />

                  <Cookies />

                  <ModalContainer />
                </ErrorBoundary>
              </Suspense>
            </I18nextProvider>
          </Provider>
        </HistoryRouter>
      </ConfigProvider>
    </StrictMode>
  )
}

export default App
