import "./LangSelector.scss"

import _ from "lodash"
import Localization from "modules/localization/controller"
import useLocalization from "modules/localization/hook"
import { useState } from "react"
import { classWithModifiers } from "utils/common"

import Button from "../../common/Button/Button"
import Icon from "../../common/Icon/Icon"



const langNames = Localization.getLangs()
const langs = langNames.map(langName => {
  const localization = Localization.storage.get(langName)
  if (!localization) throw new Error("LocalizationError: unexpected error")
  return localization.lang
})

interface LangSelectorProps { }

function LangSelector(props: LangSelectorProps) {
  const currentLang = useLocalization(trans => trans.lang)
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className="lang-selector" aria-label="Language selector">
      <Button
        iconLeft={<Icon name="language" className="lang-selector__icon" />}
        iconRight={<Icon name="drop-down-triangle" className="lang-selector__icon" />}
        onClick={() => setIsExpanded(!isExpanded)}
      >{_.capitalize(currentLang.name)}, {currentLang.currency}</Button>
      <section className={classWithModifiers("lang-selector__list", isExpanded && "expanded")} role="listbox" aria-expanded={isExpanded}>
        {langs.map((lang, index) => (
          <button
            className={classWithModifiers("lang-selector__option", currentLang.code === lang.code && "selected")}
            role="option"
            onClick={() => Localization.transit(lang.code)}
            key={index}
          >{_.capitalize(lang.name)}, {lang.currency}</button>
        ))}
      </section>
    </div>
  )
}


export default LangSelector
