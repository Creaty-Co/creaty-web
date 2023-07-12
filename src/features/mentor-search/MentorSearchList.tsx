import "./MentorSearchList.scss"

import { RootState, useAppSelector } from "@app/store"
import { CategoryType, Tag, TagType } from "@entities"
import { selectIsMobile } from "@entities/device"
import { Icon, LoaderCover } from "@shared/ui"
import { bem, toDataAttrs } from "@shared/utils"
import { useTranslation } from "react-i18next"

import { MentorSearchListItem } from "./mentor-search-list-item"

/* BEM */
const CN = "mentor-search-list"
const { getElement, getModifier } = bem(CN)

interface MentorSearchListProps {
  searchState: RootState["search"]
  topics: RootState["topics"]

  value: string | null

  pureSearch: boolean
}

export function MentorSearchList({ searchState, pureSearch, topics, value }: MentorSearchListProps) {
  const isMobile = useAppSelector(selectIsMobile)
  const { t } = useTranslation("translation", { keyPrefix: "views.home.mentorSearch" })

  const categories =
    value === null || value.length === 0
      ? topics.list
      : topics.list.filter(
          (t: { title: string }) => t.title.toLocaleLowerCase().search(value.toLocaleLowerCase()) !== -1
        )

  const tags =
    value === null || value.length === 0
      ? searchState.topic?.tags || topics.tags
      : topics.tags.filter(
          (t: { title: string }) => t.title.toLocaleLowerCase().search(value.toLocaleLowerCase()) !== -1
        )
  return (
    <div
      className={getModifier(
        CN,
        searchState.focused && "visible",
        (searchState.topic || searchState.tag) && "selected"
      )}
    >
      {/* Selected only in Mobil*/}
      {isMobile && (searchState.topic || searchState.tag) && (
        <div className={getElement("selected")}>
          {/* if selected a topic */}
          {searchState.topic && (
            <MentorSearchListItem
              topic={searchState.topic}
              state="selected"
              className={getElement("item")}
              dataAttrsIcon={toDataAttrs({
                selector: "topic",
                action: "remove",
                id: searchState.topic.id.toString(),
              })}
            />
          )}

          {/* if selected a tag */}
          {searchState.tag && (
            <Tag
              key={searchState.tag.id}
              dataAttrs={toDataAttrs({
                selector: "tag",
                action: "remove",
                id: searchState.tag.id.toString(),
              })}
            >
              {searchState.tag}
            </Tag>
          )}

          {/* if selected a topic but not a tag */}
          {searchState.topic && !searchState.tag && (
            <MentorSearchListItem topic={searchState.topic} type="view-all" className={getElement("item")} />
          )}
        </div>
      )}

      {/* Separator */}
      <div className={getModifier(getElement("separator"), "only-for-mobile")}></div>

      {/* Empty search results for all. Only mobile */}
      {isMobile && value !== null && value.length > 0 && categories.length === 0 && tags.length === 0 && (
        <div className={getModifier(getElement("search-result"), "all")}>NO ONE SEARCH RESULTS</div>
      )}

      {/* Categories */}
      {(!isMobile || !searchState.topic || (searchState.topic && pureSearch)) && (
        <div className={getElement("categories")}>
          {/* Selected categories only on desktop */}
          {!isMobile && searchState.topic && (
            <>
              <MentorSearchListItem
                topic={searchState.topic}
                state="selected"
                className={getElement("item")}
                dataAttrsIcon={toDataAttrs({
                  selector: "topic",
                  action: "remove",
                  id: searchState.topic.id.toString(),
                })}
              />

              <MentorSearchListItem
                topic={searchState.topic}
                type="view-all"
                dataAttrs={toDataAttrs({ action: "view-all", id: searchState.topic.shortcut.toString() })}
                className={getElement("item")}
              />

              <div className={getElement("separator")}></div>
            </>
          )}

          {/* Empty search results for categories. Only desktop */}
          {!isMobile && value !== null && value.length > 0 && categories.length === 0 && (
            <div className={getModifier(getElement("search-result"), "categories")}>No avaliable categories</div>
          )}

          {/* All topics */}
          {categories
            .filter((t: { id: any }) => t.id !== searchState.topic?.id)
            .map((topic: CategoryType) => (
              <MentorSearchListItem
                key={topic.id}
                {...{ topic }}
                dataAttrs={toDataAttrs({
                  selector: "topic",
                  action: "add",
                  id: topic?.id?.toString() || "",
                })}
              />
            ))}

          {/* Loader */}
          {topics.list.length === 0 && <LoaderCover />}
        </div>
      )}

      {/* Tags */}
      <div
        className={getModifier(
          getElement("tags"),
          isMobile &&
            (value === null || value.length === 0) &&
            ((searchState.topic && pureSearch) || !searchState.topic) &&
            "hidden"
        )}
      >
        {/* Selected only on desktop */}
        {!isMobile && searchState.tag && (
          <>
            <Tag
              key={searchState.tag.id}
              dataAttrs={toDataAttrs({
                selector: "tag",
                action: "remove",
                id: searchState.tag.id.toString(),
              })}
            >
              {searchState.tag}
            </Tag>

            <div className={getElement("separator")}></div>
          </>
        )}

        {/* Empty search results for tags. Only desktop */}
        {!isMobile && value !== null && value.length > 0 && tags.length === 0 && (
          <div className={getModifier(getElement("search-result"), "tags")}>No avaliable categories</div>
        )}

        {/* Tags of topic */}
        {tags
          .filter((tag: TagType) => tag.id !== searchState.tag?.id)
          .filter((tag: TagType) => tag.title)
          .map((tag: TagType) => (
            <Tag
              key={tag.id}
              dataAttrs={toDataAttrs({
                selector: "tag",
                action: "add",
                id: tag.id.toString(),
              })}
            >
              {tag}
            </Tag>
          ))}

        {/* Empty tags */}
        {!searchState.topic && false && (
          <MentorSearchListIndicatorEmpty>{t("chooseTopic")}</MentorSearchListIndicatorEmpty>
        )}
      </div>
    </div>
  )
}

const MentorSearchListIndicatorEmpty = ({ children }: { children: React.ReactNode }) => (
  <div className={getElement("indicator-empty")}>
    <Icon className={getElement("icon")} name="touch" />
    <span className={getElement("text")}>{children}</span>
  </div>
)
