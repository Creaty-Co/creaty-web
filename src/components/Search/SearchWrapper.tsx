import "./Search.scss"

import { SearchDesktop } from "./SearchDesktop"
import { SearchMobile } from "./SearchMobile"

export interface ISearchProps {
  isMentorPage?: boolean
}

export function SearchWrapper(props: ISearchProps) {
  const isMobile = window.innerWidth <= 600

  return isMobile ? <SearchMobile {...props} /> : <SearchDesktop {...props} />
}
