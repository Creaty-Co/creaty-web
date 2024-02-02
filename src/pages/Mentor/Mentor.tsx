import "./Mentor.scss"

import { QAndA } from "@pages/Home/QAndA/QAndA"
import { useScrollToTop } from "@shared/hooks/useScrollToTop"
import { Icon } from "@shared/ui/Icon/Icon"
import { LoaderCover } from "@shared/ui/LoaderCover/LoaderCover"
import { bem, getEmojiPNG } from "@shared/utils/common"
import { Button, Tag } from "antd"
import cn from "classnames"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router"
import { useGetMentorBySlugQuery } from "src/store/mentor/mentor.api"
import { MentorPackageType } from "src/store/mentor/mentor.types"

import { PackagesWrapper } from "./Packages/PackagesWrapper"
import { UserSection } from "./UserSection"

const CN = "user"
const { getElement } = bem(CN)

export function Mentor() {
  useScrollToTop()

  const { t } = useTranslation("translation", { keyPrefix: "views.mentor" })
  const { t: tRoot } = useTranslation("translation")

  const params = useParams<"slug">()
  if (!params.slug) throw new Error("This component should be used in Route context")

  const { data: user, isLoading } = useGetMentorBySlugQuery(params.slug)

  if (isLoading || !user) return <LoaderCover white />

  const scrollToPackages = () => {
    const packages = document.getElementById("packages")
    packages?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  const mentorName = `${user.first_name} ${user.last_name}`
  return (
    <div className="user">
      <div className="user-card">
        <div className="mentor-card mentor-card--center">
          <div className="mentor-card__preview">
            <img className="mentor-card__image" src={user.avatar} alt="mentor's face" />
          </div>

          <div className="mentor-card__container">
            <div className="mentor-card__info">
              <div className="mentor-card__name">
                <span>{mentorName}</span>
                <img src={getEmojiPNG(user.country.flag_unicode)} alt="flag" className="mentor-card__flag" />
              </div>

              <div className="mentor-card__job">
                <em>{user.profession}・</em>
                {user.company}
              </div>
            </div>

            <div className="mentor-card__price">
              <em>{(+user.price).toFixed()}</em> / 60min.
            </div>

            {user.packages.length > 0 && (
              <div className="mentor-card__discounts">
                {user.packages.map((pack: MentorPackageType) => (
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

          <Button className="button button--green button--biggest" onClick={scrollToPackages}>
            {t("card.rollIn")}
          </Button>
        </div>

        {user.info.trial_meeting && <div className="user-card__notice">{t("card.trial")}</div>}
      </div>

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
            {user.tags.map((tag: any) => (
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

        <PackagesWrapper
          hourPrice={Math.floor(+user.price)}
          mentorSlug={params.slug}
          minutsOfTrialMeeting={user.info.trial_meeting}
          packages={user.packages}
          mentorName={mentorName}
        />

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
