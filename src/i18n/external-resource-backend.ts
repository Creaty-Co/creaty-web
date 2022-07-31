import i18next, { BackendModule, Resource } from "i18next"

declare module "i18next" {
  interface PluginOptions {
    backend: {
      /**
       * GET request
       */
      get(language: string, namespace: string): Promise<ResourceKey>
      /**
       * POST, PUT, PATCH Request.
       * 
       * @returns `Error`
       */
      put?(language: string, namespace: string, data: ResourceKey): Promise<Error | null>
    }
  }
}

const resources: Resource = {}

async function getResourceLanguage(language: string, namespace: string) {
  const resourceLanguage = await i18next.options.backend.get(language, namespace)
  return resourceLanguage
}

const initExternalResourceBackend: BackendModule = {
  type: "backend",
  async init() {
    // console.log(1)
    // const language = i18next.language
    // const namespace = options.defaultNS || "translation"
  },
  async read(language, namespace, callback) {
    try {
      if (!(language in resources)) {
        const resourceLanguage = await getResourceLanguage(language, namespace)

        resources[language] = {
          ...resources[language],
          [namespace]: resourceLanguage
        }
        // resources[language][namespace] = resourceLanguage
      }

      const resourceKey = resources[language][namespace]

      callback(null, resourceKey)
    } catch (error) {
      callback(error as never, null)
    }
  }
}

export default initExternalResourceBackend
