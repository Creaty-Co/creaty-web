import { Action } from "api/client"
import { PageType, TagType } from "interfaces/types"

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
