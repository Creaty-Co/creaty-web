import i18next from "i18next"
import { initReactI18next } from "react-i18next"

import { LocaleKeys, supportedLocales } from "./locales"
import initReactMarkdownPostProcess from "./react-markdown-postprocess"

export const localeLocalStorage = localStorage.getItem("lang") as LocaleKeys | null
export const localeNavigator = window.navigator.language.split("-")[0] as LocaleKeys
export const localeFallback: LocaleKeys = "en"
export const localeCurrent: LocaleKeys = localeLocalStorage || localeNavigator || localeFallback

i18next
  .use(initReactMarkdownPostProcess)
  .use(initReactI18next)
  .init({
    lng: localeCurrent,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    postProcess: ["reactMarkdownPostProcess"],
    returnObjects: true,
    supportedLngs: supportedLocales
  })

