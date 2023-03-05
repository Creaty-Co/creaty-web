import "./tag.scss"

import { bem } from "@src/_legacy/_utils/common"
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
          {props.children}
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
      >{props.children.title}</span>
    </NavLink>
  )
}