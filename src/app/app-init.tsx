import { categoryApi } from "@entities/category/category.api"

import { useAppDispatch } from "./store"

export const AppInit = () => {
  const dispatch = useAppDispatch()
  dispatch(categoryApi.endpoints.getTagsTopics.initiate({ page: 1, page_size: 25 }))
  return null
}