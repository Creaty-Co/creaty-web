import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid"
import { Button, Field, Formus, OuterLink } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import * as yup from "yup"

import { IFormProps } from "../form.types"

const schema = yup
  .object()
  .shape({
    fullname: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required()

const CN = "form"
const MOD = "choose-mentor"
const { getElement, getModifier } = bem(CN)

export function FormChooseMentor({ className }: IFormProps) {
  const elementContent = (
    <>
      <Field type="input" name="fullname" label="Full name" />
      <Field type="input" name="email" label="Email" />
    </>
  )

  const elementControl = (
    <>
      <Button size="biggest" color="dark" type="submit">
        <span className="flex flex-row gap-3">
          <ChatBubbleLeftEllipsisIcon className="text-white w-5 h-5" />
          Get Help
        </span>
      </Button>

      <div className={cn(getElement("agreement"), "text-gray-800 text-center")}>
        By on the Get Help, you agree to Creaty Co.{" "}
        <OuterLink className="document__link--form" linkHref="user_agreement" translateType="terms" /> and{" "}
        <OuterLink className="document__link--form" linkHref="privacy_policy" translateType="privacyPolicy" />
      </div>
    </>
  )

  return (
    <Formus
      className={cn(getModifier(CN, MOD), className)}
      elementContent={elementContent}
      elementControl={elementControl}
      schema={schema}
      onSubmit={() => null}
    />
  )
}
