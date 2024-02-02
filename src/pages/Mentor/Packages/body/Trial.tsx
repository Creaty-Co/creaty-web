import { SharedButton } from "@shared/ui/buttons/SharedButton"
import { notification } from "antd"
import { useEffect, useState } from "react"
import { FieldValues } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { PopupFormThanks } from "src/components/forms/old/PopupForm/PopupFormThanks"
import { useBookTrialSessionMutation } from "src/store/mentor/mentor.api"
import { openModal } from "src/store/modalContainer.slice"
import { useAppDispatch } from "src/store/store"

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
      window.dataLayer.push({ event: `Book trial session with mentor`, mentorName: mentorName })
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

          <SharedButton
            size="big"
            type="submit"
            color="white"
            onClick={() => setOpenBookModal(true)}
            id="openModalTrialButton"
          >
            {t("views.mentor.plans.trial.submitText")}
          </SharedButton>
        </div>
      ) : null}

      <UnclosablePopupWrapper
        open={openBookModal}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        title={t("other.forms.bookSessionTrial.title")!}
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
