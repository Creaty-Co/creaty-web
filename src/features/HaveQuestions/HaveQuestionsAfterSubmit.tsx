import { Button } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { useTranslation } from "react-i18next"

const CN = "have-questions"
const { getElement } = bem(CN)
const element = "have-questions"
const CNElement = getElement(element)

interface IProps {
  reset(): void
}

export const HaveQuestionsAfterSubmit = ({ reset }: IProps) => {
  const { t } = useTranslation("translation", { keyPrefix: "other.forms.popupFormThanks" })

  return (
    <div className={cn(CNElement, "grid grid-cols-1 grid-rows-[auto_1fr] gap-3")}>
      <div className={cn(getElement("title"), "font--h3-bold text-black-900")}>{t("title")}</div>

      <div className={cn(getElement("desc"), "font--text-regular text-black-900")}>{t("body")}</div>

      <Button size="biggest" color="dark" type="submit" onClick={reset}>
        Reset
      </Button>
    </div>
  )
}
