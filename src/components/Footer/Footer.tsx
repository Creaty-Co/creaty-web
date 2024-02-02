import "./Footer.scss"

import { OuterLink } from "@shared/ui/OuterLink/OuterLink"
import { bem } from "@shared/utils/common"
import cn from "classnames"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"
import { authPassedS, isMentorS } from "src/store/auth/auth.slice"
import { EFormIds } from "src/store/forms/form.types"
import { openModal } from "src/store/modalContainer.slice"
import { useAppDispatch, useAppSelector } from "src/store/store"

import { PopupFormBecomeMentor } from "../forms/old/PopupForm/PopupFormBecomeMentor"
import { PopupFormWrapper } from "../forms/old/PopupForm/PopupFormWrapper"

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
  const navigate = useNavigate()
  const handleLogoClick = () => navigate("/")

  const authPassed = useAppSelector(authPassedS)
  const isMentor = useAppSelector(isMentorS)

  return (
    <footer className={cn(CN, className)}>
      <div className={CNContainer}>
        <div className={CNLinks}>
          <div onClick={handleLogoClick}>
            <img src="/static/icons/logo.svg" alt="logo" className={getElement("logo")} />
          </div>

          <div className={getElement("container")}>
            <div className={getElement("group")}>
              <div className={getElement("title")}>{t("linkGroups.service")}</div>

              <Link to="/mentors" className="document__link">
                {t("links.mentors")}
              </Link>

              {(!isMentor || !authPassed) && (
                <button
                  className="document__link"
                  type="button"
                  onClick={() => dispatch(openModal(<PopupFormBecomeMentor />))}
                >
                  {t("links.becomeMentor")}
                </button>
              )}

              <button
                className="document__link"
                type="button"
                onClick={() => dispatch(openModal(<PopupFormWrapper formType={EFormIds.GET_HELP} />))}
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
              <OuterLink linkHref="facebook">
                <img src="/static/icons/facebook.svg" alt="facebook" />
              </OuterLink>
            </div>

            <div>
              <OuterLink linkHref="instagram">
                <img src="/static/icons/instagram.svg" alt="instagram" />
              </OuterLink>
            </div>
          </div>
        </div>

        <div className={CNCopyright}>
          © {new Date().getFullYear()} {t("desc")}
        </div>
      </div>
    </footer>
  )
}
