import "./user.scss"

import { Tag, useGetMentorBySlugQuery } from "@entities"
import { useGetPagesLinksDocumentsQuery } from "@shared/api/pages"
import { PageLinkType } from "@shared/api/pages"
import { useScrollToTop } from "@shared/hooks"
import { Button, Icon, IconName, LoaderCover } from "@shared/ui"
import { getEmojiPNG } from "@shared/utils"
import { bem } from "@shared/utils"
import cn from "classnames"
import { ReactNode/*, useEffect*/ } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router"

import { QAndA } from "./../home/q-and-a" 

const CN = "user"
const { getElement } = bem(CN)

export function User() {
  useScrollToTop()
  const navigate = useNavigate()

  const { t/*, i18n*/ } = useTranslation("translation", { keyPrefix: "views.mentor" })
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

  const links = linksDocs?.results.reduce<
    Record<
      PageLinkType["type"], 
      PageLinkType
    >
  >((result, next) => ({ ...result, [next.type]: next }), {} as never)

  return (
    <div className="user">
      {/* User Card */}
      <div className="user-card">
        <div className="mentor-card mentor-card--center">
          <div className="mentor-card__preview">
            <img 
              className="mentor-card__image" 
              src={user.avatar} 
              alt="mentor's face" 
            />
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

            {user.packages.length > 0 && 
              <div className="mentor-card__discounts">
                {user.packages.map(pack => 
                  <div 
                    className="mentor-card__discount" 
                    key={pack.id}
                  >
                    {t("card.discount", { 
                      courseCount: pack.lessons_count, 
                      courseDiscount: pack.discount 
                    })}
                  </div>
                )}
              </div>
            }
          </div>

          <Button size="big" color="green" 
            className="user-card__button" 
            onClick={() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })}
          >{t("card.rollIn")}</Button>
        </div>

        <div className="user-card__text">
          {t("card.terms", { policyLink: links?.privacy_policy.url })}
        </div>

        {user.info.trial_meeting &&
          <div className="user-card__notice">{t("card.trial")}</div>
        }
      </div>

      {/* User Body */}
      <div className="user__sections">
        <UserSection type="3" title={user.info.resume}>
          <div className="user-section__entry">
            <Icon name="location" />
            <span>
              {(user.info as never)["city_" + tRoot("lang.code")] && (user.info as never)["city_" + tRoot("lang.code")] + ","}
              <em>{t("info.teachType")}</em>
            </span>
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

        <Packages />

        <div className={cn(getElement("faq") )}>
          <div className={cn(getElement("title"), "font--h3-bold text-white mt-10 mb-5")}>
            Frequently asked questions
          </div>  

          <QAndA />
        </div>
      </div>
    </div>
  )
}

const MODSection = "section"
const CNSection = CN + "-" + MODSection
const { getElement: getElementSection, getModifier: getModifierSection } = bem(CNSection)

interface UserSectionProps {
  type: "1" | "2" | "3"
  title?: string
  iconName?: IconName
  children: ReactNode
}

const UserSection = ({
  children,
  iconName,
  title,
  type
}: UserSectionProps) => (
  <div className={getModifierSection(CNSection, type)}>
    <div className={getElementSection("container")}>
      {title && <div className={cn(getElementSection("title"), "heading", "font--h3-bold")}>{title}</div> }
      <div className={cn(getElementSection("content"), "font--text-regular")}>{children}</div>
    </div>

    {iconName && <Icon className={getElementSection("icon")} name={iconName} />}
  </div>
)

/* Packages */
const CNPackages = "user-packages"
const { getElement: getElementPackages, getModifier: getModifierPackages } = bem(CNPackages)

const Packages = () => (
  <div className={cn(CNPackages, "flex flex-col gap-y-5")}>
    <div className="font--h3-bold text-white mt-10 mb-5">
      Select your mentoring plan
    </div>

    <div className="packages bg-black-1000 rounded-3xl p-6 flex flex-col gap-4 gap-4">
      <div className="bg-black-900 rounded-2xl grid grid-cols-[1fr_auto] pl-10 pr-6 pt-6 pb-10 items-start">
        <div className="grid grid-rows-[auto_auto] gap-2">
          <div className="font--h4-bold text-white">Free 15-minute trial session</div>
          <div className="font--text-regular text-gray-700">15-minute trial session without any commitment, to give you a taste of what's to come.</div>
        </div>

        <Button size="big" type="submit" color="white">Book now</Button>
      </div>

      <div className="bg-white rounded-2xl grid grid-cols-[1fr_auto] pl-10 pr-6 py-6 items-start gap-4">
        <div className="grid grid-rows-[auto_auto] gap-2">
          <div className="font--h4-bold text-black-900">Mentoring session with <em className="text-violet">Gina T.</em></div>
          <div className="font--text-regular text-gray-800">1-hour personal mentoring session.<br />No nonsense, just straight-up support and guidance.</div>
          <div className="font--text-regular text-black-900 pt-1"><em className="font--text-bold">$100</em> / 60 min session</div>
        </div>

        <Button size="big" type="submit" color="violet">Book now</Button>
      </div>

      <div className="bg-white rounded-2xl grid grid-rows-[auto_auto] gap-6 py-6">
        <div className="grid grid-cols-[1fr_auto] pl-10 pr-6 items-start gap-4">
          <div className="grid grid-rows-[auto_auto] gap-2">
            <div className="font--h4-bold text-black-900">Session packs <em className="text-violet">with discount</em></div>
            <div className="font--text-regular text-gray-800">Boost your creative career to new heights with a packs of  mentoring sessions and enjoy special prices.</div>
          </div>

          <Button size="big" type="submit" color="violet">Book now</Button>
        </div>

        <div className="grid grid-cols-1 px-6 gap-1">
          <div className="p-4 grid grid-cols-[auto_1fr] bg-viol-100 rounded-lg">
            <div className="flex gap-3 flex-row items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded-full bg-white border-violet text-viol-200 ring-viol-200 outline-violet"
                style={{borderRadius: "9999px"}}
                checked
              />
              <span className="font--text-bold text-black-900">5 sessions</span>
              <div className="px-1.5 py-1 text-gray-400 bg-black-900 font--tags-regular rounded-sm">Most common</div>
            </div>

            <div className="flex gap-2 flex-row items-center justify-end">
              <div><span className="text-black-900 font--text-medium">$475</span> <span className="text-gray-800 font--text2-regular line-through">$500</span></div>
              <div className="font--text-medium text-white bg-green-700 px-2 py-0.5 rounded-sm">-5%</div>
              <div className="text-gray-800 font--text2-regular">you are saving <span className="font--text2-bold">$25</span></div>
            </div>
          </div>
          
          <div className="p-4 grid grid-cols-[auto_1fr] bg-viol-50 rounded-lg">
            <div className="flex gap-3 flex-row items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded-full bg-white border-violet text-viol-200 ring-viol-200 outline-violet"
                style={{borderRadius: "9999px"}}
              />
              <span className="font--text-regular text-black-900">10 sessions</span>
              <div className="px-1.5 py-1 text-gray-400 bg-black-900 font--tags-regular rounded-sm">Most common</div>
            </div>

            <div className="flex gap-2 flex-row items-center justify-end">
              <div><span className="text-black-900 font--text-medium">$900</span> <span className="text-gray-800 font--text2-regular line-through">$1000</span></div>
              <div className="font--text-medium text-white bg-green-700 px-2 py-0.5 rounded-sm">-10%</div>
              <div className="text-gray-800 font--text2-regular">you are saving <span className="font--text2-bold">$100</span></div>
            </div>
          </div>


        </div>

      </div>

    </div>
  </div>
)
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