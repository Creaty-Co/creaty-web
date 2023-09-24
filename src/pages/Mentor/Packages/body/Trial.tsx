import { useAppDispatch } from "@app/store"
import { useBookTrialSessionMutation } from "@entities"
import { PopupFormThanks } from "@features/Form"
import { openModal } from "@shared/layout"
import { Button } from "@shared/ui"
import { notification } from "antd"
import { useEffect, useState } from "react"
import { FieldValues } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { BookSessionForm } from "./../common/BookSessionForm"
import { UnclosablePopupWrapper } from "./../common/UnclosablePopupWrapper"

interface IProps {
  mentorSlug: string
  mentorName: string
  minutsOfTrialMeeting?: number | null
}

export const Trial = ({ minutsOfTrialMeeting, mentorSlug, mentorName }: IProps) => {
  const { t } = useTranslation("translation")
  const dispatch = useAppDispatch()
  const [api, contextHolder] = notification.useNotification()
  const [bookTrialSession, { isLoading, isSuccess, error, reset }] = useBookTrialSessionMutation()
  const [openBookModal, setOpenBookModal] = useState(false)

  const handleSubmit = (values: FieldValues) => {
    const { description, email, name } = values
    bookTrialSession({ description, email, name, mentor: mentorSlug })
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(openModal(<PopupFormThanks />))
      // api.success({ message: "Session successfully booked", duration: 10 })
      // @ts-ignore
      window.dataLayer.push({"event": `Book trial session with mentor`, "mentorName": mentorName})
      setOpenBookModal(false)
    }
  }, [isSuccess])

  useEffect(() => {
    if (!error) return
    const message =
      (error as any)?.data?.detail ||
      (error as any)?.data?.error?.detail?.message ||
      (error as any)?.data?.error?.detail
    api.error({ message, duration: 10 })
    reset()
  }, [error])

  return (
    <>
      {minutsOfTrialMeeting ? (
        <div className="bg-black-900 rounded-2xl grid grid-cols-[1fr_auto] p-8 items-start selector gap-4 book-row">
          <div className="grid grid-rows-[auto_auto] gap-2">
            <div className="font--h4-bold text-white">
              {t("views.mentor.plans.trial.title", { minutsOfTrialMeeting })}{" "}
            </div>
            <div className="font--text-regular text-gray-700">
              {t("views.mentor.plans.trial.desc", { minutsOfTrialMeeting })}
            </div>
          </div>

          <Button size="big" type="submit" color="white" onClick={() => setOpenBookModal(true)} id="openModalTrialButton">
            {t("views.mentor.plans.trial.submitText")}
          </Button>
        </div>
      ) : null}

      <UnclosablePopupWrapper
        open={openBookModal}
        title={t("other.forms.bookSessionTrial.title")}
        mentorName={mentorName}
        closeModal={() => setOpenBookModal(false)}
      >
        <BookSessionForm
          submitText={t("other.forms.bookSessionTrial.submitText")}
          terms={t("other.forms.bookSessionTrial.terms")}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          id="trial"
        />
      </UnclosablePopupWrapper>

      {contextHolder}
    </>
  )
}
