import "./HelpSocial.scss"

import { OuterLink } from "@shared/ui"
import { bem } from "@shared/utils"
import { useTranslation } from "react-i18next"

const CN = "help-social"
const { getElement } = bem(CN)

export function HelpSocial() {
  const { t } = useTranslation("translation", { keyPrefix: "components.helpSocial" })

  return (
    <div className={CN}>
      <div className={getElement("text")}>{t("text")}</div>
      <div className={getElement("splitter")} />

      <div>
        <OuterLink to="http://m.me/103451835157882/">
          <img className={getElement("icon")} alt="social network" src="/static/icons/social-facebook-messenger.svg" />
        </OuterLink>
      </div>
      <div>
        <OuterLink to="https://wa.me/972533231644">
          <img className={getElement("icon")} alt="social network" src="/static/icons/social-whatsapp-messenger.svg" />
        </OuterLink>
      </div>
      <div>
        <OuterLink to="https://t.me/CreatyClub">
          <img className={getElement("icon")} alt="social network" src="/static/icons/social-telegram-messenger.svg" />
        </OuterLink>
      </div>
    </div>
  )
}
