import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"
import { TagType, TopicType } from "interfaces/types"


export const getTags = (page: number, page_size: number): Action<PaginationType<TagType>> => ({
  method: "GET",
  endpoint: "/tags",
  params: { page, page_size }
})

export const getTagsTopics = (page: number, page_size: number): Action<PaginationType<TopicType>> => ({
  method: "GET",
  endpoint: "/tags/categories",
  params: { page, page_size }
})
