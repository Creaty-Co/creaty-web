import { SVGAttributes } from "react"
import { classMerge, classWithModifiers } from "utils/common"


export type IconName = (
  "language"
  | "drop-down-triangle"
  | "arrow-left"
  | "arrow-right"
  | "chevron"
  | "star-union"
  | "flag-ru"
  | "yandex-logo"
  | "telegram"
  | "messenger"
  | "whatsapp"
  | "refresh"
  | "cross"
  // Topics
  | "architecture"
  | "design"
  | "art"
  | "craft-jewellery"
  | "games-animation"
  | "movies-tv-photos"
  | "fashion-design"
  | "music-sound"
  | "theater-scene-art"
  | "digital-design"
  | "art-management"
  | "journalism-writing"
) | (string & {})

interface IconProps extends SVGAttributes<SVGElement> {
  name: IconName
}

function Icon(props: IconProps) {
  return (
    <svg {...props} className={classMerge("icon", props.className && classWithModifiers(props.className, props.name))}>
      <use href={`/static/icons.svg#${props.name}`} />
    </svg>
  )
}


export default Icon
