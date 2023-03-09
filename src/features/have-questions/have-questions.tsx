import "./have-questions.scss"

import { useAppSelector } from "@app/store"
import { ContactForm } from "@features"
import { selectContactFormByType } from "@features/contact-form" 
import { bem } from "@shared/utils"
import cn from "classnames"
import { useTranslation } from "react-i18next"

import { HaveQuestionsAfterSubmit } from "./have-questions.after-submit"

const CN = "have-questions"
const { getElement, getModifier } = bem(CN)

export function HaveQuestions() {
  const { t } = useTranslation("translation", { keyPrefix: "components.haveQuestions" })
  const form = useAppSelector(selectContactFormByType("still_questions"))

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
        { !form.submitted && 
          <ContactForm type="still_questions" className={getElement("form")}/>
        }

        { form.submitted &&
          <HaveQuestionsAfterSubmit />
        }
      </div>
    </div>
  )
}
