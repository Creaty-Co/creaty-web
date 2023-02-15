import "./MentorSearchListItem.scss"

import Icon from "app/components/common/Icon/Icon"
import { TopicType } from "interfaces/types"
import { MouseEvent } from "react"
import { DefaultRootState, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectIsMobile } from "redux/reducers/device"
import { bem, classMerge } from "utils/common"

type MentorSearchListItemState = "normal" | "selected"
type MentorSearchListItemType = "regular" | "view-all" | "short"

interface MentorSearchListItemProps {
  topic: TopicType
  
  state?: MentorSearchListItemState
  type?: MentorSearchListItemType

  dataAttrs?: Record<string,string>
  dataAttrsIcon?: Record<string,string>

  className?: string
}

const CN = "mentor-search-list-item"
const { getElement, getModifier } = bem(CN)

function MentorSearchListItem({ 
  topic,
  
  state = "normal",
  type = "regular",

  dataAttrsIcon,
  dataAttrs,
  
  className
}: MentorSearchListItemProps) {
  const isMobile = useSelector<DefaultRootState, boolean | null>(state => selectIsMobile(state.device))

  const handleLinkClick = (event: MouseEvent) => {
    // if (type !== "view-all" && isMobile) event.preventDefault()
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

      {...dataAttrs}
    >
      {/* Topic's icon and title */}
      {type !== "view-all" && 
        <>
          <Icon {...dataAttrs} href={topic.icon} />
          <span {...dataAttrs} >{topic.title}</span>
        </>
      }

      {/* View-all */}
      {type === "view-all" && 
        <span>View all mentors in category</span>
      }

      {/* In search */}
      {type === "regular" &&
        <SwitchIcons dataAttrsIcon={dataAttrsIcon} state={state} id={topic.id} /> 
      }
    </Link>
  )
}

const SwitchIcons = ({ state, id, dataAttrsIcon }: { state: MentorSearchListItemState, id: number, dataAttrsIcon?: Record<string,string> }) => (
  <div className={getElement("wrapper")} {...dataAttrsIcon}>
    <Icon name="chevron"
      className={getModifier(getElement("icon"),
        state === "selected" && "hidden"
      )}

      {...dataAttrsIcon}
    />

    <Icon name="close"
      className={getModifier(getElement("icon"),
        state === "normal" && "hidden"
      )}

      {...dataAttrsIcon}
    />
  </div>
)

export default MentorSearchListItem