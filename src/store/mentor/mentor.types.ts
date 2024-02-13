import { ITag } from "@store/tags/tags.types"

export interface MentorPage {
  id: number | null
  tag: number | null
  category: number | null
}

export interface IMentorState {
  list: IMentor[]
}

export interface IMentor {
  id: number
  slug: string
  avatar: string
  company: string
  profession: string
  first_name: string
  last_name: string
  price: string
  price_currency: string
  country: {
    id: number
    flag_unicode: string
  }
  tags: ITag[]
  packages: MentorPackageType[]
  pages: MentorPage[]
}

export interface MentorPackageType {
  id: number
  lessons_count: number
  discount: number
}

export interface MentorDetailedLanguages {
  id: number
  name_native: string
}

export interface IMentorDetailed extends IMentor {
  info: {
    trial_meeting: number | null
    resume: string
    what_help: string
    experience: string
    languages: MentorDetailedLanguages[]
    city: string
  }
}
