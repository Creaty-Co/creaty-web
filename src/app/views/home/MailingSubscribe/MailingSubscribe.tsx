import "./MailingSubscribe.scss"

import useLocalization from "modules/localization/hook"

import Subscribe from "../Subscribe/Subscribe"


function MailingSubscribe() {
  const ll = useLocalization(ll => ll.views.home.mailingSubscribe)
  return (
    <div className="mailing-subscribe">
      <h3 className="mailing-subscribe__title heading">{ll.title}</h3>
      <img src="/static/images/curvy-arrow.svg" className="mailing-subscribe__arrow" />
      <div className="mailing-subscribe__form">
        <Subscribe />
      </div>
    </div>
  )
}


export default MailingSubscribe
