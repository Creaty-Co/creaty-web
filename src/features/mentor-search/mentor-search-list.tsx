import "./mentor-search-list.scss"

import Icon from "app/components/common/Icon/Icon"
import LoaderCover from "app/components/UI/Loader/LoaderCover"
import TopicTag from "app/components/UI/Tag/TopicTag"
import { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { DefaultRootState, useSelector } from "react-redux"
import { selectIsMobile } from "redux/reducers/device"
import { bem, toDataAttrs } from "utils/common"

import MentorSearchListItem from "./MentorSearchListItem"

/* BEM */ 
const CN = "mentor-search-list"
const { getElement, getModifier } = bem(CN)

interface MentorSearchListProps {
  searchState: DefaultRootState["search"]
  topics: DefaultRootState["topics"]

  value: string | null

  pureSearch: boolean
}

function MentorSearchList({
  searchState,
  pureSearch,
  topics,
  value
}: MentorSearchListProps) {
  const { t } = useTranslation("translation", { keyPrefix: "views.home.mentorSearch" })
  const isMobile = useSelector<DefaultRootState, boolean | null>(state => selectIsMobile(state.device))

  /*
  const onPointerLeave = () => console.log("topic:leave")
  const onPointerEnter = () => console.log("topic:enter")
  */

  const categories = value === null || value.length === 0
    ? topics.list
    : topics.list.filter(t => t.title.toLocaleLowerCase().search(value.toLocaleLowerCase()) !== -1)
  /* console.log("categories", categories) */

  const tags = value === null || value.length === 0
    ? searchState.topic?.tags || topics.tags
    : topics.tags.filter(t => t.title.toLocaleLowerCase().search(value.toLocaleLowerCase()) !== -1)
  /* console.log("tags", tags) */


  // console.log("NOUNT")
  return (
    <div
      className={getModifier(CN,
        searchState.focused && "visible",
        (searchState.topic || searchState.tag) && "selected"
      )}
    >
      {/* Selected only in Mobil*/}
      {isMobile && (searchState.topic || searchState.tag) && 
          <div className={getElement("selected")}>
            {/* if selected a topic */}
            {searchState.topic &&
              <MentorSearchListItem 
                topic={searchState.topic}
                state="selected"
                
                className={getElement("item")} 

                dataAttrsIcon={toDataAttrs({
                  "selector": "topic",
                  "action": "remove",
                  "id": searchState.topic.id.toString()
                })}
              />
            }

            {/* if selected a tag */}
            {searchState.tag &&
              <TopicTag key={searchState.tag.id}
                dataAttrs={toDataAttrs({
                  "selector": "tag",
                  "action": "remove",
                  "id": searchState.tag.id.toString()
                })}
              >
                {searchState.tag}
              </TopicTag>
            }

            {/* if selected a topic but not a tag */}
            {searchState.topic && !searchState.tag &&
              <MentorSearchListItem
                topic={searchState.topic}
                type="view-all"

                className={getElement("item")}
              />
            }
          </div>
      }

      {/* Separator */}
      <div className={getModifier(getElement("separator"), "only-for-mobile")}></div>

      {/* Empty search results for all. Only mobile */}
      {isMobile && value !== null && value.length > 0 && 
          categories.length === 0 && tags.length === 0 &&          
            <div className={getModifier(getElement("search-result"), "all")}>NO ONE SEARCH RESULTS</div>
      }

      {/* Categories */}
      {(!isMobile || 
        !searchState.topic || 
        (searchState.topic && pureSearch)
      ) && <div className={getElement("categories")}>
        {/* Selected categories only on desktop */}
        {!isMobile && searchState.topic && 
          <>
            <MentorSearchListItem 
              topic={searchState.topic}
              state="selected"
            
              className={getElement("item")} 

              dataAttrsIcon={toDataAttrs({
                "selector": "topic",
                "action": "remove",
                "id": searchState.topic.id.toString()
              })}
            />

            <MentorSearchListItem
              topic={searchState.topic}
              type="view-all"

              className={getElement("item")}
            />

            <div className={getElement("separator")}></div>
          </>
        }
      
        {/* Empty search results for categories. Only desktop */}
        {!isMobile && value !== null && value.length > 0 && 
          categories.length === 0 &&          
            <div className={getModifier(getElement("search-result"), "categories")}>No avaliable categories</div>
        }

        {/* All topics */}
        {
          categories.filter(t => t.id !== searchState.topic?.id).map(topic => 
            <MentorSearchListItem key={topic.id} 
              {...{topic}}

              dataAttrs={toDataAttrs({
                "selector": "topic",
                "action": "add",
                "id": topic.id.toString()
              })}
            />
          )
        }

        {/* Loader */}
        {topics.list.length === 0 && 
          <LoaderCover />
        }
      </div> }

      {/* Tags */}
      <div
        className={getModifier(getElement("tags"),
          isMobile && 
          (value === null || value.length === 0) && (
            (searchState.topic && pureSearch) || 
            !searchState.topic
          ) && "hidden"
        )}
      >
        {/* Selected only on desktop */}
        {!isMobile && searchState.tag && 
          <>
            <TopicTag key={searchState.tag.id}
              dataAttrs={toDataAttrs({
                "selector": "tag",
                "action": "remove",
                "id": searchState.tag.id.toString()
              })}
            >
              {searchState.tag}
            </TopicTag>

            <div className={getElement("separator")}></div>
          </>
        }

        {/* Empty search results for tags. Only desktop */}
        {!isMobile && value !== null && value.length > 0 && 
        tags.length === 0 &&          
          <div className={getModifier(getElement("search-result"), "tags")}>No avaliable categories</div>
        }

        {/* Tags of topic */}
        {tags.filter(tag => tag.id !== searchState.tag?.id)
          .filter(tag => tag.title)
          .map(tag => 
            <TopicTag key={tag.id}
              dataAttrs={toDataAttrs({
                "selector": "tag",
                "action": "add",
                "id": tag.id.toString()
              })}
            >
              {tag}
            </TopicTag>
          )}

        {/* Empty tags */}
        {!searchState.topic && false &&
          <MentorSearchListIndicatorEmpty>{t("chooseTopic")}</MentorSearchListIndicatorEmpty>
        }
      </div>

    </div>
  )
}

const MentorSearchListIndicatorEmpty = ({ children }: { children: ReactNode }) => (
  <div className={getElement("indicator-empty")}>
    <Icon className={getElement("icon")} name="touch" />
    <span className={getElement("text")}>{children}</span>
  </div>
)

export default MentorSearchList