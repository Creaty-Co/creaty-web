import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"
import { MentorDetailedType, MentorType } from "interfaces/types"

export const getMentors = (page: number, page_size: number, tag_set: (number | undefined)[]): Action<PaginationType<MentorType>> => ({
  method: "GET",
  endpoint: "/mentors",
  params: { page, page_size, tag_set: tag_set.filter(Boolean).join(",") }
})

export const patchMentors = (body: Partial<{
  info: {
    trial_meeting: number
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
}>): Action<{ id: number }> => ({
  method: "PATCH",
  endpoint: "/mentors",
  body
})

export const getMentorsId = (id: number): Action<MentorDetailedType> => ({
  method: "GET",
  endpoint: `/mentors/${id}`
})
