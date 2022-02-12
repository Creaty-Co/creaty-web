import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"
import { PageFAQType, PageLinkType, PageType, TagType } from "interfaces/types"



// Personal

export const getPagesMain: Action<PageType> = {
  method: "GET",
  endpoint: "/pages/main"
}

export const patchPagesMain = (body: {
  tags: number[]
  mentors: number[]
}): Action<{ id: number }> => ({
  method: "PATCH",
  endpoint: "/pages/main",
  body
})

export const getPagePersonal = (shortcut: string): Action<{
  id: number
  title: string | null
  tags: TagType[]
  mentors: []
}> => ({
  method: "GET",
  endpoint: `/pages/personal/${shortcut}`
})

export const patchPagePersonal = (shortcut: string, body: {
  id: number
  tags: number[]
  mentors: number[]
}): Action<{ id: number }> => ({
  method: "PATCH",
  endpoint: `/pages/personal/${shortcut}`,
  body
})


// Links

export const getPagesLinksDocuments: Action<PaginationType<PageLinkType>> = {
  method: "GET",
  endpoint: "/pages/links/documents"
}

export const patchPagesLinksDocuments = (id: number, url: string): Action<{ id: number }> => ({
  method: "PATCH",
  endpoint: `/pages/links/documents/${id}`,
  body: { url }
})

// FAQs

export const getPagesFAQs: Action<PaginationType<PageFAQType>> = {
  method: "GET",
  endpoint: "/pages/faqs"
}

export const postPagesFAQs = (body: {
  question: string
  answer: string
}): Action<{ id: number }> => ({
  method: "POST",
  endpoint: `/pages/faqs`,
  body
})

export const patchPagesFAQs = (id: number, body: {
  question: string
  answer: string
}): Action<{ id: number }> => ({
  method: "PATCH",
  endpoint: `/pages/faqs/${id}`,
  body
})

export const deletePagesFAQs = (id: number): Action => ({
  method: "DELETE",
  endpoint: `/pages/faqs/${id}`
})
