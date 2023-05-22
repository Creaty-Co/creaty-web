import "./signUp.scss"

import { useAppDispatch, useAppSelector } from "@app/store"
import { close, open, PopupLayout, setContent } from "@shared/layout"
import { Button } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { useCallback, useMemo } from "react"

import { selectAuthData } from "../auth.slice"
import { FormSignupStep1 } from "./FormSignup/FormSignupStep1"
import { FormSignupStep2 } from "./FormSignup/FormSignupStep2"

const CN = "sign-up"
const { getElement } = bem(CN)

export interface ISignUpForm {
  email?: string
  password?: string
  first_name?: string
  last_name?: string
}

export function SignUp() {
  const dispatch = useAppDispatch()
  const authData = useAppSelector(selectAuthData)

  const gotToStep = useCallback(
    (step: number) => {
      if (step === 1) dispatch(open(step1))
      if (step === 2) dispatch(setContent(step2))
      if (step === 3) dispatch(setContent(step3))
      if (step === 4) dispatch(close())
    },
    [authData]
  )

  const step1 = (
    <PopupLayout title="Sign up to find your perfect mentor" width="35em">
      <FormSignupStep1 goToNextStep={() => gotToStep(2)} />
    </PopupLayout>
  )

  const step2 = (
    <PopupLayout title="Almost done" subTitle="To start, what's your name?" width="35em">
      <FormSignupStep2 goToNextStep={() => gotToStep(3)} />
    </PopupLayout>
  )

  const step3 = useMemo(
    () => (
      <PopupLayout title="Check your email" width="35em">
        <div className={getElement("confirmation")}>
          We've sent you a confirmation to <b>{authData.email}</b>
        </div>
        <div className={cn("grid grid-flow-row grid-cols-1 grid-rows-auto gap-y-4 w-full mt-6")}>
          <Button size="biggest" color="dark" onClick={() => gotToStep(4)}>
            Ok
          </Button>
        </div>
      </PopupLayout>
    ),
    [authData.email]
  )

  return (
    <Button size="little" className={getElement("sign-up")} onClick={() => gotToStep(1)}>
      Sign up
    </Button>
  )
}
