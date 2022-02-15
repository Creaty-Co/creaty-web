import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"

export const getAdminMentors = (page: number, page_size: number): Action<PaginationType<{
  id: number
  info: {
    trial_meeting: number
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
  country: {
    id: number
    name: string
  }
}>> => ({
  method: "GET",
  endpoint: "/admin/mentors",
  params: { page, page_size }
})