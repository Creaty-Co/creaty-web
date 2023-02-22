import "./Header.scss"

import AdminTopbar from "app/components/admin/AdminTopbar"
import Button from "app/components/common/Button/Button"
import ButtonLink from "app/components/common/Button/ButtonLink"
import Icon from "app/components/common/Icon/Icon"
import PopupForm from "app/components/popups/PopupForm"
import { Modal } from "modules/modal/controller"
import { useEffect, useState } from "react"
import ReactGA from "react-ga4"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { updateSearch } from "redux/reducers/search"
import { bem, classMerge } from "utils/common"

interface HeaderProps {
  className?: string
}

const CN = "header"
const { getElement, getModifier } = bem(CN)

export default function Header({
  className
}: HeaderProps) {
  const { t } = useTranslation("translation", { keyPrefix: "header" })
  const [expanded, setExpanded] = useState(false)
  const location = useLocation()

  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(updateSearch({ topic: undefined, tag: undefined, focused: false }))
  }

  useEffect(() => ReactGA.send({
    hitType: "pageview",
    view: location.pathname + location.search + location.hash
  }), [location])
  
  return (
    <header className={classMerge(CN, className)}>

      {/* <AdminTopbar /> */}

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
            
            <Button
              size="small"
              onClick={() => Modal.open(PopupForm, { type: "become_mentor", weak: true })}
            >{t("menu.becomeMentor")}</Button>
          </div>

          <Button 
            outline size="small" color="green"
            onClick={() => Modal.open(PopupForm, { type: "choose_mentor", weak: true })}
          >{t("findMentor")}</Button>

          <div className={getElement("separator")}></div>

          <div className={getElement("sign-group")}>
            <Button size="little"
              className={getElement("log-in")}

              onClick={() => console.log("log-in")}
            >Log In</Button>

            <Button size="little"
              className={getElement("sign-up")}

              onClick={() => console.log("sign-up")}
            >Sign up</Button>
          </div>
        </div>
        
      </div>
    </header>
  )
}