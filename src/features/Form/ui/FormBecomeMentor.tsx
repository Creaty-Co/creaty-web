import { useAppDispatch } from "@app/store"
import { EFormIds } from "@features"
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/solid"
import { openModal } from "@shared/layout"
import { Field, Formus, OuterLink } from "@shared/ui"
import { bem, isEmail } from "@shared/utils"
import { Button } from "antd"
import cn from "classnames"
import { useEffect } from "react"
import { FieldValues, SubmitHandler } from "react-hook-form"
import * as yup from "yup"

import { PopupFormThanks } from "../PopupForm"
import { usePostFormsIdApplicationsMutation } from "../state/form.api"

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Name"),

    email: yup
      .string()
      .test("email", function (value) {
        return (value && isEmail(value)) || this.createError({ path: this.path, message: "invalid email" })
      })
      .required("Email"),

    about: yup.string().max(256, ({ value }) => {
      return `Maximum 300 symbols. Now It's ${value.length}`
    }),

    url: yup
      .string()
      .test("url", function (value) {
        if (!value) return this.createError({ path: this.path, message: "no url" })

        const expression = new RegExp(
          // eslint-disable-next-line no-useless-escape
          /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/gi
        )
        const result = value.match(expression)
        return !!result || this.createError({ path: this.path, message: "no valid url" })
      })
      .required("URL"),
  })
  .required()

const hints = {
  about: {
    max: "Max width is 256 symbols",
  },
  email: {
    email: "Should be like@this.com",
  },
  url: {
    url: "Should be an url",
  },
}

const CN = "form"
const MOD = "become-mentor"
const { getElement, getModifier } = bem(CN)

export function FormBecomeMentor() {
  const dispatch = useAppDispatch()
  const [postFormsIdApplications, { isLoading, isSuccess }] = usePostFormsIdApplicationsMutation()
  const onSubmit: SubmitHandler<FieldValues> = async (values: FieldValues) => {
    await postFormsIdApplications({
      formName: EFormIds.BECOME_MENTOR,
      path: document.location.pathname,
      values,
    })
  }
  useEffect(() => {
    if (isSuccess) dispatch(openModal(<PopupFormThanks />))
  }, [isSuccess])

  const elementContent = (
    <>
      <Field disabled={isLoading} type="input" name="name" label="Name*" />
      <Field disabled={isLoading} type="input" name="email" label="Email*" hints={hints.email} />
      <Field
        disabled={isLoading}
        type="textarea"
        name="about"
        label="About you"
        placeholder="Tell us about yourself!"
        hints={hints.about}
      />
      <Field disabled={isLoading} type="input" name="url" label="LinkedIn profile*" hints={hints.url} />
    </>
  )

  const elementControl = (
    <>
      <Button
        className="button button--dark button--biggest button__text"
        type="primary"
        htmlType="submit"
        loading={isLoading}
        disabled={isLoading}
      >
        <span className="flex gap-3 flex-row">
          <ChatBubbleBottomCenterIcon className="text-white w-5 h-5" />
          Send application
        </span>
      </Button>

      <div className={cn(getElement("agreement"), "text-gray-800 text-center")}>
        By on the Send application, you agree to Creaty Co.{" "}
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
