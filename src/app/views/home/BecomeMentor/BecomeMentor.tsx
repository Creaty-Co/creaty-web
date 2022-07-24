import "./BecomeMentor.scss"

import { getPagesLinksDocuments } from "api/actions/pages"
import Button from "app/components/common/Button/Button"
import PopupForm from "app/components/popups/PopupForm"
import { PageLinkType } from "interfaces/types"
import { Modal } from "modules/modal/controller"
import { useQuery } from "react-fetching-library"
import { useTranslation } from "react-i18next"


function BecomeMentor() {
  const { t } = useTranslation("translation", { keyPrefix: "views.home.becomeMentor" })
  const { error, payload } = useQuery(getPagesLinksDocuments)
  const links = payload?.results.reduce<Record<PageLinkType["type"], PageLinkType>>((result, next) => ({ ...result, [next.type]: next }), {} as never)
  return (
    <div className="become-mentor">
      <div className="become-mentor__container">
        <div className="become-mentor__info">
          <h2 className="become-mentor__title heading">{t("title")}</h2>
          <ul className="become-mentor__desc">
            {t("descPoints").map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="become-mentor__bottom">
          <Button size="big" color="dark" onClick={() => Modal.open(PopupForm, { type: "become_mentor", weak: true })}>{t("button")}</Button>
          <div className="become-mentor__terms">{t("terms", { policyLink: links?.privacy_policy.url })}</div>
        </div>
      </div>
      <div className="become-mentor__images">
        <img src="/static/images/mentor-cards/1.png" alt="stock image of mentor" />
        <img src="/static/images/mentor-cards/2.png" alt="stock image of mentor" />
        <img src="/static/images/mentor-cards/3.png" alt="stock image of mentor" />
      </div>
    </div>
  )
}


export default BecomeMentor
