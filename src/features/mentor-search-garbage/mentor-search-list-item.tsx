import "./mentor-search-list-item.scss"

import { ICategory } from "@entities/tags/tags.types"
// import { selectIsMobile } from "@entities/device"
import { Icon } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { Link } from "react-router-dom"

type MentorSearchListItemState = "normal" | "selected"
type MentorSearchListItemType = "regular" | "view-all" | "short"

interface IMentorSearchListItem {
  topic: ICategory

  state?: MentorSearchListItemState
  type?: MentorSearchListItemType

  dataAttrs?: Record<string, string>
  dataAttrsIcon?: Record<string, string>

  className?: string
}

const CN = "mentor-search-list-item"
const { getElement, getModifier } = bem(CN)

export function MentorSearchListItem({
  topic,

  state = "normal",
  type = "regular",

  dataAttrsIcon,
  dataAttrs,

  className,
}: IMentorSearchListItem) {
  /*
  const isMobile = useSelector<DefaultRootState, boolean | null>(state => selectIsMobile(state.device))
  const handleLinkClick = (event: React.MouseEvent) => {
    if (type !== "view-all" && isMobile) event.preventDefault()
  }
  */
  return (
    <Link
      to={"/mentors/" + topic.shortcut}
      className={cn(getModifier(CN, "state", `state--${state}`, "type", `type--${type}`), className)}
      {...dataAttrs}
    >
      {/* Topic's icon and title */}
      {type !== "view-all" && (
        <>
          <Icon {...dataAttrs} href={topic.icon} />
          <span {...dataAttrs}>{topic.title}</span>
        </>
      )}

      {/* View-all */}
      {type === "view-all" && <span {...dataAttrs}>View all mentors in category</span>}

      {/* In search */}
      {type === "regular" && <SwitchIcons dataAttrsIcon={dataAttrsIcon} state={state} id={topic.id} />}
    </Link>
  )
}

interface ISwitchIcons {
  dataAttrsIcon?: Record<string, string>
  state: MentorSearchListItemState
  id: number
}

const SwitchIcons = ({
  dataAttrsIcon,
  state,
}: // id,
ISwitchIcons) => (
  <div className={getElement("wrapper")} {...dataAttrsIcon}>
    <Icon
      name="chevron"
      className={getModifier(getElement("icon"), state === "selected" && "hidden")}
      {...dataAttrsIcon}
    />

    <Icon name="close" className={getModifier(getElement("icon"), state === "normal" && "hidden")} {...dataAttrsIcon} />
  </div>
)
