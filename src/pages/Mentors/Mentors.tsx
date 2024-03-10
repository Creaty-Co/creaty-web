import "./Mentors.scss"

import { HaveQuestions } from "@components/HaveQuestions/HaveQuestions"
import { SearchWrapper } from "@components/Search/SearchWrapper"
import { useScrollToTop } from "@shared/hooks/useScrollToTop"
import { bem, classMerge } from "@shared/utils/common"
import { useAppSelector } from "@store/store"
import { categoriesS, tagsS } from "@store/tags/tags.slice"
import { ICategory } from "@store/tags/tags.types"
import cn from "classnames"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

import { MentorCards } from "./MentorCards/MentorCards"

const CN = "mentors-view"
const { getElement } = bem(CN)

export function Mentors() {
  useScrollToTop()
  const tags = useAppSelector(tagsS)
  const categories = useAppSelector(categoriesS)
  const [searchParams] = useSearchParams()

  const { t } = useTranslation("translation", { keyPrefix: "views.mentors" })

  const urlShortcut = searchParams.get("shortcut")

  const category = categories?.find((category: ICategory) => category.shortcut === urlShortcut)
  const tag = tags?.find(tag => tag.shortcut === urlShortcut)
  const pageTitle = category?.title || tag?.title

  return (
    <div className={CN}>
      <div className={getElement("container")}>
        <div className={getElement("header")}>
          <div className={classMerge(getElement("title"), "heading")}>
            <span className="weak">
              {t("title")}
              {pageTitle && ":"}{" "}
            </span>
            {pageTitle}
          </div>

          {!pageTitle && <div className={cn(getElement("desc"))}>{t("desc")}</div>}
        </div>

        <SearchWrapper isMentorPage />

        <MentorCards category={category} tag={tag} />
      </div>

      <HaveQuestions />
    </div>
  )
}
