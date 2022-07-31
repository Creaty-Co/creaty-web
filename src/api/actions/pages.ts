import { Action } from "api/client"
import { ResourceKey } from "i18next"
import { PaginationType } from "interfaces/Django"
import { PageFAQType, PageLinkSocialType, PageLinkType, PageType, TagType } from "interfaces/types"



// Personal

export const getPagesMain: Action<PageType> = {
  method: "GET",
  endpoint: "/pages/main"
}

export const patchPagesMain = (body: Partial<{
  tags: number[]
  mentors: number[]
}>): Action<{ id: number }> => ({
  method: "PATCH",
  endpoint: "/pages/main",
  body
})

export const patchPagesMainMentor = (mentorId: number): Action<{ id: number }> => ({
  method: "PATCH",
  endpoint: `/pages/main/mentors/${mentorId}`
})

export const deletePagesMainMentor = (mentorId: number): Action<{ id: number }> => ({
  method: "DELETE",
  endpoint: `/pages/main/mentors/${mentorId}`
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

export const patchPagePersonal = (shortcut: string, body: Partial<{
  tags: number[]
  mentors: number[]
}>): Action<{ id: number }> => ({
  method: "PATCH",
  endpoint: `/pages/personal/${shortcut}`,
  body
})

export const patchPagePersonalMentor = (shortcut: string, mentorId: number): Action<{ id: number }> => ({
  method: "PATCH",
  endpoint: `/pages/personal/${shortcut}/mentors/${mentorId}`
})

export const deletePagePersonalMentor = (shortcut: string, mentorId: number): Action<{ id: number }> => ({
  method: "DELETE",
  endpoint: `/pages/personal/${shortcut}/mentors/${mentorId}`
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

export const getPagesLinksSocials: Action<PaginationType<PageLinkSocialType>> = {
  method: "GET",
  endpoint: "/pages/links/socials"
}

export const postPagesLinksSocials = (body: Omit<PageLinkSocialType, "id">): Action<{ id: number }> => ({
  method: "POST",
  endpoint: `/pages/links/socials`,
  body
})

export const patchPagesLinksSocials = (id: number, body: Partial<Omit<PageLinkSocialType, "id">>): Action<{ id: number }> => ({
  method: "PATCH",
  endpoint: `/pages/links/socials/${id}`,
  body
})

export const deletePagesLinksSocials = (id: number): Action => ({
  method: "DELETE",
  endpoint: `/pages/links/socials/${id}`
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

//! Locales

export const getPagesLocalesLanguageNamespace = (language: string, namespace: string): Action<ResourceKey> => ({
  method: "GET",
  endpoint: `/pages/locales/${language}/${namespace}.json`
})

export const putPagesLocalesLanguageNamespace = (language: string, namespace: string, body: ResourceKey): Action => ({
  method: "PUT",
  endpoint: `/pages/locales/${language}/${namespace}.json`,
  body
})
