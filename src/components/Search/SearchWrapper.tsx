import "./Search.scss"

import { useAppSelector } from "@store/store"
import { categoriesS, tagsS } from "@store/tags/tags.slice"
import { Spin } from "antd"

import { SearchDesktop } from "./SearchDesktop"
import { SearchMobile } from "./SearchMobile"

export interface ISearchProps {
  isMentorPage?: boolean
}

export function SearchWrapper(props: ISearchProps) {
  const tags = useAppSelector(tagsS)
  const categories = useAppSelector(categoriesS)

  const isMobile = window.innerWidth <= 600

  if (!tags || !categories) return <Spin />
  return isMobile ? <SearchMobile {...props} /> : <SearchDesktop {...props} />
}
