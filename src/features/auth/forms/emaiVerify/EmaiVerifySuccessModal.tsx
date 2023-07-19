import { Modal } from "antd"
import { memo } from "react"

import { EmailVerifySuccessForm } from "./EmailVerifySuccessForm/EmailVerifySuccessForm"

interface IProps {
  show: boolean
}

export const EmaiVerifySuccessModal = memo(function EmaiVerifySuccessModal({ show }: IProps) {
  return (
    <Modal open={show} footer={null} closable={false} maskClosable={false} keyboard={false}>
      <EmailVerifySuccessForm />
    </Modal>
  )
})
