import App from "app/App"
import { createElement } from "react"
import { createRoot } from "react-dom/client"
import * as serviceWorkerRegistration from "services/serviceWorkerRegistration"

// eslint-disable-next-line @typescript-eslint/no-var-requires
window.Buffer = require("buffer").Buffer

const rootElement = document.getElementById("root")
if (rootElement) {
  const root = createRoot(rootElement)
  root.render(createElement(App))
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
