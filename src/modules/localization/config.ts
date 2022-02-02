/*

MIT License

Copyright (c) 2022 Valery Zinchenko

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

*/

import DefaultLangJSON from "app/assets/lang/ru.json"
import parse, { attributesToProps, domToReact } from "html-react-parser"
import { createElement, ReactNode } from "react"
import { Link } from "react-router-dom"

import Localization from "./controller"


// Add interceptors
Localization.addInterceptor(ll => {
  // Doesn't support nesting
  function transform(value: string): ReactNode {
    if (/<.+>/.test(value)) {
      return parse(value, {
        htmlparser2: {
          lowerCaseTags: false
        },
        replace: (domNode: any) => {
          if (domNode.name === "link") {
            return createElement(Link, domNode.attribs)
          }
        }
      })
    }

    return value
  }
  function transformDeeply<V>(object: V) {
    for (const key in object) {
      switch (typeof object[key]) {
        case "object":
          object[key] = transformDeeply(object[key])
          break

        case "string":
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          object[key] = transform(object[key])
          break

        default:
          continue
      }
    }

    return object
  }

  return transformDeeply(ll)
})
// Add languages
const langs = require.context("app/assets/lang/", true, /\.json$/, "sync")
langs.keys().forEach(fileName => {
  const lang = fileName.replace(/\.\/|\.json/g, "")
  const langFile = langs(fileName)

  if (typeof langFile !== "object") {
    throw new TypeError("Wrong lang file content: " + typeof langFile)
  }

  Localization.add(lang, langFile)
})
// Set default language
Localization.setDefault("ru")

// Declare explicit language type
type DefaultLang = typeof DefaultLangJSON
export interface LocalizationJSONRaw extends DefaultLang { }
