import { BackendModule, Resource } from "i18next"

const API = process.env.REACT_APP_API_HOST
const resources: Resource = {}

export const initExternalResourceBackend: BackendModule = {
  type: "backend",
  async init() {
    // const namespace = options.defaultNS || "translation"
  },
  async read(language, namespace, callback) {
    try {
      if (!(language in resources)) {
        const response = await fetch(`${API}/pages/locales/${language}/${namespace}.json`)
        const resourceLanguage = await response.json()

        resources[language] = {
          ...resources[language],
          [namespace]: resourceLanguage,
        }
      }

      const resourceKey = resources[language][namespace]

      callback(null, resourceKey)
    } catch (error) {
      callback(error as never, null)
    }
  },
}
