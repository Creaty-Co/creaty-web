import "./Tag.scss"

import { bem } from "@shared/utils/common"
import { ICategory } from "@store/tags/tags.types"
import cn from "classnames"
import { createSearchParams, useNavigate } from "react-router-dom"

const CN = "tag"
const { getElement } = bem(CN)

interface ICategoryProps extends ICategory {
  search?: boolean
}

export function Category({ shortcut, title, icon, search }: Partial<ICategoryProps>) {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!shortcut) return
    e.stopPropagation()
    const newQuerryParams = new URLSearchParams()
    newQuerryParams.set("shortcut", shortcut)
    navigate({ pathname: "/mentors", search: createSearchParams(newQuerryParams).toString() })
  }

  return (
    <span onClick={handleClick} className={cn(CN, "no-hash", "category", search && "search")}>
      <img src={icon} className={getElement("icon")} />

      <span className={getElement("text")}>{title}</span>
    </span>
  )
}
