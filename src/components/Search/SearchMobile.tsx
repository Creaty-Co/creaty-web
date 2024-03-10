import "./Search.scss"

import { bem } from "@shared/utils/common"
import { useAppSelector } from "@store/store"
import { useGetCategoriesQuery } from "@store/tags/tags.api"
import { categoriesS, tagsS } from "@store/tags/tags.slice"
import { Button, Modal, Select } from "antd"
import cn from "classnames"
import { RawValueType } from "rc-select/lib/Select"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"

import { ISearchProps } from "./SearchWrapper"
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

export function SearchMobile({ isMentorPage }: ISearchProps) {
  const tags = useAppSelector(tagsS)
  const categories = useAppSelector(categoriesS)
  const { t } = useTranslation("translation", { keyPrefix: "views.home.mentorSearch" })
  const { isLoading } = useGetCategoriesQuery()

  const [searchParams, setSearchParams] = useSearchParams()
  const selectRef = useRef<any>()

  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  console.log("open: ", open)
  const handleClick = () => {
    navigate({ pathname: "/mentors", search: createSearchParams(searchParams).toString() })
  }

  const handleChange = (values: string[]) => {
    const newValue = values?.slice(-1)?.[0]
    const newQuerryParams = new URLSearchParams()
    if (values.length > 0) newQuerryParams.set("shortcut", newValue)
    setSearchParams(newQuerryParams)
    if (values.length === 0) return
    setOpen(false)
    navigate({ pathname: "/mentors", search: createSearchParams(newQuerryParams).toString() })
  }

  const getValueFromUrl = (): string[] | undefined => {
    const urlShortcut = searchParams.get("shortcut")
    if (urlShortcut) return [urlShortcut]
  }

  useEffect(() => {
    if (!open) return
    window.scroll({
      top: selectRef.current?.getBoundingClientRect()?.y + window.scrollY - 150,
      left: 0,
      behavior: "smooth",
    })
  }, [open])

  const showSearchIcon = !(isMentorPage && !open && getValueFromUrl())

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--ant-select-padding", `0 48px 0 ${showSearchIcon ? "48" : "16"}px`)
  }, [showSearchIcon])

  return (
    <>
      <div className={cn(getModifier(getElement("wrapper"), isMentorPage && "isMentorPage"))} ref={selectRef}>
        <Select
          className={CN}
          loading={isLoading}
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
          listHeight={window.screen.height > 650 ? 480 : window.screen.height - 250}
          placement="bottomLeft"
          size="large"
          optionLabelProp="title"
          notFoundContent={<span className={getElement("not-found")}>Nothing found...try to change your search</span>}
          fieldNames={{ label: "title", value: "shortcut", groupLabel: "title" }}
          showSearch
          mode="multiple"
          tagRender={TagRender}
          open={false}
          suffixIcon={showSearchIcon && <img src={`/static/icons/search.svg`} alt="search" />}
          allowClear={{
            clearIcon: <img src="/static/icons/cross.svg" alt="cross" />,
          }}
          onClick={e => {
            e.stopPropagation()
            setOpen(true)
          }}
        />

        <Button
          className={cn(getElement("button"), "button button--violet button--big button__text")}
          type="primary"
          onClick={handleClick}
        >
          {t("button")}
        </Button>
      </div>

      <Modal
        destroyOnClose={true}
        title={null}
        footer={null}
        open={open}
        style={{ top: 16, bottom: 16, left: 0, right: 16 }}
        width={window.screen.width - 32}
        closeIcon={null}
        focusTriggerAfterClose={false}
      >
        <Select
          className={cn(CN, "mobile")}
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
          open
          autoFocus
          listHeight={window.screen.height > 650 ? 480 : window.screen.height - 250}
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
          suffixIcon={
            <img
              src={`/static/icons/${open ? "arrow-back" : "search"}.svg`}
              alt="search"
              onClick={e => {
                setOpen(false)
              }}
            />
          }
          allowClear={{
            clearIcon: <img src="/static/icons/cross.svg" alt="cross" />,
          }}
          onInputKeyDown={event => {
            if (event.key === "Backspace") {
              return event.stopPropagation()
            }
          }}
        />
      </Modal>
    </>
  )
}
