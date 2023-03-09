import { TagType } from "@entities" 

export interface CategoryType {
  id: number
  shortcut: string
  title: string
  icon: string
  tags: TagType[]
}

export interface ICategoryState {
  list: CategoryType[]
  tags: TagType[]
}