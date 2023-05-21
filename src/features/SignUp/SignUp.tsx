import "./SignUp.scss"

import { useAppDispatch } from "@app/store"
import { PopupForm } from "@features"
import { Button } from "@shared/ui"
import { bem } from "@shared/utils"

const CN = "sign-up"
const { getElement, getModifier } = bem(CN)
export function SignUp() {
  const dispatch = useAppDispatch()

  //<PopupLayout title={t(`forms.${FORM_TYPE}.title`)} width="35em">
  //    <Form type={FORM_TYPE} />
  //   </PopupLayout>

  return (
    <Button
      size="little"
      className={getElement("sign-up")}
      // onClick={() => dispatch(open(<PopupForm type="choose_mentor" />))}
    >
      Sign up
    </Button>
  )
}
