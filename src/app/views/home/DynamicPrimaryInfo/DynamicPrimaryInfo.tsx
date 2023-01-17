import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { DefaultRootState, useSelector } from "react-redux"


const ENTER_INTERVAL = 100
const CYCLE_INTERVAL = 5000
const PERSONAL_PAGE_TIMEOUT = 12000

interface DynamicPrimaryInfoProps {
  firstHeadingShortcut?: string
}

function DynamicPrimaryInfo(props: DynamicPrimaryInfoProps) {
  const topics = useSelector<DefaultRootState, DefaultRootState["topics"]>(state => state.topics)
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
    <div className="dynamic-primary-info">
      <h1 className="dynamic-primary-info__title heading">
        <em>{dynamicHeading}</em>
        <span>{t("title")}</span>
      </h1>
      <h2 className="dynamic-primary-info__desc">{t("desc")}</h2>
    </div>
  )
}


export default DynamicPrimaryInfo
