import "./MentorCard.scss"

import { Icon } from "@shared/ui/Icon/Icon"
import { bem, getEmojiPNG } from "@shared/utils/common"
import { IMentor } from "@store/mentor/mentor.types"
import cn from "classnames"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { Tag } from "../Tag/Tag"

const CN = "mentor-card"
const { getElement } = bem(CN)

const CNButton = CN + "-button"
const { getElement: getElementButton } = bem(CNButton)

interface MentorCard extends IMentor {
  className?: string
  clickable?: boolean
}

export function MentorCard({
  className,
  first_name,
  last_name,
  avatar,
  slug,

  profession,
  company,
  tags,

  // price_currency,
  country,
  price,
  clickable,
}: MentorCard) {
  const { t } = useTranslation("translation")

  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/mentor/" + slug)
  }

  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={cn(CN, className, clickable ? "clickable" : "")}
      onClick={clickable ? handleClick : undefined}
      onMouseOver={() => (clickable ? setHovered(true) : undefined)}
      onMouseOut={() => (clickable ? setHovered(false) : undefined)}
    >
      <div className={getElement("preview")}>
        <img src={avatar} alt="mentor's face" className={getElement("image")} />
      </div>

      <div className={getElement("container")}>
        <div className={getElement("info")}>
          <div className={getElement("name")}>
            <span>
              {first_name} {last_name}
            </span>

            <img src={getEmojiPNG(country.flag_unicode)} alt="flag" className={getElement("flag")} />
          </div>
          ´
          <div className={getElement("job")}>
            <em>{profession}・</em>
            {company}
          </div>
        </div>

        <div className={getElement("tags")}>
          {tags.slice(0, 2).map(tag => (
            <Tag key={tag.id + tag.shortcut} {...tag} />
          ))}

          {tags.length > 3 && <Tag noHash title="•••" />}
        </div>
      </div>

      <button className={`${CNButton} ${hovered ? "hover" : ""}`} onClick={handleClick}>
        <div className={getElementButton("text")}>
          <em>{(+price).toFixed()}</em> / 60min.
        </div>

        <div className={getElementButton("hover-text")}>{t("components.mentorCard.seeProfile")}</div>

        <Icon className="icon mentor-card-button__icon" name="arrow-right" />
      </button>
    </div>
  )
}
