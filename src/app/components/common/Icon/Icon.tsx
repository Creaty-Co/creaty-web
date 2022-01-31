import { SVGAttributes } from "react"
import { classMerge, classWithModifiers } from "utils/common"


export type IconName = ("language" | "drop-down-triangle" | "chevron" | "star-union") | (string & {})

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
