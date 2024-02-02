import "./QAndA.scss"

import { LoaderCover } from "@shared/ui/LoaderCover/LoaderCover"
import { useGetPagesFAQsQuery } from "@store/pages/pages.api"
import ReactMarkdown from "react-markdown"
import { useGetPagesFAQsQuery } from "src/store/pages/pages.api"

import { FAQ, FAQClause } from "./FAQClause/FAQClause"

import { FAQ, FAQClause } from "./FAQClause/FAQClause"

export function QAndA() {
  const { data, isLoading } = useGetPagesFAQsQuery()

  if (isLoading) return <LoaderCover white />

  return (
    <FAQ>
      {data &&
        data.results.map(faq => (
          <FAQClause summary={faq.question} key={faq.id}>
            <ReactMarkdown>{faq.answer}</ReactMarkdown>
          </FAQClause>
        ))}
    </FAQ>
  )
}
