import i18n from "i18next"
import { Dispatch, useEffect } from "react"
import { useLocalStorage } from "react-use"

import { localeDefault } from "../config"
import { LocaleKeys } from "../locales"

type Locale = LocaleKeys | (string & {})
type SetLocale = Dispatch<LocaleKeys>

function useLocale(): [Locale, SetLocale] {
  const [locale, setLocale] = useLocalStorage<Locale | null>("lang")
  useEffect(() => {
    i18n.changeLanguage(locale || localeDefault)
  }, [locale])
  return [locale || localeDefault, setLocale]
}

export default useLocale
