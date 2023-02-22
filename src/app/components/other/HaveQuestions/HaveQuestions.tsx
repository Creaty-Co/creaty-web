import "./HaveQuestions.scss"

import Formus from "app/components/common/Formus/Formus"
// import ContactForm from "app/components/other/ContactForm/ContactForm"
import { useTranslation } from "react-i18next"
import { bem, classMerge } from "utils/common"

const CN = "have-questions"
const { getElement, getModifier } = bem(CN)

function HaveQuestions() {
  const { t } = useTranslation("translation", { keyPrefix: "components.haveQuestions" })
  // const { t: tForm } = useTranslation("translation", { keyPrefix: "other.forms.still_questions" })

  return (
    <div className={CN}>
      
      <div className={getElement("info")}>
        <div className={classMerge(getElement("title"), "heading")}>{t("title")}</div>
        <p className={getElement("desc")}>{t("desc")}</p>
      </div>

      <div className={getModifier(getElement("container"), "form")}>
        <Formus className={getElement("form")} />
        {/* <ContactForm type="still_questions" submitText={tForm("submitText")} /> */}
      </div>
    </div>
  )
}


export default HaveQuestions
