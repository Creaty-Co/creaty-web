import { MouseEventHandler } from "react"

export interface TagType {
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
  children: TagType
  onClick?: MouseEventHandler<HTMLElement>

  dataAttrs?: Record<string, boolean | string>
}