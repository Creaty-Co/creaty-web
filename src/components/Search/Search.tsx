import "./Search.scss"

import { bem } from "@shared/utils/common"
import { useAppSelector } from "@store/store"
import { useGetCategoriesQuery } from "@store/tags/tags.api"
import { categoriesS, tagsS } from "@store/tags/tags.slice"
import { Button, Select } from "antd"
import cn from "classnames"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"
import { useAppSelector } from "src/store/store"
import { useGetCategoriesQuery } from "src/store/tags/tags.api"
import { categoriesS, tagsS } from "src/store/tags/tags.slice"

const CN = "search"
const { getElement, getModifier } = bem(CN)

export function Search({ fullWidth }: { fullWidth?: boolean }) {
  const tags = useAppSelector(tagsS)
  const categories = useAppSelector(categoriesS)
  const { t } = useTranslation("translation", { keyPrefix: "views.home.mentorSearch" })
  const { isLoading } = useGetCategoriesQuery()

  const [searchParams, setSearchParams] = useSearchParams()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleChange = (values: any, options: any) => {
    const value = values?.slice(-1)?.[0]
    const option = options?.slice(-1)?.[0]
    const newQuerryParams = new URLSearchParams()
    if (values.length > 0) {
      newQuerryParams.set("tag_type", option.tags ? "category" : "tag")
      newQuerryParams.set("tag_shortcut", value)
    }
    setSearchParams(newQuerryParams)
    setOpen(false)
    if (values.length === 0) return
    navigate({ pathname: "/mentors", search: createSearchParams(newQuerryParams).toString() })
  }

  const getValueFromUrl = (): string[] | undefined => {
    const urlShortcut = searchParams.get("tag_shortcut")
    if (urlShortcut) return [urlShortcut]
  }

  return (
    <div className={cn(getModifier(getElement("wrapper"), fullWidth && "fullWidth"))}>
      <Select
        className={CN}
        loading={isLoading}
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
          },
        ]}
        value={getValueFromUrl()}
        onChange={handleChange}
        open={open}
        onDropdownVisibleChange={visible => setOpen(visible)}
        listHeight={480}
        placement="bottomLeft"
        size="large"
        optionLabelProp="title"
        notFoundContent={<span className={getElement("not-found")}>Nothing found...try to change your search</span>}
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
