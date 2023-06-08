import { Button } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"

const CN = "have-questions"
const { getElement } = bem(CN)
const element = "have-questions"
const CNElement = getElement(element)

interface IProps {
  reset(): void
}

export const HaveQuestionsAfterSubmit = ({ reset }: IProps) => {
  return (
    <div className={cn(CNElement, "grid grid-cols-1 grid-rows-[auto_1fr] gap-3")}>
      <div className={cn(getElement("title"), "font--h3-bold text-black-900")}>Thanks for request!</div>

      <div className={cn(getElement("desc"), "font--text-regular text-black-900")}>
        We will contact you within 24 hours to help you find a perfect mentor :)
      </div>

      <Button size="biggest" color="dark" type="submit" onClick={reset}>
        Reset
      </Button>
    </div>
  )
}
