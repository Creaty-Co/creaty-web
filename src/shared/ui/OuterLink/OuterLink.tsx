import "./OuterLink.scss"

import { selectPagesDocumentsLinks } from "@store/pages/pages.slice"
import { LinksT } from "@store/pages/pages.types"
import { useAppSelector } from "@store/store"
import { HTMLAttributes, ReactNode } from "react"
import { useTranslation } from "react-i18next"
export type TranslateLinkT =
  | "terms"
  | "mentors"
  | "support"
  | "pickMentor"
  | "becomeMentor"
  | "cookiePolicy"
  | "privacyPolicy"

export interface IOuterLink extends Omit<HTMLAttributes<HTMLAnchorElement>, "href" | "rel" | "target"> {
  linkHref?: LinksT
  translateType?: TranslateLinkT
  to?: string
  children?: ReactNode
  className?: string
}

export function OuterLink({ linkHref, to, translateType, children, className }: IOuterLink) {
  const { t } = useTranslation("translation", { keyPrefix: "footer" })
  const docsLink = useAppSelector(selectPagesDocumentsLinks)

  if (!linkHref && !to) return null

  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      href={to ? to : linkHref ? docsLink?.[linkHref].url : ""}
      className={className}
    >
      {children || t(`links.${[translateType]}`)}
    </a>
  )
}
