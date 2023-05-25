import "./login.scss"

import { useAppDispatch, useAppSelector } from "@app/store"
import { close, open, setContent } from "@shared/layout"
import { Button } from "@shared/ui"
import { bem } from "@shared/utils"
import { useCallback, useEffect } from "react"

import { abortSignUp, selectAuthSignUpStep, setSignUpStep } from "../auth.slice"
import { SignUpStepT } from "../auth.types"
import { FormLogin } from "./FormLogin"

const CN = "login"
const { getElement } = bem(CN)

export function Login() {
  const dispatch = useAppDispatch()
  // const [signUpGoogle] = useLazySignUpGoogleQuery()

  const handleLoginClick = () => {
    dispatch(open(<FormLogin />))
    // dispatch(setContent(FormLogin()))
  }

  return (
    <Button size="little" className={getElement()} onClick={handleLoginClick}>
      Login
    </Button>
  )
}
