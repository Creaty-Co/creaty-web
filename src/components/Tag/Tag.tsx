import "./Tag.scss"

import { bem } from "@shared/utils/common"
import { ITag } from "@store/tags/tags.types"
import cn from "classnames"
import { createSearchParams, useNavigate } from "react-router-dom"

const CN = "tag"
const { getElement } = bem(CN)

interface ITagProps extends ITag {
  noHash?: boolean
  search?: boolean
  stopPropagation?: boolean
}

export function Tag({ shortcut, title, noHash, search, stopPropagation = true }: Partial<ITagProps>) {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!shortcut || noHash) return
    if (stopPropagation) e.stopPropagation()
    const newQuerryParams = new URLSearchParams()
    newQuerryParams.set("shortcut", shortcut)
    navigate({ pathname: "/mentors", search: createSearchParams(newQuerryParams).toString() })
  }

  return (
    <span onClick={handleClick} className={cn(CN, noHash && "no-hash", search && "search")}>
      <span className={getElement("text")}>{title}</span>
    </span>
  )
}
