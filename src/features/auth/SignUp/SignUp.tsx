import "./SignUp.scss"

import { useAppDispatch } from "@app/store"
import { open } from "@shared/layout"
import { Button } from "@shared/ui"
import { bem } from "@shared/utils"

import { SignupFormStep1 } from "./SignupFormStep1"

const CN = "sign-up"
const { getElement } = bem(CN)

export function SignUp() {
  const dispatch = useAppDispatch()

  const handleSignUpClick = () => dispatch(open(<SignupFormStep1 />))
  return (
    <Button size="little" className={getElement()} onClick={handleSignUpClick}>
      Sign up
    </Button>
  )
}
