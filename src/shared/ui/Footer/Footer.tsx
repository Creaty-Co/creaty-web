import "./Footer.scss"

import { useAppDispatch } from "@app/store"
import { PopupFormBecomeMentor, PopupFormWrapper } from "@features"
import { openModal } from "@shared/layout"
import { OuterLink } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

const CN = "footer"
const CNContainer = CN + "-container"
const CNCopyright = CN + "-copyright"

const CNLinks = CN + "-links"
const { getElement } = bem(CNLinks)

export interface IFooter {
  className?: string
}

export const Footer: FC<IFooter> = ({ className }) => {
  const { t } = useTranslation("translation", { keyPrefix: "footer" })
  const dispatch = useAppDispatch()

  return (
    <footer className={cn(CN, className)}>
      <div className={CNContainer}>
        <div className={CNLinks}>
          <div>
            <img src="/static/icons/logo.svg" alt="logo" className={getElement("logo")} />

            <Link className="ghost" to="/" />
          </div>

          <div className={getElement("container")}>
            <div className={getElement("group")}>
              <div className={getElement("title")}>{t("linkGroups.service")}</div>

              <Link to="/mentors" className="document__link">
                {t("links.mentors")}
              </Link>

              <button
                className="document__link"
                type="button"
                onClick={() => dispatch(openModal(<PopupFormBecomeMentor />))}
              >
                {t("links.becomeMentor")}
              </button>

              <button
                className="document__link"
                type="button"
                onClick={() => dispatch(openModal(<PopupFormWrapper formType="choose_mentor" />))}
              >
                {t("links.pickMentor")}
              </button>
            </div>

            <div className={getElement("group")}>
              <div className={getElement("title")}>{t("linkGroups.docs")}</div>
              <OuterLink className="document__link" linkHref="user_agreement" translateType="terms" />
              <OuterLink className="document__link" linkHref="privacy_policy" translateType="privacyPolicy" />
              <OuterLink className="document__link" linkHref="cookie_policy" translateType="cookiePolicy" />
            </div>

            <div className={getElement("group")}>
              <div className={getElement("title")}>{t("linkGroups.help")}</div>
              <OuterLink className="document__link" linkHref="help" translateType="support" />
            </div>
          </div>

          <div className={getElement("social")}>
            <div>
              <img src="/static/icons/facebook.svg" alt="facebook" />
              <OuterLink className="ghost" />
            </div>

            <div>
              <img src="/static/icons/instagram.svg" alt="instagram" />
              <OuterLink className="ghost" />
            </div>
          </div>
        </div>

        <div className={CNCopyright}>
          © {new Date().getFullYear()} Creaty.org — {t("desc")}
        </div>
      </div>
    </footer>
  )
}
