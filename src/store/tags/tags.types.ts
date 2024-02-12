import { ITag } from "@components/Tag/Tag"

export interface ICategory {
  id: number
  shortcut: string
  title: string
  icon: string
  tags: ITag[]
}

export interface ITagsState {
  categories?: ICategory[]
  tags?: ITag[]
}
