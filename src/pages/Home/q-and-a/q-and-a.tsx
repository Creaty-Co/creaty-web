import "./q-and-a.scss"

import { useGetPagesFAQsQuery } from "@shared/api"
import { FAQ, FAQClause, LoaderCover } from "@shared/ui"
import ReactMarkdown from "react-markdown"

export function QAndA() {
  const { data, isLoading } = useGetPagesFAQsQuery()

  if (isLoading) return <LoaderCover white />

  return (
    <FAQ>
      {data && data.results.map(faq => (
        <FAQClause summary={faq.question} key={faq.id}>
          <ReactMarkdown>{faq.answer}</ReactMarkdown>
        </FAQClause>
      ))}
    </FAQ>
  )
}