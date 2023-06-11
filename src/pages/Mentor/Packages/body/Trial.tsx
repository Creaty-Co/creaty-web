import { useAppDispatch } from "@app/store"
import { useBookTrialSessionMutation } from "@entities"
import { PopupFormThanks } from "@features/Form"
import { openModal } from "@shared/layout"
import { Button } from "@shared/ui"
import { notification } from "antd"
import { useEffect, useState } from "react"
import { FieldValues } from "react-hook-form"

import { BookSessionModal } from "../common/BookSessionModal"

interface IProps {
  mentorSlug: string
  mentorName: string
  minutsOfTrialMeeting?: number | null
}

export const Trial = ({ minutsOfTrialMeeting, mentorSlug, mentorName }: IProps) => {
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
      {minutsOfTrialMeeting ? (
        <div className="bg-black-900 rounded-2xl grid grid-cols-[1fr_auto] pl-10 pr-6 pt-6 pb-10 items-start selector">
          <div className="grid grid-rows-[auto_auto] gap-2">
            <div className="font--h4-bold text-white">Free {minutsOfTrialMeeting}-minute trial session</div>
            <div className="font--text-regular text-gray-700">
              {minutsOfTrialMeeting}-minute trial session without any commitment, to give you a taste of what's to come.
            </div>
          </div>

          <Button size="big" type="submit" color="white" onClick={() => setOpenBookModal(true)}>
            Book now
          </Button>
        </div>
      ) : null}

      <BookSessionModal
        title="Fill out the form to book your trial session with"
        mentorName={mentorName}
        submitText="Book FREE session now"
        open={openBookModal}
        isLoading={isLoading}
        closeModal={() => setOpenBookModal(false)}
        onSubmit={handleSubmit}
      />

      {contextHolder}
    </>
  )
}
