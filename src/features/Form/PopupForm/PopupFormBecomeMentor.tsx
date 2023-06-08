import { FormBecomeMentor } from "@features/Form/ui"
import { PopupLayout } from "@shared/layout"

export function PopupFormBecomeMentor() {
  return (
    <PopupLayout title="Apply to be a mentor">
      <div className="pb-8 font--text-regular">
        <p className="text-violet">We are looking for people:</p>
        <ol style={{ listStyle: "list-outside" }} className="text-black-1000 list-decimal list-outside pl-6 indent-3">
          <li>with more than 4 years of professional experience</li>
          <li>with time available for sessions with students</li>
        </ol>
      </div>

      <FormBecomeMentor />
    </PopupLayout>
  )
}
