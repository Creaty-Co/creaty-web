import { useAppDispatch } from "@app/store"
import { openModal } from "@shared/layout"
import { Button } from "@shared/ui"
import { bem } from "@shared/utils"

import { LoginForm } from "./LoginForm"

const CN = "login"
const { getElement } = bem(CN)

export function Login() {
  const dispatch = useAppDispatch()

  const handleLoginClick = () => {
    dispatch(openModal(<LoginForm />))
  }

  return (
    <Button size="little" className={getElement()} onClick={handleLoginClick}>
      Login
    </Button>
  )
}
