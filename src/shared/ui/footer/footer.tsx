import "./footer.scss"

import { useAppDispatch } from "@app/store"
import { PopupForm } from "@features"
import { PageLinkType, useGetPagesLinksDocumentsQuery } from "@shared/api"
import { open } from "@shared/layout"
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
const { getElement: getElementLinks } = bem(CNLinks)

export interface IFooter {
  className?: string
}

export const Footer: FC<IFooter> = ({ className }) => {
  const { t } = useTranslation("translation", { keyPrefix: "footer" })
  const { data } = useGetPagesLinksDocumentsQuery()
  const dispatch = useAppDispatch()

  const links = data?.results.reduce<Record<PageLinkType["type"], PageLinkType>>(
    (result, next) => ({ ...result, [next.type]: next }),
    {} as never
  )

  return (
    <footer className={cn(CN, className)}>
      <div className={CNContainer}>
        <div className={CNLinks}>
          <div>
            <img src="/static/icons/logo.svg" alt="logo" className={getElementLinks("logo")} />

            <Link className="ghost" to="/" />
          </div>

          <div className={getElementLinks("container")}>
            <div className={getElementLinks("group")}>
              <div className={getElementLinks("title")}>{t("linkGroups.service")}</div>

              <Link to="/mentors" className={getElementLinks("link")}>
                {t("links.mentors")}
              </Link>

              <button
                className={getElementLinks("link")}
                type="button"
                onClick={() => dispatch(open(<PopupForm type="become_mentor" />))}>
                {t("links.becomeMentor")}
              </button>

              <button
                className={getElementLinks("link")}
                type="button"
                onClick={() => dispatch(open(<PopupForm type="choose_mentor" />))}>
                {t("links.pickMentor")}
              </button>
            </div>

            <div className={getElementLinks("group")}>
              <div className={getElementLinks("title")}>{t("linkGroups.docs")}</div>

              <OuterLink className={getElementLinks("link")} to={links?.user_agreement.url || ""} eventLabel="terms">
                {t("links.terms", { policyLink: links?.privacy_policy.url })}
              </OuterLink>

              <OuterLink
                className={getElementLinks("link")}
                to={links?.privacy_policy.url || ""}
                eventLabel="privacyPolicy">
                {t("links.privacyPolicy")}
              </OuterLink>

              <OuterLink
                className={getElementLinks("link")}
                to={links?.cookie_policy.url || ""}
                eventLabel="cookiePolicy">
                {t("links.cookiePolicy")}
              </OuterLink>
            </div>

            <div className={getElementLinks("group")}>
              <div className={getElementLinks("title")}>{t("linkGroups.help")}</div>

              <OuterLink className={getElementLinks("link")} to={links?.help.url || ""} eventLabel="help">
                {t("links.support")}
              </OuterLink>
            </div>
          </div>

          <div className={getElementLinks("social")}>
            <div>
              <img src="/static/icons/facebook.svg" alt="facebook" />
              <OuterLink to={links?.facebook.url || ""} className="ghost" eventLabel="facebook" />
            </div>

            <div>
              <img src="/static/icons/instagram.svg" alt="instagram" />
              <OuterLink to={links?.instagram.url || ""} className="ghost" eventLabel="instagram" />
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
