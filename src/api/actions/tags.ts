import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"
import { TagType, TopicType } from "interfaces/types"


export const getTags = (page: number, page_size: number): Action<PaginationType<TagType>> => ({
  method: "GET",
  endpoint: "/tags",
  params: { page, page_size }
})

export const postTags = (tagId: number, body: {
  shortcut: string
  title_ru: string
  title_en: string
}): Action<{ id: number }> => ({
  method: "POST",
  endpoint: `/tags/categories/${tagId}/tags/`,
  body
})

export const getTagsTopics = (page: number, page_size: number): Action<PaginationType<TopicType>> => ({
  method: "GET",
  endpoint: "/tags/categories",
  params: { page, page_size }
})

export const postTagsTopics = (categoryId: number, body: {
  shortcut: string
  title_ru: string
  title_en: string
}): Action<{ id: number }> => ({
  method: "POST",
  endpoint: `/tags/categories/${categoryId}/tags/`,
  body
})
