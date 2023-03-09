import "./help-social.scss"

import { useGetPagesLinksSocialsQuery } from "@shared/api"
import { LoaderCover,OuterLink } from "@shared/ui"
import { bem } from "@shared/utils"
import { useTranslation } from "react-i18next"

const CN = "help-social"
const { getElement } = bem(CN)

export function HelpSocial() {
  const { t } = useTranslation("translation", { keyPrefix: "components.helpSocial" })
  const { data, isLoading } = useGetPagesLinksSocialsQuery()

  if (!data || isLoading) return <LoaderCover white />

  return (
    <div className={CN}>
      <div className={getElement("text")}>
        {t("text")}
      </div>
      <div className={getElement("splitter")} />

      {data.results.map(img => (
        <div key={img.id}>
          <OuterLink to={img.url} eventLabel="social network">
            <img 
              className={getElement("icon")}
              alt="social network" 
              src={img.icon} 
            />
          </OuterLink>
        </div>
      ))}
    </div>
  )
}
