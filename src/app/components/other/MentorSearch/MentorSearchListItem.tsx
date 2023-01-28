import "./MentorSearchListItem.scss"

import Icon from "app/components/common/Icon/Icon"
import { TopicType } from "interfaces/types"
import { MouseEvent } from "react"
import { DefaultRootState, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectIsMobile } from "redux/reducers/device"
import { bem, classMerge, classWithModifiers } from "utils/common"


type MentorSearchListItemState = "normal" | "selected"
type MentorSearchListItemType = "regular" | "view-all" | "short"

interface MentorSearchListItemProps {
  topic: TopicType
  
  state?: MentorSearchListItemState
  type?: MentorSearchListItemType
  
  className?: string
}

const CN = "mentor-search-list-item"
const { getElement, getModifier } = bem(CN)

function MentorSearchListItem({ 
  topic,
  
  state = "normal",
  type = "regular",
  
  className
}: MentorSearchListItemProps) {

  const isMobile = useSelector<DefaultRootState, boolean | null>(state => selectIsMobile(state.device))

  const handleLinkClick = (event: MouseEvent) => {
    // if (type !== "view-all" && isMobile) event.preventDefault()
    event.preventDefault()
  }

  return (
    <Link to={"/mentors/" + topic.shortcut}
      className={classMerge(
        getModifier(CN, 
          "state", `state--${state}`, 
          "type", `type--${type}`
        ),
        className
      )}

      data-topic-id={topic.id}
      data-is-topic-add

      onClick={handleLinkClick}
    >
      {/* Topic's icon and title */}
      {type !== "view-all" && 
        <>
          <Icon href={topic.icon} />
          <span data-topic-id={topic.id}>{topic.title}</span>
        </>
      }

      {/* View-all */}
      {type === "view-all" && 
        <span>View all mentors in category</span>
      }

      {/* In search */}
      {type === "regular" &&
        <SwitchIcons state={state} id={topic.id} /> 
      }
    </Link>
  )
}

const SwitchIcons = ({ state, id }: { state: MentorSearchListItemState, id: number }) => (
  <div className={getElement("wrapper")}>
    <Icon name="chevron"
      className={getModifier(getElement("icon"),
        state === "selected" && "hidden"
      )}

      data-is-topic-add
      data-topic-id={id}
    />

    <Icon name="close"
      className={getModifier(getElement("icon"),
        state === "normal" && "hidden"
      )}

      data-is-topic-remove
      data-topic-id={id}
    />
  </div>
)

export default MentorSearchListItem