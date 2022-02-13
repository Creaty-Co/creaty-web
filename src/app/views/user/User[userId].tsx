import "./user.scss"
import "app/components/UI/MentorCard/MentorCard.scss"

import { deleteMentorsId, getMentorsId } from "api/actions/mentors"
import ClientAPI from "api/client"
import AdminInterface from "app/components/admin/AdminInterface"
import Button from "app/components/common/Button/Button"
import ButtonLink from "app/components/common/Button/ButtonLink"
import Icon, { IconName } from "app/components/common/Icon/Icon"
import ContactForm from "app/components/other/ContactForm/ContactForm"
import { getEmojiPNG } from "app/components/UI/MentorCard/MentorCard"
import TopicTag from "app/components/UI/Tag/TopicTag"
import useScrollToTop from "hooks/useScrollToTop"
import useLocalization from "modules/localization/hook"
import { ReactNode } from "react"
import { useQuery } from "react-fetching-library"
import { useNavigate, useParams } from "react-router"
import { classWithModifiers, inter } from "utils/common"

function UserUserId() {
  useScrollToTop()
  const navigate = useNavigate()

  const ll = useLocalization(ll => ll.views.mentor)
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
                <img src={getEmojiPNG(payload.country.flag_unicode)} alt="flag" className="mentor-card__flag" />
              </div>
              <div className="mentor-card__job"><em>{payload.profession}・</em>{payload.company}</div>
            </div>
            <div className="mentor-card__price">
              <em>{Number(payload.price).toPrice(lang.code, payload.price_currency)}</em> / 60min.
            </div>
            {payload.packages.length > 0 && (
              <div className="mentor-card__discounts">
                {payload.packages.map(pack => (
                  <div className="mentor-card__discount" key={pack.id}>{inter(ll.card.discount, { courseCount: pack.lessons_count, courseDiscount: pack.discount })}</div>
                ))}
              </div>
            )}
          </div>
          <ButtonLink size="big" color="green" className="user-card__button" to="#book">{ll.card.rollIn}</ButtonLink>
        </div>
        <div className="user-card__text">{ll.card.terms}</div>
        {payload.info.trial_meeting && (
          <div className="user-card__notice">{ll.card.trial}</div>
        )}
      </div>
      <div className="user__sections">
        <AdminInterface>
          <Button onClick={() => ClientAPI.query(deleteMentorsId(payload.id)).then(() => navigate("/admin/mentors"))}>Удалить ментора</Button>
          <Button onClick={() => navigate("/admin/edit-mentor/" + payload.id)}>Редактировать ментора</Button>
        </AdminInterface>
        <UserSection type="3" title={payload.info.resume}>
          <div className="user-section__entry">
            <Icon name="location" />
            <span>{(payload.info as any)["city_" + lang.code]}, <em>{ll.info.teachType}</em></span>
          </div>
          <div className="user-section__entry">
            <Icon name="face" />
            <span>{ll.info.language}: <em>{payload.info.languages.map(lang => lang.name_native).join(" / ")}</em></span>
          </div>
        </UserSection>
        <UserSection type="1" title={ll.info.whatHelp}>
          <p>{payload.info.what_help}</p>
        </UserSection>
        <UserSection type="1">
          <div className="user-section__tags">
            {payload.tags.map(tag => (
              <TopicTag key={tag.id}>{tag}</TopicTag>
            ))}
          </div>
        </UserSection>
        <UserSection type="1" title={ll.info.experience}>
          <p>{payload.info.experience}</p>
        </UserSection>
        <UserSection type="1" title={ll.info.portfolio}>
          <div className="user-section__rows">
            <p>{payload.info.portfolio}</p>
          </div>
        </UserSection>
        <UserSection type="2" title={ll.info.garantee.title} iconName="r-square">
          <p>{ll.info.garantee.desc}</p>
        </UserSection>
        <UserSection type="1" title={ll.info.bookMentor.title}>
          <a href="#book"></a>
          <p>{ll.info.bookMentor.desc}</p>
          <ContactForm type="test_meeting" submitText={ll.info.bookMentor.submit} />
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
