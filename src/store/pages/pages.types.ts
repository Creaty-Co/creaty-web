import { ITag } from "@components/Tag/Tag.types"
import { MentorType } from "@store/mentor/mentor.types"

export interface PageType {
  id: number
  tags: ITag[]
  mentors: MentorType[]
}

export interface PagePersonalType {
  id: number
  title: string | null
  tags: ITag[]
  mentors: [] // ??? MentorType[]
}

export type LinksT = "facebook" | "instagram" | "help" | "user_agreement" | "privacy_policy" | "cookie_policy"
export interface PageLinkType {
  id: number
  type: LinksT
  url: string
}

export type DocumentsLinksT = Record<PageLinkType["type"], PageLinkType> | null

export interface PageFAQType {
  id: number
  question: string
  answer: string
}

export interface IPagesState {
  documentsLinks: DocumentsLinksT
}
