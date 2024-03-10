import "./Search.scss"

import { bem } from "@shared/utils/common"
import { useAppSelector } from "@store/store"
import { useGetCategoriesQuery } from "@store/tags/tags.api"
import { categoriesS, tagsS } from "@store/tags/tags.slice"
import { Button, Select } from "antd"
import cn from "classnames"
import { RawValueType } from "rc-select/lib/Select"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"

import { TagRender } from "./TagRender"
export interface FlattenOptionData<OptionType> {
  label?: React.ReactNode
  data: OptionType
  key: React.Key
  value?: RawValueType
  groupOption?: boolean
  group?: boolean
}

const CN = "search"
const { getElement, getModifier } = bem(CN)

export function Search({ fullWidth }: { fullWidth?: boolean }) {
  const tags = useAppSelector(tagsS)
  const categories = useAppSelector(categoriesS)
  const { t } = useTranslation("translation", { keyPrefix: "views.home.mentorSearch" })
  const { isLoading } = useGetCategoriesQuery()

  const [searchParams, setSearchParams] = useSearchParams()
  const selectRef = useRef<any>()

  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => {
    navigate({ pathname: "/mentors", search: createSearchParams(searchParams).toString() })
  }

  const handleChange = (values: any) => {
    const value = values?.slice(-1)?.[0]
    const newQuerryParams = new URLSearchParams()
    if (values.length > 0) newQuerryParams.set("shortcut", value)
    setSearchParams(newQuerryParams)
    setOpen(false)
    if (values.length === 0) return
    navigate({ pathname: "/mentors", search: createSearchParams(newQuerryParams).toString() })
  }

  const getValueFromUrl = (): string[] | undefined => {
    const urlShortcut = searchParams.get("shortcut")
    if (urlShortcut) return [urlShortcut]
  }

  const handleDropdownVisibleChange = (visible: boolean) => {
    setOpen(visible)
    if (!visible) return
    window.scroll({
      top: selectRef.current?.getBoundingClientRect()?.y + window.scrollY - 100,
      left: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className={cn(getModifier(getElement("wrapper"), fullWidth && "fullWidth"))} ref={selectRef}>
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
        onDropdownVisibleChange={handleDropdownVisibleChange}
        listHeight={window.screen.height > 650 ? 480 : 300}
        placement="bottomLeft"
        size="large"
        optionLabelProp="title"
        notFoundContent={<span className={getElement("not-found")}>Nothing found...try to change your search</span>}
        fieldNames={{ label: "title", value: "shortcut", groupLabel: "title" }}
        filterOption={(inputValue, option) =>
          !!option?.title.replace(/ /g, "").toLowerCase().includes(inputValue.replace(/ /g, "").toLowerCase())
        }
        showSearch
        mode="multiple"
        dropdownAlign={{ offset: [0, 12], overflow: { adjustY: false } }}
        optionRender={option => (
          <span className={getElement(`option-${option.data.tags ? "category" : "tag"}`)}>
            {option.data.tags ? (
              <img src={option.data.icon} className={getElement("option-category-icon")} />
            ) : (
              <span className={getElement("option-tag-hash")}>#</span>
            )}
            {option.label}
          </span>
        )}
        tagRender={TagRender}
        suffixIcon={<img src={`/static/icons/${open ? "arrow-back" : "search"}.svg`} alt="search" />}
        allowClear={{ clearIcon: <img src="/static/icons/cross.svg" alt="cross" /> }}
      />

      <Button
        className={cn(getElement("button"), "button button--violet button--big button__text")}
        type="primary"
        onClick={handleClick}
      >
        {t("button")}
      </Button>
    </div>
  )
}
