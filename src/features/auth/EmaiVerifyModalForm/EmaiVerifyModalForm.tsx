import "./EmaiVerifyModalForm.scss"

import { useAppDispatch } from "@app/store"
import { useVerifyEmailMutation } from "@features/auth/auth.api"
import { useLazyGetMeQuery } from "@features/users/users.api"
import { skipToken } from "@reduxjs/toolkit/dist/query"
import { PopupLayout } from "@shared/layout"
import { Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import { Button, Modal, notification } from "antd"
import cn from "classnames"
import { memo, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

import { setTokens } from "../auth.slice"

const CN = "email-verify"
const { getElement } = bem(CN)

interface IProps {
  code?: string
}

export const EmaiVerifyModalForm = memo(function EmaiVerifyModalForm({ code }: IProps) {
  const { t } = useTranslation("translation", { keyPrefix: "other.forms.emailVerify" })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [api, contextHolder] = notification.useNotification()
  const [confirmEmail, { data, isLoading, isSuccess, error, reset }] = useVerifyEmailMutation()
  const [getMe] = useLazyGetMeQuery()

  const handleConfirmEmail = () => navigate("/")

  useEffect(() => {
    if (code) confirmEmail({ code })
  }, [code])

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
    }
  }, [isSuccess])

  const elementContent = (
    <>
      <span className={getElement("discount-description")}>{t("body")}</span>
      <span className={getElement("footer")}>{t("tip")}</span>
    </>
  )

  const elementControl = (
    <Button
      className={cn("button button--green button--biggest button__text text-black-900", getElement("button"))}
      htmlType="submit"
      loading={isLoading}
    >
      {t("submitText")}
    </Button>
  )

  return (
    <Modal open={!!code} footer={null} closable={false} maskClosable={false} keyboard={false}>
      <PopupLayout
        title={<h3 className={cn("font--h3-bold popup-layout__title", getElement("title"))}>{t("title")}</h3>}
        subTitle={<h4 className="font--h4-bold">{t("header")}</h4>}
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
