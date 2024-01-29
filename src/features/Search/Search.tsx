import "./Search.scss"

import { useAppSelector } from "@app/store"
import { categoriesS, tagsS } from "@entities/tags/tags.slice"
import { bem } from "@shared/utils"
import { Button, Select } from "antd"
import { useTranslation } from "react-i18next"

const CN = "search"
const { getElement } = bem(CN)

export function Search() {
  const tags = useAppSelector(tagsS)
  const categories = useAppSelector(categoriesS)
  const { t } = useTranslation("translation", { keyPrefix: "views.home.mentorSearch" })

  return (
    <div className={getElement("wrapper")}>
      <Select
        className={CN}
        popupClassName={getElement("popup")}
        placeholder="Select industry or skill"
        options={[
          {
            title: "Industries",
            options: categories,
          },
          {
            title: "Skills",
            options: tags,
            isTag: true,
          },
        ]}
        listHeight={480}
        placement="bottomLeft"
        size="large"
        optionLabelProp="title"
        notFoundContent="Nothing found...try to change your search"
        fieldNames={{ label: "title", value: "shortcut", groupLabel: "title" }}
        showSearch
        allowClear
        mode="multiple"
        dropdownAlign={{ offset: [0, 12] }}
        optionRender={option => {
          return (
            <span className={option.data.tags ? getElement("option-category") : getElement("option-tag")}>
              {option.data.tags ? (
                <img src={option.data.icon} className={getElement("option-category-icon")} />
              ) : (
                <span className={getElement("option-tag-hash")}>#</span>
              )}
              {option.label}
            </span>
          )
        }}
      />

      <Button className="button button--violet button--big button__text" type="primary">
        {t("button")}
      </Button>
    </div>
  )
}

export default Search
