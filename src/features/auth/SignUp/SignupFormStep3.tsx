import { useAppDispatch, useAppSelector } from "@app/store"
import { selectAuthUsersData } from "@features/users/users.slice"
import { close, PopupLayout } from "@shared/layout"
import { Button } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"

const CN = "form"
const { getElement } = bem(CN)

export function SignupFormStep3() {
  const dispatch = useAppDispatch()
  const email = useAppSelector(selectAuthUsersData).email

  const handleClick = () => dispatch(close())

  return (
    <PopupLayout title="Check your email" width="35em">
      <div className={getElement("confirmation")}>
        We've sent you a confirmation to <b>{email}</b>
      </div>
      <div className={cn("grid grid-flow-row grid-cols-1 grid-rows-auto gap-y-4 w-full mt-6")}>
        <Button size="biggest" color="dark" onClick={handleClick}>
          Ok
        </Button>
      </div>
    </PopupLayout>
  )
}
