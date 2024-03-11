import { initI18 } from "@i18n/config"
import React from "react"
import ReactDOM from "react-dom/client"

import { App } from "./app/App"

initI18()
if ("virtualKeyboard" in navigator) {
  (window.navigator as any).virtualKeyboard.overlaysContent = true
}
const rootElement = document.getElementById("root")
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}
