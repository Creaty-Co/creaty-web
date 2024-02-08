import { initReactMarkdownPostProcess } from "@i18n/initReactMarkdownPostProcess"
import i18next from "i18next"
import Backend from "i18next-http-backend"
import { initReactI18next } from "react-i18next"

const API = process.env.REACT_APP_API_HOST

export const initI18 = () => {
  i18next
    .use(Backend)
    .use(initReactI18next)
    .use(initReactMarkdownPostProcess)
    .init({
      lng: "en",
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
      postProcess: ["reactMarkdownPostProcess"],
      returnObjects: true,
      supportedLngs: ["en"],
      fallbackLng: "en",

      react: {
        bindI18n: "react-refresh",
      },
      backend: {
        loadPath: `${API}/pages/locales/en/translation.json`,
      },
    })

  i18next.on("languageChanged", () => {
    i18next.emit("react-refresh")
  })
}