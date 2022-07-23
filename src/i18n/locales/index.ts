import en from "./en.json"
import ru from "./ru.json"

const localeResources = {
  en: { translation: en },
  ru: { translation: ru }
} as const
export default localeResources

export type LocaleResourcesType = typeof localeResources
export type LocaleKeys = keyof LocaleResourcesType
