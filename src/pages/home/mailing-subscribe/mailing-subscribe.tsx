import "./mailing-subscribe.scss"

import { Subscribe } from "@shared/ui"
import { useTranslation } from "react-i18next"


export function MailingSubscribe() {
  const { t } = useTranslation("translation", { keyPrefix: "views.home.mailingSubscribe" })
  return (
    <div className="mailing-subscribe">
      <div className="mailing-subscribe__title heading">{t("title")}</div>
      <img src="/static/images/curvy-arrow.svg" className="mailing-subscribe__arrow" />
      <div className="mailing-subscribe__form">
        <Subscribe />
      </div>
    </div>
  )
}
