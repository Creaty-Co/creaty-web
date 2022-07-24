import OuterLink from "app/components/services/OuterLink"
import { TOptions } from "i18next"
import type { marked } from "marked"
import { Lexer } from "marked"
import { createElement, ReactNode } from "react"
import { Link } from "react-router-dom"

interface ReactPostProcessorModule {
  name: string
  type: "postProcessor"
  process(value: string, key: string, options: TOptions, translator: unknown): ReactNode;
}

/**
 * 
 * Tries to create `ReactElement`, if text is not `marked`, return as it is.
 */
function createChildFromToken(token: marked.Token): ReactNode {
  switch (token.type) {
    case "space":
      return "\n\n"

    case "html":
    case "text":
      // If there is no type, return as it is
      return token.text

    case "br":
    case "hr":
    case "def":
    case "list":
    case "table":
      return createElement(token.type)

    case "link":
      if (token.href.startsWith("http") || token.href.startsWith("//")) {
        return createElement(OuterLink, { to: token.href }, token.text)
      }

      return createElement(Link, { to: token.href }, token.text)

    default:
      return createElement(token.type, null, token.text)
  }
}

const initReactMarkdownPostProcess: ReactPostProcessorModule = {
  name: "reactMarkdownPostProcess",
  type: "postProcessor",
  process: (value, key) => {
    const lexer = new Lexer({ smartypants: true })
    const tokens = lexer.lex(value)
    const children = tokens.flatMap(token => {
      // I don't why but for first tokens it always creates paragraphs
      // So go through tokens in first `paragraph` tokens :<
      // console.log(key)
      if (key[0].includes("garantee.desc"))
        console.log(token)

      if (token.type === "paragraph") {
        return token.tokens.map(createChildFromToken)
      }

      return createChildFromToken(token)
    })

    if (children.every(child => typeof child === "string")) {
      return children.join("")
    }

    return children
  }
}

export default initReactMarkdownPostProcess
