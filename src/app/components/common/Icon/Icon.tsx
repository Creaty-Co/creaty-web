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
) | (string & {})

interface IconProps extends SVGAttributes<SVGElement> {
  name: IconName
}

function Icon(props: IconProps) {
  return (
    <svg {...props} className={classMerge(classWithModifiers("icon", props.name), props.className)}>
      <use href={`/static/icons.svg#${props.name}`} />
    </svg>
  )
}


export default Icon
