import { useAppDispatch } from "@app/store"
import { useBookHourlySessionMutation } from "@entities/mentor"
import { PopupFormThanks } from "@features/Form"
import { openModal } from "@shared/layout"
import { Button } from "@shared/ui"
import { notification } from "antd"
import { useEffect, useState } from "react"
import { FieldValues } from "react-hook-form"

import { BookSessionModal } from "./../common/BookSessionModal"

interface IProps {
  hourPrice: number
  mentorSlug: string
  mentorName: string
}

export const Hour = ({ hourPrice, mentorName, mentorSlug }: IProps) => {
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
          <div className="font--h4-bold text-black-900">
            Mentoring session with <em className="text-violet">{mentorName}</em>
          </div>
          <div className="font--text-regular text-gray-800">
            1-hour personal mentoring session.
            <br />
            No nonsense, just straight-up support and guidance.
          </div>
          <div className="font--text-regular text-black-900 pt-1">
            <em className="font--text-bold">${hourPrice}</em> / 60 min session
          </div>
        </div>

        <Button size="big" type="submit" color="violet" onClick={() => setOpenBookModal(true)}>
          Book now
        </Button>
      </div>

      <BookSessionModal
        title="Fill out the form to book your session with"
        mentorName={mentorName}
        submitText="Book session now"
        open={openBookModal}
        isLoading={isLoading}
        closeModal={() => setOpenBookModal(false)}
        onSubmit={handleSubmit}
      />

      {contextHolder}
    </>
  )
}
