import "./header.scss"

import { useAppDispatch } from "@app/store"
import { PopupForm } from "@features"
import { updateSearch } from "@features/search"
import { open } from "@shared/layout/modal"
import { Button, ButtonLink, Icon } from "@shared/ui"
import { bem, classMerge } from "@shared/utils"
import { useEffect, useState } from "react"
import ReactGA from "react-ga4"
import { useTranslation } from "react-i18next"
import { Link, useLocation } from "react-router-dom"

import { SignUp } from "../../features/SignUp/SignUp"

export interface IHeader {
  className?: string
}

const CN = "header"
const { getElement, getModifier } = bem(CN)

export function Header({
  className
}: IHeader) {
  const { t } = useTranslation("translation", { keyPrefix: "header" })
  const [expanded, setExpanded] = useState(false)
  const location = useLocation()

  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(updateSearch({ topic: undefined, tag: undefined, focused: false }))
  }

  useEffect(() => ReactGA.send({
    hitType: "pageview",
    view: location.pathname + location.search + location.hash
  }), [location])
  
  return (
    <header className={classMerge(CN, className)}>
      <div className={getElement("container")}>

        <div aria-label="Home">
          <img src="/static/icons/logo.svg" alt="logo" className={getModifier(getElement("logo"), "mobile")} />
          <img src="/static/images/logo.svg" alt="logo" className={getElement("logo")} />
          <Link className="ghost" to="/" onClick={handleClick} />
        </div>

        <Icon name={expanded ? "cross" : "menu"} 
          className={getElement("trigger")} 
          onClick={() => setExpanded(!expanded)} 
        />

        <div className={getModifier(getElement("right"), expanded && "expanded")}>
          <div className={getElement("menu")}>
            <ButtonLink to="/mentors"
              size="small"
            >{t("menu.mentors")}</ButtonLink>
            
            <Button size="small"
              onClick={() => dispatch(open(<PopupForm type="become_mentor" />))}
            >{t("menu.becomeMentor")}</Button>
          </div>

          <Button outline size="small" color="green"
            onClick={() => dispatch(open(<PopupForm type="choose_mentor" />))}
          >{t("findMentor")}</Button>

          <div className={getElement("separator")}></div>

          <div className={getElement("sign-group")}>
            <Button size="little"
              className={getElement("log-in")}
              onClick={() => console.log("log-in")}
            >Log In</Button>

            <SignUp/>
          </div>
        </div>
        
      </div>
    </header>
  )
}