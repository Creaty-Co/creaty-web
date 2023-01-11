import "./HaveQuestions.scss"

import { useTranslation } from "react-i18next"

import ContactForm from "../ContactForm/ContactForm"


function HaveQuestions() {
  const { t } = useTranslation("translation", { keyPrefix: "components.haveQuestions" })
  const { t: tForm } = useTranslation("translation", { keyPrefix: "other.forms.still_questions" })
  return (
    <div className="have-questions">
      <div className="have-questions__info">
        <h2 className="have-questions__title heading">{t("title")}</h2>
        <p className="have-questions__desc">{t("desc")}</p>
      </div>
      <div className="have-questions__form">
        <ContactForm type="still_questions" submitText={tForm("submitText")} />
      </div>
    </div>
  )
}


export default HaveQuestions
