import "./Header.scss"

import { useAppDispatch, useAppSelector } from "@app/store"
import { EFormIds, PopupFormBecomeMentor, PopupFormWrapper } from "@features"
import { AuthDDL } from "@features/auth/AuthDDL/AuthDDL"
import { updateSearch } from "@features/search"
import { selectIsAuth } from "@features/users/users.slice"
import { openModal } from "@shared/layout"
import { Button, ButtonLink, Icon } from "@shared/ui"
import { bem, classMerge } from "@shared/utils"
import { memo, useEffect, useState } from "react"
import ReactGA from "react-ga4"
import { useTranslation } from "react-i18next"
import { Link, useLocation, useNavigate } from "react-router-dom"

export interface IHeader {
  className?: string
}

const CN = "header"
const { getElement, getModifier } = bem(CN)

function Header({ className }: IHeader) {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuth = useAppSelector(selectIsAuth)

  const { t } = useTranslation("translation", { keyPrefix: "header" })
  const [expanded, setExpanded] = useState(false)

  const handleLoginClick = () => navigate("/login")
  const handleSignUpClick = () => navigate("/sign-up")
  const handleLogoClick = () => dispatch(updateSearch({ topic: undefined, tag: undefined, focused: false }))

  useEffect(
    () =>
      ReactGA.send({
        hitType: "pageview",
        view: location.pathname + location.search + location.hash,
      }),
    [location]
  )

  return (
    <header className={classMerge(CN, className)}>
      <div className={getElement("container")}>
        <div aria-label="Home">
          <img src="/static/icons/logo.svg" alt="logo" className={getModifier(getElement("logo"), "mobile")} />
          <img src="/static/images/logo.svg" alt="logo" className={getElement("logo")} />
          <Link className="ghost" to="/" onClick={handleLogoClick} />
        </div>

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

            <Button size="small" onClick={() => dispatch(openModal(<PopupFormBecomeMentor />))}>
              {t("menu.becomeMentor")}
            </Button>
          </div>

          <Button
            outline
            size="small"
            color="green"
            onClick={() => dispatch(openModal(<PopupFormWrapper formType={EFormIds.GET_HELP} />))}
          >
            {t("findMentor")}
          </Button>

          {isAuth ? (
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
}

export const MemoHeader = memo(Header)
