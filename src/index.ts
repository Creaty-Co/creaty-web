import "./style.scss" 

import App from "@app/App"
import buffer from "buffer"
import { createElement } from "react"
import { createRoot } from "react-dom/client"

// eslint-disable-next-line @typescript-eslint/no-var-requires
window.Buffer = buffer.Buffer

const rootElement = document.getElementById("root")
if (rootElement) {
  const root = createRoot(rootElement)
  root.render(createElement(App))
}
