import "./Search.scss"

import { useGetCategoriesQuery } from "@store/tags/tags.api"
import { Spin } from "antd"

import { SearchDesktop } from "./SearchDesktop"
import { SearchMobile } from "./SearchMobile"

export interface ISearchProps {
  isMentorPage?: boolean
}

export function SearchWrapper(props: ISearchProps) {
  const { isLoading } = useGetCategoriesQuery()

  const isMobile = window.innerWidth <= 600

  if (isLoading) return <Spin />
  return isMobile ? <SearchMobile {...props} /> : <SearchDesktop {...props} />
}
