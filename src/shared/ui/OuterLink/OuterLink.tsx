import "./OuterLink.scss"

import { useAppSelector } from "@app/store"
import { LinksT } from "@shared/api"
import { selectPagesDocumentsLinks } from "@shared/api/pages/pages.slice"
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

  if (!linkHref) return null

  return (
    <a rel="noopener noreferrer" target="_blank" href={to ? to : docsLink?.[linkHref].url || ""} className={className}>
      {children || t(`links.${[translateType]}`)}
    </a>
  )
}
