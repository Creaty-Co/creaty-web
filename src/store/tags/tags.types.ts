export interface ITag {
  id: number
  shortcut: string
  title: string
}

export interface ICategory extends ITag {
  icon: string
  tags: ITag[]
}

export interface ITagsState {
  categories?: ICategory[]
  tags?: ITag[]
}
