import "./cookies.scss"

import { Button,OuterLink } from "@shared/ui"
import { bem, classWithModifiers } from "@shared/utils"
import { useGetPagesLinksDocumentsQuery } from "@src/shared/api"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"

const CN = "cookies"
const { getElement } = bem(CN)

export function Cookies() {
  const { t } = useTranslation("translation", { keyPrefix: "components.cookies" })

  const cookiesRef = useRef(localStorage.getItem("cookies"))
  const [cookies, setCookies] = useState("")

  const onClick = () => {
    setCookies("accept")
    localStorage.setItem("cookies", "accept")
  }

  const { data } = useGetPagesLinksDocumentsQuery()
  const cookiePolicy = data?.results.find(l => l.type === "cookie_policy")

  return (
    <>
      {cookiesRef.current !== "accept" && 
      /* !!payload && !!cookiePolicy && */
        <div className={classWithModifiers("cookies", cookies === "accept" && "accept")}>
          <p className="cookies__text">
            <OuterLink 
              to={cookiePolicy?.url || ""} 
              eventLabel="cookiePolicy"
            >
              {t("byRules")}
            </OuterLink>
            
            {", " + t("desc")}
          </p>

          <Button
            className={getElement("button")} 
            onClick={onClick}
          >{t("button")}</Button>
        </div>
      }
    </>
  )
}