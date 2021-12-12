/**
 * Loop in object deeply and make it accessible with variables of types: string | number
 */
type ll<O extends string | number | object | undefined> = {
  [K in keyof O]: O[K] extends object ? ll<O[K]> & { [x in string | number]: O[K][keyof O[K]] } : O[K]
}

export type LocalizationJSONRaw = {}
export type LocalizationJSON = ll<LocalizationJSONRaw>

class Localization {
  private static listeners: Set<Function> = new Set
  private static absolutePath = "app/assets/lang"
  private static cache = new Map()
  public static readonly settings = require(this.absolutePath + "/settings.json")

  private static set lang(lang: string) {
    localStorage.setItem("lang", lang)
  }
  private static get lang() {
    return localStorage.getItem("lang") || this.settings.default
  }

  private static require(lang: string): LocalizationJSON {
    if (this.settings.activeLangs.includes(lang)) {
      try {
        return require(this.absolutePath + "/" + lang + ".json")
      } catch (error) {
        throw new Error("TranslationError: cannot require lang file: " + error.message)
      }
    } else {
      throw new Error("TranslationError: lang is not presented in settings.json")
    }
  }

  public static get(): LocalizationJSON {
    return this.cache.get(this.lang)
  }

  public static getLang() {
    return this.lang
  }

  public static transit(lang: string) {
    this.lang = lang

    if (!this.cache.has(lang)) {
      this.cache.set(lang, this.require(lang))
    }

    this.listeners.forEach(listener => listener())
  }

  public static onTransition(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }
}

export function Localize<Selected extends object = LocalizationJSON>(selector: (ll: LocalizationJSON) => Selected): Partial<Selected> {
  const ll = Localization.get()
  try {
    return selector(ll) || {}
  } catch (error) {
    return {}
  }
}

export default Localization
