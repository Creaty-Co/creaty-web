import "./have-questions.scss"

import { ContactForm } from "@features"
import { bem } from "@shared/utils"
import cn from "classnames"
import { useTranslation } from "react-i18next"

const CN = "have-questions"
const { getElement, getModifier } = bem(CN)

export function HaveQuestions() {
  const { t } = useTranslation("translation", { keyPrefix: "components.haveQuestions" })
  // const { t: tForm } = useTranslation("translation", { keyPrefix: "other.forms.still_questions" })

  return (
    <div className={CN}>
      
      <div className={getElement("info")}>
        <div className={cn(getElement("title"), "heading")}>
          {t("title")}
        </div>
        
        <p className={getElement("desc")}>
          {t("desc")}
        </p>
      </div>

      <div className={getModifier(getElement("container"), "form")}>
        <ContactForm type="still_questions" className={getElement("form")}/>
        {/* <Formus className={getElement("form")} /> */}
        {/* <ContactForm type="still_questions" submitText={tForm("submitText")} /> */}
      </div>
    </div>
  )
}
