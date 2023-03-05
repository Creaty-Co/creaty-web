import "./faq.scss"

import { ButtonIcon } from "@shared/ui"
import { classWithModifiers } from "@shared/utils"
import { ReactNode, useState } from "react"

export function FAQ(props: { children: ReactNode }) {
  return (
    <div className="faq">{props.children}</div>
  )
}

interface IFAQClause {
  summary: string
  children: ReactNode
}

export function FAQClause(props: IFAQClause) {
  const [expanded, setExpanded] = useState<boolean>(false)
  const [height, setHeight] = useState<number | undefined>()

  return (
    <div className={classWithModifiers("faq__clause", expanded && "expanded")}>
      <div className="faq__summary" onClick={() => setExpanded(!expanded)}>
        <div className="faq__title">{props.summary}</div>
        <ButtonIcon className="faq__button" name="chevron" size="little" />
      </div>
      <div className="faq__content" style={{ "--height": height + "px" }} ref={element => setHeight(element?.scrollHeight)}>
        <div className="faq__inner">
          <div className="faq__text">{props.children}</div>
        </div>
      </div>
    </div>
  )
}
