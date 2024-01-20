import { MouseEventHandler } from "react"

export interface ITag {
  id: number
  shortcut: string
  title: string
}

export interface ITagString {
  noHash?: boolean
  children: string
  onClick?: MouseEventHandler<HTMLElement>

  dataAttrs?: Record<string, boolean | string>
}

export interface ITagSearch {
  noHash?: undefined
  children: ITag
  onClick?: MouseEventHandler<HTMLElement>

  dataAttrs?: Record<string, boolean | string>
}
