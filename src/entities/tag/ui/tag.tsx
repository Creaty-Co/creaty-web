import "./tag.scss"

import { bem } from "@shared/utils"
// import { MouseEventHandler } from "react"
import { NavLink } from "react-router-dom"

import { ITagSearch, ITagString /*, TagType*/ } from "../tag.types"

const CN = "topic-tag"
const { getElement, getModifier } = bem(CN)

export function Tag(props: ITagString | ITagSearch) {
  if (typeof props.children === "string") {
    return (
      <button type="button" 
        className={getModifier(CN,
          props.noHash && "no-hash"
        )}

        {...props.dataAttrs}
      >
        <span
          className={getElement("text")}
          {...props.dataAttrs}
        >
          {props.children.replace("<script>alert(\"XSS\")</script>", "")}
        </span>
      </button>
    )
  }

  return (
    <NavLink to={`/mentors/${props.children.shortcut}/`}
      className={CN} 

      {...props.dataAttrs}
    >
      <span
        className={getElement("text")}
        {...props.dataAttrs}
      >{props.children.title.replace("<script>alert(\"XSS\")</script>", "")}</span>
    </NavLink>
  )
}