import "antd/dist/reset.css"
import "./assets/scss/base.scss"
import "./assets/scss/app.scss"

import { StyleProvider } from "@ant-design/cssinjs"
import { Cookies } from "@features/cookies"
import { Router } from "@pages"
import { ModalContainer } from "@shared/layout"
import { Footer } from "@shared/ui"
import { MemoHeader } from "@widgets"
import { ConfigProvider } from "antd"
import i18next from "i18next"
import { StrictMode, Suspense } from "react"
import { I18nextProvider } from "react-i18next"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import { AppInit } from "./app-init"
import { ErrorBoundary } from "./providers"
import { store } from "./store"

function App() {
  return (
    <StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#000000",
          },
        }}>
        <StyleProvider>
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
                  </ErrorBoundary>
                </Suspense>
              </I18nextProvider>
            </Provider>
          </BrowserRouter>
        </StyleProvider>
      </ConfigProvider>
    </StrictMode>
  )
}

export default App
