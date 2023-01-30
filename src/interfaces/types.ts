/*

* Interfaces that are too small in meaning to split up

*/

import { URLDataBase64 } from "./common"

/* Form */

export interface FormType {
  id: number
  type: "become_mentor" | "choose_mentor" | "test_meeting" | "still_questions"
  description: string | null
  post_send: string
  fields: FormFieldType[]
}

export interface FormFieldType {
  type: "name" | "email" | "telegram" | "facebook" | "whats_app" | "viber" | "about",
  placeholder: string
}

/* Tag & Topic */

export interface TagType {
  id: number
  shortcut: string
  title: string
}

export interface TopicType {
  id: number
  shortcut: string
  title: string
  icon: string
  tags: TagType[]
}

/* Mentors */

export interface MentorPage {
  id: number | null
  tag: number | null
  category: number | null
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
  country: {
    id: number
    flag_unicode: string
  }
  tags: TagType[]
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
    top_info: string
    what_help: string
    experience: string
    languages: MentorDetailedLanguages[]
    city: string
  }
}

export interface MentorPatchType {
  info: {
    trial_meeting: number | null
    top_info: string
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
  tag_set: number[]
  country: number
  packages: Omit<MentorPackageType, "id">[]
}

/* Pages */
export interface PageType {
  id: number
  tags: TagType[]
  mentors: MentorType[]
}

export interface PageLinkType {
  id: number
  type: "facebook" | "instagram" | "help" | "user_agreement" | "privacy_policy" | "cookie_policy"
  url: string
}

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

/* Mailings */

export interface MailingPreviewType {
  id: number
  subject: string
  is_done: boolean | null
}

export interface MailingType {
  id: number
  subject: string
  content: string
}
