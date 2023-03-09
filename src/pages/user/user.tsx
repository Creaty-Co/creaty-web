import "./user.scss"

import { Tag, useGetMentorBySlugQuery } from "@entities"
import { ContactForm } from "@features"
import { useGetPagesLinksDocumentsQuery } from "@shared/api/pages"
import { PageLinkType } from "@shared/api/pages"
import { useScrollToTop } from "@shared/hooks"
import { Button, Icon, IconName, LoaderCover } from "@shared/ui"
import { getEmojiPNG } from "@shared/utils"
import { classWithModifiers } from "@shared/utils"
import { ReactNode, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router"

function UserUserId() {
  useScrollToTop()
  const navigate = useNavigate()

  const { t, i18n } = useTranslation("translation", { keyPrefix: "views.mentor" })
  const { t: tRoot } = useTranslation("translation")

  const params = useParams<"slug">()
  if (!params.slug) throw new Error("This component should be used in Route context")

  const { data: user, isLoading } = useGetMentorBySlugQuery(params.slug)
  const { data: linksDocs } = useGetPagesLinksDocumentsQuery()
  
  if (isLoading || !user) return <LoaderCover white />

  /* useEffect(() => { query() }, [i18n.language])
  if (error) return <>useQuery error</>
  if (!payload) return <>no payload</>
  */

  const links = linksDocs?.results.reduce<Record<PageLinkType["type"], PageLinkType>>((result, next) => ({ ...result, [next.type]: next }), {} as never)

  return (
    <div className="user">
      <div className="user-card">
        <div className="mentor-card mentor-card--center">
          <div className="mentor-card__preview">
            <img src={user.avatar} alt="mentor's face" className="mentor-card__image" />
          </div>
          <div className="mentor-card__container">
            <div className="mentor-card__info">
              <div className="mentor-card__name">
                <span>{user.first_name} {user.last_name}</span>
                <img src={getEmojiPNG(user.country.flag_unicode)} alt="flag" className="mentor-card__flag" />
              </div>
              <div className="mentor-card__job"><em>{user.profession}・</em>{user.company}</div>
            </div>
            <div className="mentor-card__price">
              <em>{Number(user.price).toPrice(tRoot("lang.code"), user.price_currency)}</em> / 60min.
            </div>
            {user.packages.length > 0 && (
              <div className="mentor-card__discounts">
                {user.packages.map(pack => (
                  <div className="mentor-card__discount" key={pack.id}>{t("card.discount", { courseCount: pack.lessons_count, courseDiscount: pack.discount })}</div>
                ))}
              </div>
            )}
          </div>
          <Button size="big" color="green" className="user-card__button" onClick={() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })}>{t("card.rollIn")}</Button>
        </div>
        <div className="user-card__text">{t("card.terms", { policyLink: links?.privacy_policy.url })}</div>
        {user.info.trial_meeting && (
          <div className="user-card__notice">{t("card.trial")}</div>
        )}
      </div>

      <div className="user__sections">
        <UserSection type="3" title={user.info.resume}>
          <div className="user-section__entry">
            <Icon name="location" />
            <span>{(user.info as never)["city_" + tRoot("lang.code")]}, <em>{t("info.teachType")}</em></span>
          </div>
          <div className="user-section__entry">
            <Icon name="face" />
            <span>{t("info.language")}: <em>{user.info.languages.map(lang => lang.name_native).join(" / ")}</em></span>
          </div>
        </UserSection>

        <UserSection type="1" title={t("info.whatHelp")}>
          <p>{user.info.what_help}</p>
        </UserSection>

        <UserSection type="1">
          <div className="user-section__tags">
            {user.tags.map(tag => (
              <Tag key={tag.id}>{tag}</Tag>
            ))}
          </div>
        </UserSection>

        <UserSection type="1" title={t("info.experience")}>
          <p>{user.info.experience}</p>
        </UserSection>

        <UserSection type="2" title={t("info.garantee.title")} iconName="r-square">
          <p>{t("info.garantee.desc")}</p>
        </UserSection>

        <a id="book" style={{ scrollMargin: "3em" }} />
        <UserSection type="1" title={t("info.bookMentor.title")}>
          <p>{t("info.bookMentor.desc")}</p>
          <ContactForm type="test_meeting" /* submitText={t("info.bookMentor.submit")} */ />
        </UserSection>

      </div>
    </div>
  )
}

/*
function ReactizeLinks(haystack: string) {
  const regex = /(http[s]?:\/\/)?(.+\.[^/\s]+)(\/)?/

  let content = String(haystack)
  const result: ReactNode[] = []
  let match: [string, string, string, string] & {
    index: number
    input: string
    groups: undefined
  }

  while ((match = regex.exec(content) as unknown as typeof match) !== null) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [url, _protocol, hostname] = match
    const chunks = content.split(url)

    result.push(...chunks.slice(0, -1).flatMap((chunk, index) => [chunk, <OuterLink to={url} key={index}>{hostname}</OuterLink>]))
    content = chunks.slice(-1)[0]
  }

  return [...result, content]
}
*/


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
