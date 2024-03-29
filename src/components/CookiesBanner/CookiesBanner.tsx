import "./CookiesBanner.scss"

import { SharedButton } from "@shared/ui/buttons/SharedButton"
import { OuterLink } from "@shared/ui/OuterLink/OuterLink"
import { bem, classWithModifiers } from "@shared/utils/common"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"

const CN = "cookies"
const { getElement } = bem(CN)

export function CookiesBanner() {
  const { t } = useTranslation("translation", { keyPrefix: "components.cookies" })

  const cookiesRef = useRef(localStorage.getItem("cookies"))
  const [cookies, setCookies] = useState("")

  const onClick = () => {
    setCookies("accept")
    localStorage.setItem("cookies", "accept")
  }

  return (
    <>
      {cookiesRef.current !== "accept" && (
        /* !!payload && !!cookiePolicy && */
        <div className={classWithModifiers("cookies", cookies === "accept" && "accept")}>
          <p className="cookies__text">
            <OuterLink linkHref="cookie_policy">{t("byRules")}</OuterLink>
            {", " + t("desc")}
          </p>

          <SharedButton className={getElement("button")} onClick={onClick}>
            {t("button")}
          </SharedButton>
        </div>
      )}
    </>
  )
}
