/*

* Interfaces that are too small in meaning to split up

*/

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

export interface MentorType {
  id: number
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
  tags: TagType[]
  packages: MentorPackageType[]
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
    trial_meeting: number
    resume: string
    what_help: string
    experience: string
    portfolio: string
    languages: MentorDetailedLanguages[]
    city_ru: string
    city_en: string
  }
}

export interface MentorPatchType {
  info: {
    trial_meeting: number | null
    resume: string
    what_help: string
    experience: string
    portfolio: string
    languages: number[]
    city_ru: string
    city_en: string
  }
  avatar: string
  company: string
  profession: string
  first_name: string
  last_name: string
  price: string
  price_currency: string
  tag_set: number[]
  country: number
  packages: MentorPackageType[]
}

/* Pages */

export interface PageType {
  id: number
  tags: TagType[]
  mentors: MentorType[]
}
