// import { ReactElement } from "react"
// import ReactMarkdown from "react-markdown"

import OuterLink from "app/components/services/OuterLink"
import { TOptions } from "i18next"
import type { marked } from "marked"
import { Lexer } from "marked"
import { createElement, Key, ReactNode } from "react"
import { Link } from "react-router-dom"

interface ReactPostProcessorModule {
  name: string
  type: "postProcessor"
  process(value: string, key: string[], options: TOptions, translator: unknown): ReactNode;
}

/**
 * 
 * Tries to create `ReactElement`, if text is not `marked`, return as it is.
 * 
 * @param token - is `marked.Token` from which is created `ReactNode`.
 * @param key - is a `React Element Key` in the case the function is mapped.
 */
function createChildFromToken(token: marked.Token, key: Key): ReactNode {
  switch (token.type) {
    // IDK, but it works.
    // `\n` is not tokenized but `\n\n` is.
    case "space":
      return "\n\n"

    case "html":
    case "text":
      // If there is no type, return as it is
      return token.text

    case "br":
    case "hr":
    case "def":
    case "table":
      return createElement(token.type, { key })

    case "list":
      return createElement(token.ordered ? "ol" : "ul", { key }, token.items.map(createChildFromToken))
    case "list_item":
      return createElement("li", { key }, token.tokens.map(createChildFromToken))

    case "link": {
      if (token.href.startsWith("http") || token.href.startsWith("//")) {
        return createElement(OuterLink, { key, to: token.href }, token.text)
      }

      return createElement(Link, { key, to: token.href }, token.text)
    }

    default:
      return createElement(token.type, { key }, token.text)
  }
}

const initReactMarkdownPostProcess: ReactPostProcessorModule = {
  name: "reactMarkdownPostProcess",
  type: "postProcessor",
  process: (value, key) => {
    // if there is no localization resource file or it is disabled
    if (key[0] === value) {
      return key
    }

    // `ReactMarkdown` method causes issues
    // return createElement(ReactMarkdown as ((props: { children: string }) => ReactElement), null, value)

    const lexer = new Lexer({ smartypants: true })
    const tokens = lexer.lex(value)
    const children = tokens.flatMap((token, index) => {
      // I don't why but for the first tokens it always creates paragraphs
      // So go through the tokens of the first `paragraph` tokens :<
      if (token.type === "paragraph") {
        return token.tokens.map(createChildFromToken)
      }

      // Key (index) must always be passed
      return createChildFromToken(token, index)
    })

    // If all children are plain `string`, return as it is
    if (children.every(child => typeof child === "string")) {
      return value
    }

    return children
  }
}

export default initReactMarkdownPostProcess
