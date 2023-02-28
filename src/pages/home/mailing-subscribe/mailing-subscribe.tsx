import "./mailing-subscribe.scss"

import { useTranslation } from "react-i18next"

import Subscribe from "../Subscribe/Subscribe"


function MailingSubscribe() {
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


export default MailingSubscribe
