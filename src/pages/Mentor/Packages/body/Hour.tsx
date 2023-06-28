import { useAppDispatch } from "@app/store"
import { useBookHourlySessionMutation } from "@entities/mentor"
import { PopupFormThanks } from "@features/Form"
import { openModal } from "@shared/layout"
import { Button } from "@shared/ui"
import { notification } from "antd"
import { useEffect, useState } from "react"
import { FieldValues } from "react-hook-form"
import { useTranslation } from "react-i18next"

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
      api.success({ message: "Session successfully booked", duration: 10 })
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
      <div className="bg-white rounded-2xl grid grid-cols-[1fr_auto] pl-10 pr-6 py-6 items-start gap-4">
        <div className="grid grid-rows-[auto_auto] gap-2">
          <div className="font--h4-bold text-black-900">{t("views.mentor.plans.hour.title", { mentorName })}</div>
          <div className="font--text-regular text-gray-800">{t("views.mentor.plans.hour.desc")}</div>
          <div className="font--text-regular text-black-900 pt-1">
            <span className="font--text-bold">${hourPrice}</span> / 60 min session
          </div>
        </div>

        <Button size="big" type="submit" color="violet" onClick={() => setOpenBookModal(true)}>
          {t("views.mentor.plans.hour.submitText")}
        </Button>
      </div>

      <UnclosablePopupWrapper
        open={openBookModal}
        title={t("other.forms.bookSessionHour.title")}
        mentorName={mentorName}
        closeModal={() => setOpenBookModal(false)}
      >
        <BookSessionForm
          submitText={t("other.forms.bookSessionHour.submitText")}
          terms={t("other.forms.bookSessionHour.terms")}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </UnclosablePopupWrapper>
      {contextHolder}
    </>
  )
}
