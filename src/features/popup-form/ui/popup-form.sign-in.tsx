import { useAppSelector } from "@app/store"
import { AuthForm } from "@features/auth"
import { PopupLayout } from "@shared/layout"
import cn from "classnames"
import { useTranslation } from "react-i18next"

import { PopupFormThanks } from "./popup-form.thanks"

export interface IPopupFormSignIn {
  className?: string
} 

const FORM_TYPE = "sign-in"

export function PopupFormSignIn({
  className
}: IPopupFormSignIn) {
  /*
  const { t: tPopup } = useTranslation("translation", { keyPrefix: "popups.popupForm" })
  const { t } = useTranslation("translation", { keyPrefix: "other" })
  */
  // const form = useAppSelector(selectAuthFormByType(FORM_TYPE))

  const rForm = (
    <PopupLayout 
      title={(
        <div className="grid grid-rows-[auto_auto] gap-y-2">
          <span className="font font--h3 font--h3-bold">Log in</span>
          <span className="font font--tags text-black-900">
            Don't you have an account?
            <span className="text-violet">Sign Up</span>
          </span>
        </div>
      )} 
      width="35em"
    >
      <AuthForm className={cn(className, "pt-6")} type={FORM_TYPE} />
    </PopupLayout>
  )

  const rThanks = <PopupFormThanks />
  return (
    <>
      { rForm }
    </>
  )
}
// { form.submitted? rThanks : rForm }
