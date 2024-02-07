import { createRoot } from "react-dom/client"

import { App } from "./app/App"

const rootElement = document.getElementById("root")
if (rootElement) {
  const root = createRoot(rootElement)
  root.render(App())
}
