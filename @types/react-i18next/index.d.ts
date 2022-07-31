import "react-i18next"

import { LocaleResourceSchema } from "i18n/locales"

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: LocaleResourceSchema
  }
}
