import { useAppSelector } from "@app/store"
import { selectAuthUsersData } from "@features/users/users.slice"
import { PopupLayout } from "@shared/layout"
import { Field, Formus, OuterLink } from "@shared/ui"
import { bem } from "@shared/utils"
import { Button, Modal } from "antd"
import cn from "classnames"
import { memo, useMemo } from "react"
import { FieldValues } from "react-hook-form"
import * as yup from "yup"

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Must be a valid email").required("Email is required"),
    description: yup.string().required("Description is required"),
  })
  .required()

const CN = "form"
const { getElement } = bem(CN)

interface IProps {
  isLoading: boolean
  open: boolean
  title: string
  mentorName: string
  submitText: string
  closeModal(): void
  onSubmit(values: FieldValues): void
}

export const BookSessionModal = memo(function ResetPasswordModalForm({
  isLoading,
  open,
  title,
  mentorName,
  submitText,
  closeModal,
  onSubmit,
}: IProps) {
  const { firstName, lastName, email } = useAppSelector(selectAuthUsersData)
  const name = useMemo(() => (firstName && lastName ? `${firstName} ${lastName}` : undefined), [firstName, lastName])

  const elementContent = (
    <>
      <Field type="input" name="name" label="Name*" defaultValue={name} />
      <Field type="input" name="email" label="Email*" defaultValue={email || undefined} />
      <Field type="textarea" name="description" label="How can a mentor help?*" />
    </>
  )

  const elementControl = (
    <>
      <Button
        className="button button--violet button--biggest button__text"
        type="primary"
        htmlType="submit"
        loading={isLoading}
      >
        {submitText}
      </Button>

      <div className={cn(getElement("agreement"), "text-gray-800 text-center")}>
        By signing up, you agree to Creaty Co. <br />
        <OuterLink className="document__link--form" linkHref="user_agreement" translateType="terms" /> and{" "}
        <OuterLink className="document__link--form" linkHref="privacy_policy" translateType="privacyPolicy" />
      </div>
    </>
  )

  return (
    <Modal open={open} footer={null} closable={false} maskClosable={false} keyboard={false}>
      <PopupLayout
        title={
          <h3 className="font--h3-bold popup-layout__title">
            {title} <br />
            <span className="text-violet">{mentorName}</span>
          </h3>
        }
        onClose={closeModal}
        shadow
        unClosable
      >
        <Formus
          className="form"
          elementControl={elementControl}
          elementContent={elementContent}
          schema={schema}
          onSubmit={onSubmit}
        />
      </PopupLayout>
    </Modal>
  )
})
