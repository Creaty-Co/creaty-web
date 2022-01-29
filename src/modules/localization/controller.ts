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
type ll<O extends string | number | object | undefined> = {
  [K in keyof O]: O[K] extends object ? ll<O[K]> & { [x in string | number]: O[K][keyof O[K]] } : O[K]
}

export type LocalizationJSON = ll<LocalizationJSONRaw>

class Localization {
  private static defaultLanguage = "en"

  private static listeners: Set<Function> = new Set
  private static storage = new Map<string, LocalizationJSON>()

  private static set lang(lang: string) {
    localStorage.setItem("lang", lang)
  }
  private static get lang() {
    return localStorage.getItem("lang") || this.defaultLanguage
  }

  public static setDefault(lang: string) {
    this.defaultLanguage = lang
  }

  public static add(lang: string, data: LocalizationJSON) {
    this.storage.set(lang, data)
  }

  public static get(): LocalizationJSON | undefined {
    if (this.storage.has(this.lang)) {
      return this.storage.get(this.lang)
    }

    return this.storage.get(this.defaultLanguage)
  }

  public static transit(lang: string) {
    if (!this.storage.has(lang)) {
      throw new Error("LocalizationError: this lang wasn't defined")
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
}

export function Localize<Selected extends Record<string, unknown> = LocalizationJSON>(selector: (ll?: LocalizationJSON) => Selected | undefined): Partial<Selected> {
  try {
    const ll = Localization.get()
    return selector(ll) || {}
  } catch (error) {
    return {}
  }
}

export default Localization
require("./config")
