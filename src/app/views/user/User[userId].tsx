import "./user.scss"
import "app/components/UI/MentorCard/MentorCard.scss"

import { getMentorsId } from "api/actions/mentors"
import Button from "app/components/common/Button/Button"
import Icon, { IconName } from "app/components/common/Icon/Icon"
import ContactForm from "app/components/other/ContactForm/ContactForm"
import OuterLink from "app/components/services/OuterLink"
import { getEmojiPNG } from "app/components/UI/MentorCard/MentorCard"
import TopicTag from "app/components/UI/Tag/TopicTag"
import useLocalization from "modules/localization/hook"
import { ReactNode } from "react"
import { useQuery } from "react-fetching-library"
import { useParams } from "react-router"
import { classWithModifiers } from "utils/common"

function UserUserId() {
  const lang = useLocalization(ll => ll.lang)

  const params = useParams<"userId">()
  if (!params.userId) throw new Error("This component should be used in Route context")

  const { error, loading, payload } = useQuery(getMentorsId(+params.userId))

  if (error) throw new Error("unexpected api error")
  if (loading) return <>loading...</>
  if (!payload) return <>no payload</>

  return (
    <div className="user">
      <div className="user-card">
        <div className="mentor-card mentor-card--center">
          <div className="mentor-card__preview">
            <img src={payload.avatar} alt="mentor's face" className="mentor-card__image" />
          </div>
          <div className="mentor-card__container">
            <div className="mentor-card__info">
              <div className="mentor-card__name">
                <span>{payload.first_name} {payload.last_name}</span>
                <img src={getEmojiPNG(payload.country_flag)} alt="flag" className="mentor-card__flag" />
              </div>
              <div className="mentor-card__job"><em>{payload.profession}・</em>{payload.company}</div>
            </div>
            <div className="mentor-card__price">
              <em>{Number(payload.price).toPrice(lang.code, payload.price_currency)}</em> / 60min.
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
        <UserSection type="3" title={payload.info.resume}>
          <div className="user-section__entry">
            <Icon name="location" />
            <span>{(payload.info as any)["city_" + lang.code]}, <em>онлайн и очные сессии</em></span>
          </div>
          <div className="user-section__entry">
            <Icon name="face" />
            <span>Язык преподавания: <em>{payload.info.languages.map(lang => lang.name_native).join(" / ")}</em></span>
          </div>
        </UserSection>
        <UserSection type="1" title="С чем помогу">
          <p>{payload.info.what_help}</p>
        </UserSection>
        <UserSection type="1">
          <div className="user-section__tags">
            {payload.tags.map(tag => (
              <TopicTag key={tag.id}>{tag}</TopicTag>
            ))}
          </div>
        </UserSection>
        <UserSection type="1" title="Опыт и проекты">
          <p>{payload.info.experience}</p>
        </UserSection>
        <UserSection type="1" title="Портфолио">
          <div className="user-section__rows">
            <p>{payload.info.portfolio}</p>
            {/* <OuterLink to="//webflow.com/yakov.petrunin">webflow.com/yakov.petrunin</OuterLink>
            <OuterLink to="//webflow.com/yakov.petrunin">webflow.com/yakov.petrunin</OuterLink> */}
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
