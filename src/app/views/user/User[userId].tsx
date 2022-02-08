import "./user.scss"
import "app/components/UI/MentorCard/MentorCard.scss"

import Button from "app/components/common/Button/Button"
import Icon, { IconName } from "app/components/common/Icon/Icon"
import ContactForm from "app/components/other/ContactForm/ContactForm"
import OuterLink from "app/components/services/OuterLink"
import TopicTag from "app/components/UI/Tag/TopicTag"
import useLocalization from "modules/localization/hook"
import { ReactNode } from "react"
import { useParams } from "react-router"
import { classWithModifiers } from "utils/common"

import mock from "../../components/UI/MentorCard/mock.png"

function UserUserId() {
  const params = useParams<"userId">()
  if (!params.userId) throw new Error("This component should be used in Route context")

  const lang = useLocalization(ll => ll.lang)
  return (
    <div className="user">
      <div className="user-card">
        <div className="mentor-card mentor-card--center">
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
            <div className="mentor-card__price">
              <em>{(5500).toPrice(lang.code, lang.currency)}</em> / 60min.
            </div>
            <div className="mentor-card__discounts">
              <div className="mentor-card__discount">Пакет из 5 занятий: <em>скидка 5%</em></div>
              <div className="mentor-card__discount">Пакет из 10 занятий: <em>скидка 12%</em></div>
            </div>
          </div>
          <Button size="big" color="green" className="user-card__button">Записаться</Button>
        </div>
        <div className="user-card__text">Нажав на кнопку, я соглашаюсь на обработку персональных данных в соответсвии с политикой конфиденциальности</div>
        <div className="user-card__notice">* Тестовая 15 минутная встреча <em>бесплатно!</em></div>
      </div>
      <div className="user__sections">
        <UserSection type="3" title="15 лет профессиональной карьеры в архитектуре и урбанистике. Выпускник лучших университетов Лондона, Бельгии и Греции дает частные уроки студентам и аспирантам.">
          <div className="user-section__entry">
            <Icon name="location" />
            <span>Москва, <em>онлайн и очные сессии</em></span>
          </div>
          <div className="user-section__entry">
            <Icon name="face" />
            <span>Язык преподавания: <em>Русский / English</em></span>
          </div>
        </UserSection>
        <UserSection type="1" title="С чем помогу">
          <ul>
            <li>Нужна помощь с проектом / портфолио</li>
            <li>Нужен экспертный взгляд / оценка  со стороны</li>
            <li>Прошли обучение, но для работы нужен опыт</li>
            <li>Хотите составить план развития в карьере</li>
          </ul>
        </UserSection>
        <UserSection type="1">
          <div className="user-section__tags">
            <TopicTag>Архитектура</TopicTag>
            <TopicTag>UX/UI</TopicTag>
            <TopicTag>Fashion дизайн</TopicTag>
            <TopicTag>UX/UI</TopicTag>
            <TopicTag>Архитектура</TopicTag>
            <TopicTag>UX/UI</TopicTag>
            <TopicTag>Архитектура</TopicTag>
            <TopicTag>UX/UI</TopicTag>
            <TopicTag>UX/UI</TopicTag>
          </div>
        </UserSection>
        <UserSection type="1" title="Опыт и проекты">
          <p>Более 15 лет в архитектуре, начинал как младший дизайнер и тд., тут может быть как и мало, так и дофига всякого разного текста.</p>
          <ul>
            <li>Product owner, «Сбер», Москва</li>
            <li>Менеджер проектов, «Сбер», Минск</li>
            <li>Оператор колл-центра, «Сбер», Минск</li>
          </ul>
        </UserSection>
        <UserSection type="1" title="Портфолио">
          <div className="user-section__rows">
            <OuterLink to="//webflow.com/yakov.petrunin">webflow.com/yakov.petrunin</OuterLink>
            <OuterLink to="//webflow.com/yakov.petrunin">webflow.com/yakov.petrunin</OuterLink>
          </div>
        </UserSection>
        <UserSection type="2" title="Ваша гарантия" iconName="r-square">
          <p>
            Если по какой-то причине вам кажется, что вы потратили время и деньги зря, напишите нам.
            <br />
            <em>Мы разберемся в ситуации и найдём решение.</em>
          </p>
        </UserSection>
        <UserSection type="1" title="Записаться к ментору">
          <p>Оплатить сессию можно  после согласования с менеджером времени и деталей. А пока оставьте заявку, чтобы мы могли связаться удобным для вас способом. </p>
          <ContactForm type="test_meeting" submitText="Записаться к ментору" />
        </UserSection>
      </div>
    </div >
  )
}


interface UserSectionProps {
  type: "1" | "2" | "3"
  title?: string
  iconName?: IconName
  children: ReactNode
}

function UserSection(props: UserSectionProps) {
  return (
    <div className={classWithModifiers("user-section", props.type)}>
      <div className="user-section__container">
        {props.title && (
          <h3 className="user-section__title heading">{props.title}</h3>
        )}
        <div className="user-section__content">{props.children}</div>
      </div>
      {props.iconName && (
        <Icon className="user-section__icon" name={props.iconName} />
      )}
    </div>
  )
}


export default UserUserId
