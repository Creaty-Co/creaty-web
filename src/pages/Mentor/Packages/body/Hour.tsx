import { SharedButton } from "@shared/ui/buttons/SharedButton"
import { notification } from "antd"
import { useEffect, useState } from "react"
import { FieldValues } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { PopupFormThanks } from "src/components/forms/old/PopupForm/PopupFormThanks"
import { useBookHourlySessionMutation } from "src/store/mentor/mentor.api"
import { openModal } from "src/store/modalContainer.slice"
import { useAppDispatch } from "src/store/store"

import { BookSessionForm } from "../common/BookSessionForm"
import { UnclosablePopupWrapper } from "../common/UnclosablePopupWrapper"

interface IProps {
  hourPrice: number
  mentorSlug: string
  mentorName: string
}

export const Hour = ({ hourPrice, mentorName, mentorSlug }: IProps) => {
  const { t } = useTranslation("translation")
  const dispatch = useAppDispatch()
  const [api, contextHolder] = notification.useNotification()
  const [bookHourlySession, { isLoading, isSuccess, error, reset }] = useBookHourlySessionMutation()

  const [openBookModal, setOpenBookModal] = useState(false)

  const handleSubmit = (values: FieldValues) => {
    const { description, email, name } = values
    bookHourlySession({ description, email, name, mentor: mentorSlug })
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(openModal(<PopupFormThanks />))
      // api.success({ message: "Session successfully booked", duration: 10 })
      // @ts-ignore
      window.dataLayer.push({ event: `Book hour session with mentor`, mentorName: mentorName })
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
      <div className="bg-white rounded-2xl grid grid-cols-[1fr_auto] p-8 items-start gap-4 book-row">
        <div className="grid grid-rows-[auto_auto] gap-2">
          <div className="font--h4-bold text-black-900">{t("views.mentor.plans.hour.title", { mentorName })}</div>
          <div className="font--text-regular text-gray-800">{t("views.mentor.plans.hour.desc")}</div>
          <div className="font--text-regular text-black-900 pt-1">
            <span className="font--text-bold">${hourPrice}</span> / 60 min session
          </div>
        </div>

        <SharedButton
          size="big"
          type="submit"
          color="violet"
          onClick={() => setOpenBookModal(true)}
          id="openModalHourButton"
        >
          {t("views.mentor.plans.hour.submitText")}
        </SharedButton>
      </div>
      <UnclosablePopupWrapper
        open={openBookModal}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        title={t("other.forms.bookSessionHour.title")!}
        mentorName={mentorName}
        closeModal={() => setOpenBookModal(false)}
      >
        <BookSessionForm
          submitText={t("other.forms.bookSessionHour.submitText")}
          terms={t("other.forms.bookSessionHour.terms")}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          id="hour"
        />
      </UnclosablePopupWrapper>
      {contextHolder}
    </>
  )
}
