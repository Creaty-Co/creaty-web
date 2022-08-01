import { getPagesLocalesLanguageNamespace, putPagesLocalesLanguageNamespace } from "api/actions/pages"
import ClientAPI from "api/client"
import i18next from "i18next"
import { initReactI18next } from "react-i18next"

import initExternalResourceBackend from "./external-resource-backend"
import { LocaleKeys, supportedLocales } from "./locales"
import initReactMarkdownPostProcess from "./react-markdown-postprocess"

export const localeLocalStorage = localStorage.getItem("lang") as LocaleKeys | null
export const localeNavigator = window.navigator.language.split("-")[0] as LocaleKeys
export const localeFallback: LocaleKeys = "en"
export const localeCurrent: LocaleKeys = localeLocalStorage || localeNavigator || localeFallback

i18next
  .use(initReactMarkdownPostProcess)
  .use(initReactI18next)
  .use(initExternalResourceBackend)
  .init({
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
      async get(language, namespace) {
        const response = await ClientAPI.query(getPagesLocalesLanguageNamespace(language, namespace))

        if (response.error) throw response.errorObject
        if (response.payload == null) throw new Error("response.payload is empty")

        return response.payload
      },
      async put(language, namespace, data) {
        const response = await ClientAPI.query(putPagesLocalesLanguageNamespace(language, namespace, data))

        if (response.error) return response.errorObject
        if (response.payload == null) return new Error("response.payload is empty")
      },
    }
  })

i18next.on("languageChanged", () => {
  i18next.emit("react-refresh")
})

