import "./signUp.scss"

import { useAppDispatch, useAppSelector } from "@app/store"
import { close, open, setContent } from "@shared/layout"
import { Button } from "@shared/ui"
import { bem } from "@shared/utils"
import { useCallback, useEffect } from "react"

import { abortSignUp, selectAuthSignUpStep, setSignUpStep } from "../auth.slice"
import { SignUpStepT } from "../auth.types"
import { FormSignupStep1 } from "./FormSignup/FormSignupStep1"
import { FormSignupStep2 } from "./FormSignup/FormSignupStep2"
import { FormSignupStep3 } from "./FormSignup/FormSignupStep3"

const CN = "sign-up"
const { getElement } = bem(CN)

export function SignUp() {
  const dispatch = useAppDispatch()
  const signUpStep = useAppSelector(selectAuthSignUpStep)

  const getFormStepComponent = useCallback((step: SignUpStepT) => {
    if (step === 1) return <FormSignupStep1 />
    if (step === 2) return <FormSignupStep2 />
    if (step === 3) return <FormSignupStep3 />
  }, [])

  useEffect(() => {
    if (!signUpStep) return
    if (signUpStep === 4) {
      dispatch(close())
      dispatch(abortSignUp)
      return
    }
    const stepComponent = getFormStepComponent(signUpStep)
    dispatch(setContent(stepComponent))
  }, [signUpStep])

  const handleSignUpClick = () => {
    dispatch(open())
    dispatch(setSignUpStep(1))
    const stepComponent = getFormStepComponent(signUpStep)
    dispatch(setContent(stepComponent))
  }
  
  return (
    <Button size="little" className={getElement()} onClick={handleSignUpClick}>
      Sign up
    </Button>
  )
}
