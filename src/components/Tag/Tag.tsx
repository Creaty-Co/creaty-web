import "./Tag.scss"

import { bem } from "@shared/utils/common"
import { useNavigate } from "react-router-dom"

import { ITagSearch, ITagString /*, TagType*/ } from "./Tag.types"

const CN = "topic-tag"
const { getElement, getModifier } = bem(CN)

export function Tag(props: ITagString | ITagSearch) {
  const navigate = useNavigate()

  if (typeof props.children === "string") {
    return (
      <button type="button" className={getModifier(CN, props.noHash && "no-hash")} {...props.dataAttrs}>
        <span className={getElement("text")} {...props.dataAttrs}>
          {props.children.replace("<script>alert(\"XSS\")</script>", "")}
      
        </span>
      </button>
    )
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    if (typeof props.children === "string") return
    navigate(`/mentors/${props.children.shortcut}/`)
  }

  return (
    <span onClick={handleClick} className={CN} {...props.dataAttrs}>
      <span className={getElement("text")} {...props.dataAttrs}>
      {props.children.title.replace("<script>alert(\"XSS\")</script>", "")}
      </span>
    </span>
  )
}
