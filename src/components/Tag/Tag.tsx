import "./Tag.scss"

import { bem } from "@shared/utils/common"
import cn from "classnames"
import { createSearchParams, useNavigate } from "react-router-dom"

const CN = "topic-tag"
const { getElement } = bem(CN)

export interface ITag {
  id: number
  shortcut: string
  title: string
}

interface ITagProps extends ITag {
  noHash?: boolean
}

export function Tag({ shortcut, title, noHash }: Partial<ITagProps>) {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!shortcut || noHash) return
    e.stopPropagation()
    const newQuerryParams = new URLSearchParams()
    newQuerryParams.set("tag_shortcut", shortcut)
    navigate({ pathname: "/mentors", search: createSearchParams(newQuerryParams).toString() })
  }

  return (
    <span onClick={handleClick} className={cn(noHash && "no-hash", CN)}>
      <span className={getElement("text")}>{title}</span>
    </span>
  )
}
