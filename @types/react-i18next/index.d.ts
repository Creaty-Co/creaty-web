import "react-i18next"

import { LocaleResourcesType } from "i18n/locales"

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: LocaleResourcesType["en"] // Default language
  }
}