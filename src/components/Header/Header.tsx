import "./Header.scss"

import { useAppDispatch, useAppSelector } from "@app/store"
import { EFormIds, PopupFormBecomeMentor, PopupFormWrapper } from "@features"
import { authPassedS, isAdminS, isMentorS } from "@features/auth/auth.slice"
import { updateSearch } from "@features/search"
import { openModal } from "@shared/layout"
import { Button, ButtonLink, Icon } from "@shared/ui"
import { bem } from "@shared/utils"
import { memo, useEffect, useState } from "react"
import ReactGA from "react-ga4"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"

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
  const handleLogoClick = () => {
    dispatch(updateSearch({ topic: undefined, tag: undefined, focused: false }))
    navigate("/")
  }

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
          <Button size="little" className="admin" onClick={handleAdminClick}>
            Admin
          </Button>
        )}
        <Icon
          name={expanded ? "cross" : "menu"}
          className={getElement("trigger")}
          onClick={() => setExpanded(!expanded)}
        />

        <div className={getModifier(getElement("right"), expanded && "expanded")}>
          <div className={getElement("menu")}>
            <ButtonLink to="/mentors" size="small">
              {t("menu.mentors")}
            </ButtonLink>

            {(!isMentor || !authPassed) && (
              <Button size="small" onClick={() => dispatch(openModal(<PopupFormBecomeMentor />))}>
                {t("menu.becomeMentor")}
              </Button>
            )}
          </div>

          <Button
            outline
            size="small"
            color="green"
            onClick={() => dispatch(openModal(<PopupFormWrapper formType={EFormIds.GET_HELP} />))}
          >
            {t("findMentor")}
          </Button>

          {authPassed ? (
            <AuthDDL />
          ) : (
            <>
              <div className={getElement("separator")}></div>
              <div className={getElement("sign-group")}>
                <Button size="little" className="login" onClick={handleLoginClick}>
                  Login
                </Button>
                <Button size="little" className="sign-up" onClick={handleSignUpClick}>
                  Sign up
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
})
