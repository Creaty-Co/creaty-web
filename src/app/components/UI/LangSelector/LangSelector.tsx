import "./LangSelector.scss"

import useClickAway from "hooks/useClickAway"
import _ from "lodash"
import Localization from "modules/localization/controller"
import useLocalization from "modules/localization/hook"
import { useRef, useState } from "react"
import { classWithModifiers } from "utils/common"

import Button from "../../common/Button/Button"
import Icon from "../../common/Icon/Icon"
import DropDown from "../DropDown/DropDown"



const langNames = Localization.getLangs()
const langs = langNames.map(langName => {
  const localization = Localization.storage.get(langName)
  if (!localization) throw new Error("LocalizationError: unexpected error")
  return localization.lang
})

function LangSelector() {
  const parentRef = useRef<HTMLDivElement>(null)
  const currentLang = useLocalization(ll => ll.lang)
  const [isExpanded, setIsExpanded] = useState(false)
  useClickAway(parentRef, () => setIsExpanded(false))
  return (
    <div className="lang-selector" aria-label="Language selector" ref={parentRef} onMouseEnter={() => setIsExpanded(true)}>
      <Button
        iconLeft={<Icon name="language" className="lang-selector__icon" />}
        iconRight={<Icon name="drop-down-triangle" className={classWithModifiers("lang-selector__icon", isExpanded && "up")} />}
        onClick={() => setIsExpanded(!isExpanded)}
      >{_.capitalize(currentLang.name)}, {currentLang.currency}</Button>
      <DropDown<string> expanded={isExpanded} default={currentLang.code} onChange={lang => Localization.transit(lang)}>
        {langs.map((lang, index) => (
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
