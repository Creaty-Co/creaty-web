import { PopupLayout } from "@shared/ui/PopupLayout/PopupLayout"
import { useTranslation } from "react-i18next"

export const PopupFormThanks = () => {
  const { t } = useTranslation("translation", { keyPrefix: "other.forms.popupFormThanks" })

  return (
    <PopupLayout title={t("title")}>
      <span className="text-black-900 font--h3-regular pb-3">{t("body")}</span>
    </PopupLayout>
  )
}
