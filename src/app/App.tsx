import "./scss/style.scss"
import "antd/dist/reset.css"
import "./scss/base.scss"
import "./scss/app.scss"
import "./scss/ant.scss"

import { CookiesBanner } from "@components/CookiesBanner/CookiesBanner"
import { Footer } from "@components/Footer/Footer"
import { Header } from "@components/Header/Header"
import { ModalContainer } from "@pages/Home/ModalContainer/ModalContainer"
import { store } from "@store/store"
import { ConfigProvider } from "antd"
import { createBrowserHistory } from "history"
import i18next from "i18next"
import { StrictMode, Suspense } from "react"
import { I18nextProvider } from "react-i18next"
import { Provider } from "react-redux"
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom"

import { AppInit } from "./AppInit/AppInit"
import { ErrorBoundary } from "./ErrorBoundary"
import { Router } from "./router"

export const history = createBrowserHistory()

export const App = () => (
  <StrictMode>
    <ConfigProvider theme={{ token: { colorPrimary: "#070707", fontFamily: "Google Sans" } }}>
      {/* @ts-ignore */}
      <HistoryRouter history={history}>
        <Provider store={store}>
          <I18nextProvider defaultNS="translation" i18n={i18next}>
            <Suspense fallback="Loading...">
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
