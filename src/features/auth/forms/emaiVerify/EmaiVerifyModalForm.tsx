import { useAppDispatch } from "@app/store"
import { useVerifyEmailMutation } from "@features/auth/auth.api"
import { useLazyGetMeQuery } from "@features/users/users.api"
import { skipToken } from "@reduxjs/toolkit/dist/query"
import { Modal, notification } from "antd"
import { memo, useEffect } from "react"

import { setTokens } from "../../auth.slice"
import { EmailVerifySuccessForm } from "./EmailVerifySuccessForm/EmailVerifySuccessForm"

interface IProps {
  code?: string
}

export const EmaiVerifyModalForm = memo(function EmaiVerifyModalForm({ code }: IProps) {
  const dispatch = useAppDispatch()

  const [api, contextHolder] = notification.useNotification()
  const [confirmEmail, { data, isLoading, isSuccess, error, reset }] = useVerifyEmailMutation()
  const [getMe] = useLazyGetMeQuery()

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

  return (
    <Modal open={!!code} footer={null} closable={false} maskClosable={false} keyboard={false}>
      <EmailVerifySuccessForm isLoading={isLoading} />
      {contextHolder}
    </Modal>
  )
})
