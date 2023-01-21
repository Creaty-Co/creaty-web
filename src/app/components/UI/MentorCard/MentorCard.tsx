import "./MentorCard.scss"

import Icon from "app/components/common/Icon/Icon"
import { MentorType } from "interfaces/types"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import TopicTag from "../Tag/TopicTag"


interface MentorCardProps extends MentorType { }

function MentorCard(props: MentorCardProps) {
  const { t } = useTranslation("translation")
  return (
    <div className="mentor-card">
      <div className="mentor-card__preview">
        <img src={props.avatar} alt="mentor's face" className="mentor-card__image" />
      </div>
      <div className="mentor-card__container">
        <div className="mentor-card__info">
          <div className="mentor-card__name">
            <span>{props.first_name} {props.last_name}</span>
            <img src={getEmojiPNG(props.country.flag_unicode)} alt="flag" className="mentor-card__flag" />
          </div>
          <div className="mentor-card__job"><em>{props.profession}・</em>{props.company}</div>
        </div>
        <div className="mentor-card__tags">
          {props.tags.slice(0, 2).map(tag => (
            <TopicTag key={tag.id}>{tag}</TopicTag>
          ))}
          {props.tags.length > 3 && (
            <TopicTag noHash>•••</TopicTag>
          )}
        </div>
      </div>
      <Link className="mentor-card-button" to={"/user/" + props.id}>
        <div className="mentor-card-button__text">
          <em>{Number(props.price).toPrice(t("lang.code"), props.price_currency)}</em>
          <span>/</span>
          <span>{60}min.</span>
        </div>
        <div className="mentor-card-button__hover-text">{t("components.mentorCard.seeProfile")}</div>
        <Icon className="mentor-card-button__icon" name="arrow-right" />
      </Link>
    </div>
  )
}


export default MentorCard

export function getEmojiPNG(hex: string) {
  return `https://emojio.ru/images/apple-b/${hex}.png`
}
