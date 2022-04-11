import App from "app/App"
import { createElement } from "react"
import { createRoot } from "react-dom/client"

// eslint-disable-next-line @typescript-eslint/no-var-requires
window.Buffer = require("buffer").Buffer

function init() {
  const rootElement = document.getElementById("root")
  if (rootElement === null) return

  const root = createRoot(rootElement)
  root.render(createElement(App))
}

init()
