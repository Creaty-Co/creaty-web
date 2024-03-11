import "./Search.scss"

import { bem } from "@shared/utils/common"
import { useAppSelector } from "@store/store"
import { categoriesS, tagsS } from "@store/tags/tags.slice"
import { Button, Modal, Select } from "antd"
import cn from "classnames"
import { RawValueType } from "rc-select/lib/Select"
import { useCallback, useEffect, useRef, useState } from "react"
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

  const [searchParams, setSearchParams] = useSearchParams()
  const selectWrapperRef = useRef<any>()
  const selectRef = useRef<any>()

  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

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
      top: selectWrapperRef.current?.getBoundingClientRect()?.y + window.scrollY - 150,
      left: 0,
      behavior: "smooth",
    })
  }, [open])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--ant-select-padding", `0 60px 0 ${getValueFromUrl() && !open ? "16" : "48"}px`)
  }, [getValueFromUrl, open])

  const toggleOverflow = useCallback((open: boolean) => {
    document.documentElement.style.overscrollBehavior = open ? "none" : "auto"
    document.body.style.overscrollBehavior = open ? "none" : "auto"
    document.documentElement.style.position = open ? "fixed" : "static"
    document.body.style.position = open ? "fixed" : "static"
    document.documentElement.style.overflow = open ? "hidden" : "auto"
    document.body.style.overflow = open ? "hidden" : "auto"
  }, [])

  useEffect(() => toggleOverflow(open), [open])

  return (
    <>
      <div className={cn(getModifier(getElement("wrapper"), isMentorPage && "isMentorPage"))} ref={selectWrapperRef}>
        <Select
          className={CN}
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
          suffixIcon={!getValueFromUrl() && <img src={`/static/icons/search.svg`} alt="search" />}
          allowClear={{
            clearIcon: (
              <img
                className={getElement("icon")}
                src="/static/icons/cross.svg"
                alt="cross"
                onClick={e => {
                  e.stopPropagation()
                }}
              />
            ),
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
        maskClosable={false}
        focusTriggerAfterClose={false}
        afterOpenChange={open => {
          if (open) selectRef.current?.focus()
        }}
      >
        <Select
          ref={selectRef}
          className={cn(CN, "mobile")}
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
          dropdownAlign={{ offset: [0, 12], overflow: { adjustY: false, adjustX: true } }}
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
              src="/static/icons/arrow-back.svg"
              alt="arrow-back"
              className={getElement("icon")}
              onClick={e => {
                e.stopPropagation()
                setOpen(false)
              }}
            />
          }
          allowClear={{
            clearIcon: (
              <img
                src="/static/icons/cross.svg"
                alt="cross"
                className={getElement("icon")}
                onClick={e => {
                  e.stopPropagation()
                }}
              />
            ),
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
