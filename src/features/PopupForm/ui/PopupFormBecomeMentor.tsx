import { useAppSelector } from "@app/store"
import { Form, selectContactFormByType } from "@features/Form"
import { VerifyForm } from "@features/VerifyForm/VerifyForm"
import { PopupLayout } from "@shared/layout"

export function PopupFormBecomeMentor() {
  const form = useAppSelector(selectContactFormByType("become_mentor"))

  const rForm = (
    <PopupLayout title="Apply to be a mentor" width="35em">
      <div className="pb-8 font--text-regular">
        <p className="text-violet">We are looking for people:</p>
        <ol style={{ listStyle: "list-outside" }} className="text-black-1000 list-decimal list-outside pl-6 indent-3">
          <li>with more than 4 years of professional experience</li>
          <li>with time available for sessions with students</li>
        </ol>
      </div>

      <Form type="become_mentor" />
    </PopupLayout>
  )

  const rThanks = (
    <PopupLayout title="Verify your email" width="35em">
      <VerifyForm email="yasha.petrunin@gmail.com" />
    </PopupLayout>
  )

  return <>{form.submitted ? rThanks : rForm}</>
}
