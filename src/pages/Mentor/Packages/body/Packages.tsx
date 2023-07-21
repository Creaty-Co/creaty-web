import { useAppDispatch } from "@app/store"
import { MentorPackageType, useBookPackSessionMutation } from "@entities"
import { PopupFormThanks } from "@features/Form"
import { openModal } from "@shared/layout"
import { Button } from "@shared/ui"
import { notification, Radio, RadioChangeEvent } from "antd"
import cn from "classnames"
import { useEffect, useState } from "react"
import { FieldValues } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { BookSessionForm } from "../common/BookSessionForm"
import { UnclosablePopupWrapper } from "../common/UnclosablePopupWrapper"

interface IProps {
  hourPrice: number
  mentorName: string
  mentorSlug: string
  packages: MentorPackageType[]
}

export const Packages = ({ hourPrice, mentorName, mentorSlug, packages }: IProps) => {
  const { t } = useTranslation("translation")
  const dispatch = useAppDispatch()
  const [api, contextHolder] = notification.useNotification()

  const [bookPackSession, { isLoading, isSuccess, error, reset }] = useBookPackSessionMutation()

  const [packId, setPackId] = useState(packages[0]?.id)
  const [openBookModal, setOpenBookModal] = useState(false)

  const handlePackCahnged = (e: RadioChangeEvent) => setPackId(e.target.value)
  const handleSubmit = (values: FieldValues) => {
    const { description, email, name } = values
    bookPackSession({ description, email, name, mentor: mentorSlug, package: packId })
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

  if (!packages?.length || packages?.length === 0) return null
  return (
    <>
      <div className="bg-white rounded-2xl grid grid-rows-[auto_auto] gap-6 py-6">
        <div className="grid grid-cols-[1fr_auto] pl-10 pr-6 items-start gap-4">
          <div className="grid grid-rows-[auto_auto] gap-2">
            <div className="font--h4-bold text-black-900">{t("views.mentor.plans.pack.title")}</div>
            <div className="font--text-regular text-gray-800">{t("views.mentor.plans.pack.desc")}</div>
          </div>

          <Button size="big" type="submit" color="violet" onClick={() => setOpenBookModal(true)}>
            {t("views.mentor.plans.pack.submitText")}
          </Button>
        </div>

        <Radio.Group value={packId} onChange={handlePackCahnged}>
          <div className="grid grid-cols-1 px-6 gap-1">
            {packages.map((pack: MentorPackageType, i) => (
              <div
                className={cn(
                  "p-4 grid grid-cols-[auto_1fr] rounded-lg cursor-pointer hover:bg-viol-100",
                  packId === pack.id ? "bg-viol-100" : "bg-viol-50"
                )}
                key={pack.id}
                onClick={() => setPackId(pack.id)}
              >
                <div className="flex gap-3 flex-row items-center">
                  <Radio value={pack.id}>
                    <span className="font--text-bold text-black-900">{pack.lessons_count} sessions</span>
                  </Radio>
                  {i === 0 && (
                    <div className="px-1.5 py-1 text-gray-400 bg-black-900 font--tags-regular rounded-sm">
                      Most common
                    </div>
                  )}
                </div>

                <div className="flex gap-2 flex-row items-center justify-end">
                  <div>
                    <span className="text-black-900 font--text-medium">
                      $
                      {`${Math.floor(
                        pack.lessons_count * hourPrice - (pack.lessons_count * hourPrice * pack.discount) / 100
                      )} `}
                    </span>{" "}
                    <span className="text-gray-800 font--text2-regular line-through">
                      ${pack.lessons_count * hourPrice}
                    </span>
                  </div>
                  <div className="font--text-medium text-white bg-green-700 px-2 py-0.5 rounded-sm">
                    -{pack.discount}%
                  </div>
                  <div className="text-gray-800 font--text2-regular">
                    you are saving{" "}
                    <span className="font--text2-bold">
                      ${Math.ceil((pack.lessons_count * hourPrice * pack.discount) / 100)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Radio.Group>
      </div>

      <UnclosablePopupWrapper
        open={openBookModal}
        title={t("other.forms.bookSessionPackage.title")}
        mentorName={mentorName}
        closeModal={() => setOpenBookModal(false)}
      >
        <BookSessionForm
          submitText={t("other.forms.bookSessionPackage.submitText")}
          terms={t("other.forms.bookSessionPackage.terms")}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </UnclosablePopupWrapper>
      {contextHolder}
    </>
  )
}
