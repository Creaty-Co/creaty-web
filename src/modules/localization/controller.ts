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

import { LocalizationJSONRaw } from "./config"

/**
 * Loop in object deeply and make it accessible with variables of types: string | number
 */
type AccessibleDeeply<O extends string | number | object | undefined> = {
  [K in keyof O]: O[K] extends object ? AccessibleDeeply<O[K]> & { [x in string | number]: O[K][keyof O[K]] } : O[K]
}

export type llType = AccessibleDeeply<LocalizationJSONRaw>

type Interceptor = (ll: llType) => llType

class Localization {
  private static defaultLanguage = navigator.language.split("-")[0]

  private static listeners: Set<Function> = new Set
  private static interceptors: Set<Interceptor> = new Set
  public static storage = new Map<string, llType>()

  public static set lang(lang: string) {
    localStorage.setItem("lang", lang)
  }
  public static get lang() {
    return localStorage.getItem("lang") || this.defaultLanguage
  }

  public static setDefault(lang: string) {
    this.defaultLanguage = lang
  }

  public static add(lang: string, data: llType) {
    try {
      this.storage.set(
        lang,
        [...this.interceptors.values()].reduce((result, next) => next(result), data)
      )
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("LocalizationInterceptorError: " + error.message)
      }

      throw error
    }
  }

  public static get(): llType | undefined {
    if (this.storage.has(this.lang)) {
      return this.storage.get(this.lang)
    }

    return this.storage.get(this.defaultLanguage)
  }

  public static getLangs(): string[] {
    return [...this.storage.keys()]
  }

  public static transit(lang: string) {
    if (!this.storage.has(lang)) {
      throw new Error("LocalizationError: this lang wasn't defined")
    }

    if (this.lang === lang) {
      return
    }

    this.lang = lang
    this.listeners.forEach(listener => listener())
  }

  public static onTransition(listener: () => void) {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  public static addInterceptor(interceptor: Interceptor) {
    this.interceptors.add(interceptor)
  }
}

export function Localize<Selected extends Record<string, unknown> = llType>(selector: (ll: llType) => Selected | undefined): Selected {
  const ll = Localization.get()
  if (!ll) throw new TypeError("LocalizeError: no localization gotten")

  const selection = selector(ll)
  if (!selection) throw new TypeError("LocalizeError: bad selector => " + selector.toString().split("=>")[1].replace(/ /g, ""))

  return selection
}

export default Localization
require("./config")
