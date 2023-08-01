import i18next, { BackendOptions, ResourceKey } from "i18next"
import { initReactI18next } from "react-i18next"

import initExternalResourceBackend from "./initExternalResourceBackend"
import initReactMarkdownPostProcess from "./initReactMarkdownPostProcess"
import { LocaleKeys, supportedLocales } from "./locales"

export const localeLocalStorage = localStorage.getItem("lang") as LocaleKeys | null
export const localeNavigator = window.navigator.language.split("-")[0] as LocaleKeys
export const localeFallback: LocaleKeys = "en"
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
      bindI18n: "react-refresh",
    },

    backend: {
      async get(language: string, namespace: string) {
        const response = await fetch(`${API}/pages/locales/${language}/${namespace}.json`)
        const data = await response.json()

        return data
      },
      async put(language: string, namespace: string, data: ResourceKey) {
        const lSAccessToken = localStorage.getItem("accessToken") || ""

        const updateJson = async (token: string) => {
          return await fetch(`${API}/pages/locales/${language}/${namespace}.json/`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(data),
          })
        }
        const response = await updateJson(lSAccessToken)

        if (response.status === 401) {
          const lSRefreshToken = localStorage.getItem("refreshToken")

          const refreshResult = await fetch(`${API}/token/refresh/`, {
            headers: {
              "content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ refresh: lSRefreshToken }),
          })

          const jsonData = await refreshResult.json()

          if (jsonData) {
            const { access, refresh } = jsonData as { access: string; refresh: string }
            localStorage.setItem("accessToken", access)
            localStorage.setItem("refreshToken", refresh)
            await updateJson(access)
          } else {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
          }
        }
        if (response.status === 204) return null
        return new Error("Response payload is empty. There is some problem with the request")
      },
    },
  })

i18next.on("languageChanged", () => {
  i18next.emit("react-refresh")
})
