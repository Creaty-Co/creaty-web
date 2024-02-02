import "./HaveQuestions.scss"

import { FormStillQuestions } from "@components/forms/old/Form/FormStillQuestions"
import { bem } from "@shared/utils/common"
import cn from "classnames"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { FormStillQuestions } from "../forms/old/Form/FormStillQuestions"
import { HaveQuestionsAfterSubmit } from "./HaveQuestionsAfterSubmit"

const CN = "have-questions"
const { getElement, getModifier } = bem(CN)

export function HaveQuestions() {
  const { t } = useTranslation("translation", { keyPrefix: "components.haveQuestions" })
  const [step, setStep] = useState<number>(1)

  return (
    <div className={CN}>
      <div className={getElement("info")}>
        <div className={cn(getElement("title"), "heading")}>{t("title")}</div>

        <p className={getElement("desc")}>{t("desc")}</p>
      </div>

      <div className={getModifier(getElement("container"), "form")}>
        {step === 1 && <FormStillQuestions handleSubmit={() => setStep(2)} />}
        {step === 2 && <HaveQuestionsAfterSubmit reset={() => setStep(1)} />}
      </div>
    </div>
  )
}
