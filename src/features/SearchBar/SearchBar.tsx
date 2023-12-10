import "./SearchBar.scss"

import { useAppSelector } from "@app/store"
import { categoriesS, tagsS } from "@entities/tags/tags.slice"
import { bem } from "@shared/utils"
import { Select } from "antd"

const CN = "mentor-search"
const { getElement, getModifier } = bem(CN)

export function SearchBar() {
  const tags = useAppSelector(tagsS)
  const categories = useAppSelector(categoriesS)

  return (
    <Select
      // popupClassName={CN}
      style={{ width: "100%" }}
      placeholder="search test"
      options={[
        {
          title: "Industries",
          options: categories,
        },
        {
          title: "Skills",
          options: tags,
        },
      ]}
      listHeight={480}
      placement="bottomLeft"
      size="large"
      // optionRender={() => null}
      optionLabelProp="title"
      fieldNames={{ label: "title", value: "shortcut", groupLabel: "title" }}
      // optionRender={option => {
      //   debugger
      //   return (
      //     <Space>
      //       <span role="img" aria-label={option.data.label}>
      //         {option.data.emoji}
      //       </span>
      //       {option.data.desc}
      //     </Space>
      //   )
      // }}
      dropdownRender={menu => {
        return menu
      }}
    />
  )
}

export default SearchBar
