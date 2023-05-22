import { useAppDispatch, useAppSelector } from "@app/store"
import { useSignUpEmailMutation } from "@features/auth/auth.api"
import { selectAuthData, signUpStep2 } from "@features/auth/auth.slice"
import { Button, Field, Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { FieldValues, SubmitHandler } from "react-hook-form"

import { formSignupStep2Schema } from "./validationSchemas"

const CN = "form"
const MOD = "signup"
const { getModifier } = bem(CN)

interface IProps {
  goToNextStep: () => void
}

export function FormSignupStep2({ goToNextStep }: IProps) {
  const dispatch = useAppDispatch()

  const [signUpEmail] = useSignUpEmailMutation()
  const authData = useAppSelector(selectAuthData)

  const handleSubmit: SubmitHandler<FieldValues> = async (values: FieldValues) => {
    const data = { first_name: values.first_name, last_name: values.last_name }
    dispatch(signUpStep2(data))
    signUpEmail({ ...authData, ...data })
    goToNextStep()
  }

  const elementContent = (
    <>
      <Field type="input" name="first_name" label="First name*" />
      <Field type="input" name="last_name" label="Last name*" />
    </>
  )

  const elementControl = (
    <Button size="biggest" color="dark" type="submit">
      Continue
    </Button>
  )

  return (
    <Formus
      className={cn(getModifier(CN, MOD))}
      elementContent={elementContent}
      elementControl={elementControl}
      schema={formSignupStep2Schema}
      onSubmit={handleSubmit}
    />
  )
}
