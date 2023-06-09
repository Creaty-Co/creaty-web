import "./Mentor.scss"

import { useAppSelector } from "@app/store"
import { Tag, useGetMentorBySlugQuery } from "@entities"
import { selectPagesDocumentsLinks } from "@shared/api/pages/pages.slice"
import { useScrollToTop } from "@shared/hooks"
import { Button, Icon, LoaderCover } from "@shared/ui"
import { bem, getEmojiPNG } from "@shared/utils"
import cn from "classnames"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router"

import { QAndA } from "../home/q-and-a"
import { Packages } from "./Packages"
import { UserSection } from "./UserSection"

const CN = "user"
const { getElement } = bem(CN)

export function Mentor() {
  useScrollToTop()

  const { t /*, i18n*/ } = useTranslation("translation", { keyPrefix: "views.mentor" })
  const { t: tRoot } = useTranslation("translation")

  const params = useParams<"slug">()
  if (!params.slug) throw new Error("This component should be used in Route context")

  const { data: user, isLoading } = useGetMentorBySlugQuery(params.slug)
  const docsLink = useAppSelector(selectPagesDocumentsLinks)

  if (isLoading || !user) return <LoaderCover white />

  const scrollToPackages = () => {
    const packages = document.getElementById("packages")
    packages?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  return (
    <div className="user">
      {/* User Card */}
      <div className="user-card">
        <div className="mentor-card mentor-card--center">
          <div className="mentor-card__preview">
            <img className="mentor-card__image" src={user.avatar} alt="mentor's face" />
          </div>

          <div className="mentor-card__container">
            <div className="mentor-card__info">
              <div className="mentor-card__name">
                <span>
                  {user.first_name} {user.last_name}
                </span>
                <img src={getEmojiPNG(user.country.flag_unicode)} alt="flag" className="mentor-card__flag" />
              </div>

              <div className="mentor-card__job">
                <em>{user.profession}・</em>
                {user.company}
              </div>
            </div>

            <div className="mentor-card__price">
              <em>{Number(user.price).toPrice(tRoot("lang.code"), user.price_currency)}</em> / 60min.
            </div>

            {user.packages.length > 0 && (
              <div className="mentor-card__discounts">
                {user.packages.map(pack => (
                  <div className="mentor-card__discount" key={pack.id}>
                    {t("card.discount", {
                      courseCount: pack.lessons_count,
                      courseDiscount: pack.discount,
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button size="big" color="green" className="user-card__button" onClick={scrollToPackages}>
            {t("card.rollIn")}
          </Button>
        </div>

        <div className="user-card__text">{t("card.terms", { policyLink: docsLink?.privacy_policy.url })}</div>

        {user.info.trial_meeting && <div className="user-card__notice">{t("card.trial")}</div>}
      </div>

      {/* User Body */}
      <div className="user__sections">
        <UserSection type="3" title={user.info.resume}>
          <div className="user-section__entry">
            <Icon name="location" />
            <span>
              {(user.info as never)["city_" + tRoot("lang.code")] &&
                (user.info as never)["city_" + tRoot("lang.code")] + ","}
              <em>{t("info.teachType")}</em>
            </span>
          </div>

          <div className="user-section__entry">
            <Icon name="face" />
            <span>
              {t("info.language")}: <em>{user.info.languages.map(lang => lang.name_native).join(" / ")}</em>
            </span>
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

        <Packages />

        <div className={cn(getElement("faq"))}>
          <div className={cn(getElement("title"), "font--h3-bold text-white mt-10 mb-5")}>
            Frequently asked questions
          </div>

          <QAndA />
        </div>
      </div>
    </div>
  )
}
