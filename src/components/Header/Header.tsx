import "./Header.scss"

import { Icon } from "@shared/ui/Icon/Icon"
import { SharedButton } from "@shared/ui/buttons/SharedButton"
import { SharedButtonLink } from "@shared/ui/buttons/SharedButtonLink"
import { bem } from "@shared/utils/common"
import { memo, useEffect, useState } from "react"
import ReactGA from "react-ga4"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"
import { authPassedS, isAdminS, isMentorS } from "src/store/auth/auth.slice"
import { EFormIds } from "src/store/forms/form.types"
import { openModal } from "src/store/modalContainer.slice"
import { useAppDispatch, useAppSelector } from "src/store/store"

import { PopupFormBecomeMentor } from "../forms/old/PopupForm/PopupFormBecomeMentor"
import { PopupFormWrapper } from "../forms/old/PopupForm/PopupFormWrapper"
import { AuthDDL } from "./AuthDDL/AuthDDL"

const CN = "header"
const { getElement, getModifier } = bem(CN)

export const Header = memo(function Header() {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const authPassed = useAppSelector(authPassedS)
  const isAdmin = useAppSelector(isAdminS)
  const isMentor = useAppSelector(isMentorS)

  const { t } = useTranslation("translation", { keyPrefix: "header" })
  const [expanded, setExpanded] = useState(false)

  const handleLoginClick = () => navigate("/login")
  const handleAdminClick = () => navigate("/admin")
  const handleSignUpClick = () => navigate("/sign-up")
  const handleLogoClick = () => navigate("/")

  useEffect(
    () =>
      ReactGA.send({
        hitType: "pageview",
        view: location.pathname + location.search + location.hash,
      }),
    [location]
  )

  return (
    <header className={CN}>
      <div className={getElement("container")}>
        <div aria-label="Home" onClick={handleLogoClick}>
          <img
            src="/static/icons/logo.svg"
            alt="logo"
            className={getModifier(getElement("logo"), "mobile")}
            onClick={handleLogoClick}
          />
          <img src="/static/images/logo.svg" alt="logo" className={getElement("logo")} />
        </div>
        {isAdmin && (
          <SharedButton size="little" className="admin" onClick={handleAdminClick}>
            Admin
          </SharedButton>
        )}
        <Icon
          name={expanded ? "cross" : "menu"}
          className={getElement("trigger")}
          onClick={() => setExpanded(!expanded)}
        />

        <div className={getModifier(getElement("right"), expanded && "expanded")}>
          <div className={getElement("menu")}>
            <SharedButtonLink to="/mentors" size="small">
              {t("menu.mentors")}
            </SharedButtonLink>

            {(!isMentor || !authPassed) && (
              <SharedButton size="small" onClick={() => dispatch(openModal(<PopupFormBecomeMentor />))}>
                {t("menu.becomeMentor")}
              </SharedButton>
            )}
          </div>

          <SharedButton
            outline
            size="small"
            color="green"
            onClick={() => dispatch(openModal(<PopupFormWrapper formType={EFormIds.GET_HELP} />))}
          >
            {t("findMentor")}
          </SharedButton>

          {authPassed ? (
            <AuthDDL />
          ) : (
            <>
              <div className={getElement("separator")}></div>
              <div className={getElement("sign-group")}>
                <SharedButton size="little" className="login" onClick={handleLoginClick}>
                  Login
                </SharedButton>
                <SharedButton size="little" className="sign-up" onClick={handleSignUpClick}>
                  Sign up
                </SharedButton>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
})
