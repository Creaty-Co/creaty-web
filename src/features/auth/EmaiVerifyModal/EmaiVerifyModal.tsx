import "./EmaiVerifyModal.scss"

import { useAppDispatch } from "@app/store"
import { useVerifyEmailMutation } from "@features/auth/auth.api"
import { useLazyGetMeQuery } from "@features/users/users.api"
import { skipToken } from "@reduxjs/toolkit/dist/query"
import { PopupLayout } from "@shared/layout"
import { Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import { Button, Modal, notification } from "antd"
import { memo, useEffect } from "react"
import { useNavigate } from "react-router"

import { setTokens } from "../auth.slice"

const CN = "email-verify"
const { getElement } = bem(CN)

interface IProps {
  code?: string
}

export const EmaiVerifyModal = memo(function ResetPasswordModalForm({ code }: IProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [api, contextHolder] = notification.useNotification()
  const [confirmEmail, { data, isLoading, isSuccess, error, reset }] = useVerifyEmailMutation()
  const [getMe] = useLazyGetMeQuery()

  const handleConfirmEmail = () => confirmEmail({ code })

  useEffect(() => {
    if (!error) return
    const message =
      (error as any)?.data?.detail ||
      (error as any)?.data?.error?.detail?.message ||
      (error as any)?.data?.error?.detail
    api.error({ message, duration: 10 })
    reset()
  }, [error])

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setTokens({ accessToken: data.access, refreshToken: data.refresh }))
      getMe(skipToken)
      navigate("/")
    }
  }, [isSuccess])

  const elementContent = (
    <>
      <span className={getElement("discount-description")}>
        Meanwhile we want to give you welcome <span className={getElement("discount")}> 10% Discount</span> for your
        first paid session with mentor
      </span>
      <span className={getElement("footer")}>
        No need for any promo code, our team already knows about your discount status.
      </span>
    </>
  )

  const elementControl = (
    <Button
      className="button button--green button--biggest button__text text-black-900"
      htmlType="submit"
      loading={isLoading}
    >
      OK
    </Button>
  )

  return (
    <Modal open={!!code} footer={null} closable={false} maskClosable={false} keyboard={false}>
      <PopupLayout
        title={
          <h3 className="font--h3-bold popup-layout__title">
            We are glad you joined <br />
            <span className="text-green-300">Creaty.Club</span>
          </h3>
        }
        subTitle={<h4 className="font--h4-bold">We'll launch fully soon!</h4>}
        unClosable
        shadow
        black
      >
        <Formus elementControl={elementControl} elementContent={elementContent} onSubmit={handleConfirmEmail} />
      </PopupLayout>
      {contextHolder}
    </Modal>
  )
})
