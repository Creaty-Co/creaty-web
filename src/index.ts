import App from "app/App"
import { createElement } from "react"
import ReactDOM from "react-dom"

// eslint-disable-next-line @typescript-eslint/no-var-requires
window.Buffer = require("buffer").Buffer

ReactDOM.render(createElement(App), document.getElementById("root"))
