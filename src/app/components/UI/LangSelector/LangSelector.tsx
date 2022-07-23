import "./LangSelector.scss"

import useLocale from "i18n/hooks/useLocale"
import localeResources from "i18n/locales"
import _ from "lodash"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { classWithModifiers } from "utils/common"

import Button from "../../common/Button/Button"
import Icon from "../../common/Icon/Icon"
import DropDown from "../DropDown/DropDown"

function LangSelector() {
  const parentRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
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
  return (
    <div className="lang-selector" aria-label="Language selector" ref={parentRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Button
        iconLeft={<Icon name="language" className="lang-selector__icon" />}
        iconRight={<Icon name="drop-down-triangle" className={classWithModifiers("lang-selector__icon", isExpanded && "up")} />}
        onClick={() => setIsExpanded(!isExpanded)}
      >{_.capitalize(t("lang.code"))}, {t("lang.currency")}</Button>
      <DropDown expanded={isExpanded} default={locale} onSelect={setLocale}>
        {Object.values(localeResources).map(({ translation: { lang } }, index) => (
          <option value={lang.code} key={index}>{_.capitalize(lang.name)}, {lang.currency}</option>
        ))}
      </DropDown>
      {/* <section className={classWithModifiers("lang-selector__list", isExpanded && "expanded")} role="listbox" aria-expanded={isExpanded}>
        {langs.map((lang, index) => (
          <button
            className={classWithModifiers("lang-selector__option", currentLang.code === lang.code && "selected")}
            role="option"
            onClick={() => Localization.transit(lang.code)}
            key={index}
          >{_.capitalize(lang.name)}, {lang.currency}</button>
        ))}
      </section> */}
    </div>
  )
}


export default LangSelector
