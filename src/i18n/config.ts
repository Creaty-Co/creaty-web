import { initExternalResourceBackend } from "@i18n/initExternalResourceBackend"
import { initReactMarkdownPostProcess } from "@i18n/initReactMarkdownPostProcess"
import i18next from "i18next"
import { initReactI18next } from "react-i18next"

i18next
  .use(initReactMarkdownPostProcess)
  .use(initReactI18next)
  .use(initExternalResourceBackend)
  .init({
    returnNull: false,

    lng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    postProcess: ["reactMarkdownPostProcess"],
    returnObjects: true,
    supportedLngs: ["en"],
    fallbackLng: "en",

    react: {
      bindI18n: "react-refresh",
    },
  })

i18next.on("languageChanged", () => {
  i18next.emit("react-refresh")
})
