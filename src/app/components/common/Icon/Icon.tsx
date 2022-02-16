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
  | "menu"
  | "location"
  | "face"
  | "r-square"
  | "touch"
  // Topics
  | "architecture"
  | "design"
  | "art"
  | "craft-jewellery"
  | "games-animation"
  | "movies-tv-photos"
  | "fashion-design"
  | "music-and-sound"
  | "theater-scene-art"
  | "digital-design"
  | "art-management"
  | "journalism-writing"
) | (string & {})

interface IconProps extends SVGAttributes<SVGElement> {
  name?: IconName
  modifiers?: Array<string | number | false | null | undefined>
}

/**
 *
 * @prop Modifiers - only work when className given
 * @returns
 */

function Icon(props: IconProps) {
  if (props.name === "chevron")
    console.log(classWithModifiers(props.className || "test", props.name))
  return (
    <svg {...props} className={classMerge("icon", props.className && classWithModifiers(classWithModifiers(props.className, props.name), ...props.modifiers || []))}>
      <use href={props.name ? `/static/icons.svg#${props.name}` : props.href} />
    </svg>
  )
}


export default Icon
