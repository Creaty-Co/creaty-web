import "./dynamic-primary-info.scss"

import { useAppSelector } from "@app/store"
import { selectTopics } from "@entities/category"
import { bem } from "@shared/utils"
import cn from "classnames"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

const ENTER_INTERVAL = 100
const CYCLE_INTERVAL = 5000
const PERSONAL_PAGE_TIMEOUT = 12000

interface IDynamicPrimaryInfo {
  firstHeadingShortcut?: string
}

const CN = "dynamic-primary-info"
const { getElement } = bem(CN)

export function DynamicPrimaryInfo(props: IDynamicPrimaryInfo) {
  const topics = useAppSelector(selectTopics)
  const { t } = useTranslation("translation", { keyPrefix: "views.home.primaryInfo" })

  const rejectRef = useRef<Function>()
  const [dynamicHeading, setDynamicHeading] = useState("...")

  async function delay(ms: number) {
    return new Promise<void>((resolve, reject) => {
      rejectRef.current = reject
      setTimeout(resolve, ms)
    })
  }

  async function eraseHeading(heading: string) {
    for (let i = 0; i <= heading.length; i++) {
      await delay(ENTER_INTERVAL)
      setDynamicHeading(heading.slice(0, heading.length - i))
    }
  }

  async function writeHeading(heading: string) {
    for (let i = 0; i <= heading.length; i++) {
      await delay(ENTER_INTERVAL)
      setDynamicHeading(heading.slice(0, i))
    }
  }

  async function writeEraseHeading(heading: string) {
    await writeHeading(heading)
    await delay(CYCLE_INTERVAL)
    await eraseHeading(heading)
  }

  async function runHeadingCycle() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      for (const topic of topics.list) {
        await writeEraseHeading(topic.title)
      }
    }
  }

  useEffect(() => {
    (async () => {
      if (topics.list.length === 0) return
      if (props.firstHeadingShortcut) {
        const topic = topics.list.find(topic => topic.shortcut === props.firstHeadingShortcut)
        const tag = topics.tags.find(tag => tag.shortcut === props.firstHeadingShortcut)
        const heading = topic?.title || tag?.title

        if (heading) {
          await writeHeading(heading)
          await delay(PERSONAL_PAGE_TIMEOUT)
          await eraseHeading(heading)
        }
      }
      await runHeadingCycle()
    })().catch(error => {
      if (process.env.NODE_ENV === "development") {
        console.warn(error)
      }
    })
    return () => rejectRef.current?.("DynamicPrimaryInfo was unmounted or updated")
  }, [props.firstHeadingShortcut, topics])

  return (
    <div className={CN}>
      <div className={cn(getElement("title"), "heading")}>
        <em>{dynamicHeading}</em>
        <span>{t("title")}</span>
      </div>

      <div className={getElement("desc")}>
        {t("desc")}
      </div>
    </div>
  )
}