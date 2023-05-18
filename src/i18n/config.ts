// import { getPagesLocalesLanguageNamespace, putPagesLocalesLanguageNamespace } from "api/actions/pages"
// import ClientAPI from "api/client"
import i18next, { BackendOptions } from "i18next"
import { initReactI18next } from "react-i18next"

import initExternalResourceBackend from "./external-resource-backend"
import { LocaleKeys, supportedLocales } from "./locales"
import initReactMarkdownPostProcess from "./react-markdown-postprocess"

export const localeLocalStorage = localStorage.getItem("lang") as LocaleKeys | null
export const localeNavigator = window.navigator.language.split("-")[0] as LocaleKeys
export const localeFallback: LocaleKeys = "en"
// export const localeCurrent: LocaleKeys = localeLocalStorage || localeNavigator || localeFallback
export const localeCurrent: LocaleKeys = localeFallback

const API = process.env.REACT_APP_API_HOST

i18next
  .use(initReactMarkdownPostProcess)
  .use(initReactI18next)
  .use(initExternalResourceBackend)
  .init<BackendOptions>({
    returnNull: false,
    
    lng: localeCurrent,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    postProcess: ["reactMarkdownPostProcess"],
    returnObjects: true,
    supportedLngs: supportedLocales,

    react: {
      bindI18n: "react-refresh"
    },

    backend: {
      async get(language: string, namespace: string) {
        const response = await fetch(`${API}/pages/locales/${language}/${namespace}.json`)
        const data = await response.json()

        return data
      },
    }
  })

i18next.on("languageChanged", () => {
  i18next.emit("react-refresh")
})

