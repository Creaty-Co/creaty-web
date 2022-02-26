import { Action } from "api/client"
import { URLDataBase64 } from "interfaces/common"
import { PaginationType } from "interfaces/Django"
import { TagType, TopicType } from "interfaces/types"


export const getTags = (page: number, page_size: number): Action<PaginationType<TagType>> => ({
  method: "GET",
  endpoint: "/tags",
  params: { page, page_size }
})

export const postTags = (topicId: number, body: {
  shortcut: string
  title_ru: string
  title_en: string
}): Action<{ id: number }> => ({
  method: "POST",
  endpoint: `/tags/categories/${topicId}/tags`,
  body
})

export const deleteTags = (id: number): Action => ({
  method: "DELETE",
  endpoint: `/tags/${id}`
})

export const patchTags = (id: number, body: {
  shortcut: string
  title: string
}): Action<{ id: number }> => ({
  method: "PATCH",
  endpoint: `/tags/${id}`,
  body
})


export const getTagsTopics = (page: number, page_size: number): Action<PaginationType<TopicType>> => ({
  method: "GET",
  endpoint: "/tags/categories",
  params: { page, page_size }
})

export const postTagsTopics = (body: {
  shortcut: string
  title_ru: string
  title_en: string
  icon: URLDataBase64 | string
}): Action<{ id: number }> => ({
  method: "POST",
  endpoint: `/tags/categories`,
  body
})

export const patchTagsTopics = (id: number, body: {
  shortcut: string
  title: string
  icon?: URLDataBase64
}): Action<{ id: number }> => ({
  method: "PATCH",
  endpoint: `/tags/${id}`,
  body
})
