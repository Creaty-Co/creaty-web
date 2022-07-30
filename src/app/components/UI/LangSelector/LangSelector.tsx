import "./LangSelector.scss"

import useLocale from "i18n/hooks/useLocale"
import { LocaleResourceSchema, supportedLocales } from "i18n/locales"
import _ from "lodash"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { classWithModifiers } from "utils/common"

import Button from "../../common/Button/Button"
import Icon from "../../common/Icon/Icon"
import DropDown, { DropDownOption } from "../DropDown/DropDown"

function LangSelector() {
  const parentRef = useRef<HTMLDivElement>(null)
  const { t, i18n } = useTranslation()
  const [locale, setLocale] = useLocale()
  const [isExpanded, setIsExpanded] = useState(false)
  const mouseEnterRef = useRef<NodeJS.Timeout | null>(null)
  function onMouseEnter() {
    setIsExpanded(true)
    mouseEnterRef.current && clearTimeout(mouseEnterRef.current)
  }
  function onMouseLeave() {
    mouseEnterRef.current = setTimeout(() => setIsExpanded(false), 250)
  }

  const localeOptions: DropDownOption[] = supportedLocales.map((locale, index) => {
    const resource = i18n.store.data[locale] as LocaleResourceSchema
    const lang = resource.translation.lang

    return (
      <option value={lang.name} key={index}>{_.capitalize(lang.name)}, {lang.currency}</option>
    )
  })
  return (
    <div className="lang-selector" aria-label="Language selector" ref={parentRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Button
        iconLeft={<Icon name="language" className="lang-selector__icon" />}
        iconRight={<Icon name="drop-down-triangle" className={classWithModifiers("lang-selector__icon", isExpanded && "up")} />}
        onClick={() => setIsExpanded(!isExpanded)}
      >{_.capitalize(t("lang.code"))}, {t("lang.currency")}</Button>
      <DropDown expanded={isExpanded} default={locale} onSelect={setLocale}>{localeOptions}</DropDown>
    </div>
  )
}


export default LangSelector
