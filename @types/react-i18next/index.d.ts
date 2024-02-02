import "react-i18next"

import { LocaleResourceSchema } from "@i18n/locales."

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: LocaleResourceSchema
  }
}

declare module "i18next" {
  interface BackendOptions {
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