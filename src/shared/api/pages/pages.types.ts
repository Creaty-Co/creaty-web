import { MentorType, TagType } from "@entities"
import { URLDataBase64 } from "@shared/types"

export interface PageType {
  id: number
  tags: TagType[]
  mentors: MentorType[]
}

export interface PagePersonalType {
  id: number
  title: string | null
  tags: TagType[]
  mentors: [] // ??? MentorType[]
}

export type LinksT = "facebook" | "instagram" | "help" | "user_agreement" | "privacy_policy" | "cookie_policy"
export interface PageLinkType {
  id: number
  type: LinksT
  url: string
}

export type DocumentsLinksT = Record<PageLinkType["type"], PageLinkType> | null

export interface PageLinkSocialType {
  id: number
  icon: URLDataBase64 | string
  url: string
}

export interface PageFAQType {
  id: number
  question: string
  answer: string
}

export interface IPagesState {
  documentsLinks: DocumentsLinksT
}
