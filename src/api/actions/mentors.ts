import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"
import { MentorDetailedType, MentorPackageType, MentorPatchType, MentorType } from "interfaces/types"

export const getMentors = (page: number, page_size: number, tag_set: (number | undefined)[]): Action<PaginationType<MentorType>> => ({
  method: "GET",
  endpoint: "/mentors",
  params: { page, page_size, tag_set: tag_set.filter(Boolean).join(",") }
})

export const postMentors = (body: MentorPatchType): Action<{ id: number }> => ({
  method: "POST",
  endpoint: "/mentors",
  body
})

export const patchMentorsId = (id: number, body: MentorPatchType): Action<{ id: number }> => ({
  method: "PATCH",
  endpoint: `/mentors/${id}`,
  body
})

export const getMentorsId = (id: number): Action<MentorDetailedType> => ({
  method: "GET",
  endpoint: `/mentors/${id}`
})


export const deleteMentorsId = (id: number): Action => ({
  method: "DELETE",
  endpoint: `/mentors/${id}`
})
