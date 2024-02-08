import { ITag } from "@components/Tag/Tag.types"

export interface MentorPage {
  id: number | null
  tag: number | null
  category: number | null
}

export interface IMentorState {
  list: MentorType[]
}

export interface MentorType {
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

export interface MentorDetailedType extends MentorType {
  info: {
    trial_meeting: number | null
    resume: string
    what_help: string
    experience: string
    languages: MentorDetailedLanguages[]
    city: string
  }
}

export interface MentorPatchType {
  info: {
    trial_meeting: number | null
    resume: string
    what_help: string
    experience: string
    languages: number[]
    city: string
  }
  avatar: string
  company: string
  profession: string
  first_name: string
  last_name: string
  slug: string
  price: string
  price_currency: string
  tag_set: number[]
  country: number
  packages: Omit<MentorPackageType, "id">[]
}
