import { useAppDispatch, useAppSelector } from "@app/store"
import { EFormIds } from "@features"
import { selectAuthUsersData } from "@features/users/users.slice"
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid"
import { openModal } from "@shared/layout"
import { Field, Formus, OuterLink } from "@shared/ui"
import { bem } from "@shared/utils"
import { Button } from "antd"
import cn from "classnames"
import { useEffect, useMemo } from "react"
import { FieldValues, SubmitHandler } from "react-hook-form"
import * as yup from "yup"

import { PopupFormThanks } from "../PopupForm"
import { usePostFormsIdApplicationsMutation } from "../state/form.api"

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required()

const CN = "form"
const MOD = "get-help"
const { getElement, getModifier } = bem(CN)

export function FormGetHelp() {
  const dispatch = useAppDispatch()
  const [postFormsIdApplications, { isLoading, isSuccess }] = usePostFormsIdApplicationsMutation()

  const { firstName, lastName, email } = useAppSelector(selectAuthUsersData)
  const name = useMemo(() => (firstName && lastName ? `${firstName} ${lastName}` : undefined), [firstName, lastName])

  const onSubmit: SubmitHandler<FieldValues> = async (values: FieldValues) => {
    await postFormsIdApplications({ formName: EFormIds.GET_HELP, path: document.location.pathname, ...values })
  }

  useEffect(() => {
    if (isSuccess) dispatch(openModal(<PopupFormThanks />))
  }, [isSuccess])

  const elementContent = (
    <>
      <Field type="input" name="name" label="Name" defaultValue={name} />
      <Field type="input" name="email" label="Email" defaultValue={email || undefined} />
    </>
  )

  const elementControl = (
    <>
      <Button
        className="button button--dark button--biggest button__text"
        type="primary"
        htmlType="submit"
        loading={isLoading}
      >
        <span className="flex flex-row gap-3">
          <ChatBubbleLeftEllipsisIcon className="text-white w-5 h-5" />
          Get Help
        </span>
      </Button>

      <div className={cn(getElement("agreement"), "text-gray-800 text-center")}>
        By on the Get Help, you agree to Creaty Co. <br />
        <OuterLink className="document__link--form" linkHref="user_agreement" translateType="terms" /> and{" "}
        <OuterLink className="document__link--form" linkHref="privacy_policy" translateType="privacyPolicy" />
      </div>
    </>
  )

  return (
    <Formus
      className={getModifier(CN, MOD)}
      elementContent={elementContent}
      elementControl={elementControl}
      schema={schema}
      onSubmit={onSubmit}
    />
  )
}
