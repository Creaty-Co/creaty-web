import "./scss/style.scss"
import "antd/dist/reset.css"
import "./scss/base.scss"
import "./scss/app.scss"
import "./scss/ant.scss"

import { ModalContainer } from "@pages/Home/ModalContainer/ModalContainer"
import { ConfigProvider } from "antd"
import { Footer } from "antd/es/layout/layout"
import { createBrowserHistory } from "history"
import i18next from "i18next"
import { StrictMode, Suspense } from "react"
import { I18nextProvider } from "react-i18next"
import { Provider } from "react-redux"
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom"
import { CookiesBanner } from "src/components/CookiesBanner/CookiesBanner"
import { store } from "src/store/store"

import { Header } from "../components/Header/Header"
import { AppInit } from "./AppInit/AppInit"
import { ErrorBoundary } from "./ErrorBoundary"
import { Router } from "./router"

export const history = createBrowserHistory()

export function App() {
  return (
    <StrictMode>
      <ConfigProvider theme={{ token: { colorPrimary: "#070707", fontFamily: "Google Sans" } }}>
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

                  <CookiesBanner />

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
