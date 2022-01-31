import "./MentorCard.scss"

import Icon from "app/components/common/Icon/Icon"
import useLocalization from "modules/localization/hook"

import TopicTag from "../Tag/TopicTag"
import mock from "./mock.png"


interface MentorCardProps { }

function MentorCard(props: MentorCardProps) {
  const lang = useLocalization(ll => ll.lang)
  return (
    <div className="mentor-card">
      <div className="mentor-card__preview">
        <img src={mock} alt="mentor's face" className="mentor-card__image" />
      </div>
      <div className="mentor-card__container">
        <div className="mentor-card__info">
          <div className="mentor-card__name">
            <span>Игнат Всеподдубский</span>
            <Icon name="flag-ru" />
          </div>
          <div className="mentor-card__job"><em>Product designer・</em>Yandex</div>
        </div>
        <div className="mentor-card__tags">
          <TopicTag>UX/UI</TopicTag>
          <TopicTag>Графический дизайн</TopicTag>
          <TopicTag>Product design</TopicTag>
          <TopicTag noHash>...</TopicTag>
        </div>
      </div>
      <button className="mentor-card-button">
        <div className="mentor-card-button__text">
          <em>{(10000).toPrice(lang.code, lang.currency)}</em>
          <span>/</span>
          <span>{60}min.</span>
        </div>
        <div className="mentor-card-button__hover-text">Посмотреть профиль</div>
        <Icon className="mentor-card-button__icon" name="arrow-right" />
      </button>
    </div>
  )
}


export default MentorCard
