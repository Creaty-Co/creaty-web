import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"

import { MentorPage } from "../../interfaces/types"

export const getAdminMentors = (page: number, page_size: number): Action<PaginationType<{
  id: number
  info: {
    trial_meeting: number
    city: string
  }
  avatar: string
  company: string
  profession: string
  first_name: string
  last_name: string
  price: string
  country: {
    id: number
    name: string
  },
  pages: MentorPage[]
}>> => ({
  method: "GET",
  endpoint: "/admin/mentors",
  params: { page, page_size }
})
