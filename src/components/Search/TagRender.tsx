import { Category } from "@components/Tag/Category"
import { Tag } from "@components/Tag/Tag"
import { useAppSelector } from "@store/store"
import { categoriesS } from "@store/tags/tags.slice"
import type { SelectProps } from "antd"

type TagRender = SelectProps["tagRender"]

export const TagRender: TagRender = props => {
  const categories = useAppSelector(categoriesS)
  const category = categories?.find(tag => tag.shortcut === props.value)

  if (category) return <Category {...category} search />
  return <Tag title={props.label as string} shortcut={props.value} search />
}
