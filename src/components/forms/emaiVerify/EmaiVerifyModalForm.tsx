import { useLazyGetMeQuery, useVerifyEmailMutation } from "@store/auth/auth.api"
import { setTokens } from "@store/auth/auth.slice"
import { useAppDispatch } from "@store/store"
import { Modal, notification } from "antd"
import { memo, useEffect } from "react"
import { useLazyGetMeQuery, useVerifyEmailMutation } from "src/store/auth/auth.api"
import { setTokens } from "src/store/auth/auth.slice"
import { useAppDispatch } from "src/store/store"

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
      getMe("")
    }
  }, [isSuccess])

  return (
    <Modal open={!!code} footer={null} closable={false} maskClosable={false} keyboard={false}>
      <EmailVerifySuccessForm isLoading={isLoading} />
      {contextHolder}
    </Modal>
  )
})
