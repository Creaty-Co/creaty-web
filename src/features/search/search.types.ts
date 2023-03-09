import { CategoryType, TagType } from "@entities"

export interface ISearchState {
  topic?: CategoryType
  tag?: TagType
  focused: boolean
}