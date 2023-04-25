import { useAppSelector } from "@app/store"
import { AuthForm } from "@features/auth"
import { VerifyForm } from "@features/verify-form"
import { PopupLayout } from "@shared/layout"
import cn from "classnames"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { PopupFormThanks } from "./popup-form.thanks"

export interface IPopupFormSignUp {
  className?: string
} 

const FORM_TYPE = "sign-up"

export function PopupFormSignUp({
  className
}: IPopupFormSignUp) {
  const [signUped, setSignUped] = useState(false)
  const [codeVerified, setCodeVerified] = useState(false)

  const rForm = (
    <PopupLayout 
      className="overflow-visible"
      title={(
        <div className="grid grid-rows-[auto_auto] gap-y-2">
          <span className="font font--h3 font--h3-bold">Sign up to find your perfect mentor</span>
          <span className="font font--tags text-black-900">
            Already have an account?
            <span className="text-violet cursor-pointer">Log in</span>
          </span>
        </div>
      )} 
      width="35em"
    >
      <AuthForm 
        className={cn(className, "pt-6")} 
        onSubmit={() => setSignUped(true)}
        type={FORM_TYPE} 
      />
    </PopupLayout>
  )

  const rVerifyCode = (
    <PopupLayout 
      title="Verify your email"
      width="35em"
    >
      <VerifyForm 
        email="yasha.petrunin@gmail.com"
        onSubmit={() => setCodeVerified(true)}
      />
    </PopupLayout>
  )

  const rThanks = (
    <PopupLayout 
      className="select-none"
      theme="dark"
      title={(<>We are glad you joined to <span className="text-green-300">Creaty.Club</span></>)}
      width="35em"
    >
      <>
        <p className="font--h4-bold text-white pt-5">We’ll launch fully soon!</p>
        <p className="font--h4-regular text-gray-600 pt-2">Meanwhile we want to give you this welcome <span className="font--h4-bold text-white">10% Discount</span> for your next session with mentor :)</p>
        <p className="font--tags-regular text-gray-800 pb-4 pt-6">No need for any promo code, when your account is ready, you will receive a notification and will be able to apply the discount yourself.</p>
      </>
    </PopupLayout>
  )

  // const rThanks = <PopupFormThanks />
  return (
    <>
      { !signUped && !codeVerified && rForm }
      { signUped && !codeVerified && rVerifyCode }
      { signUped && codeVerified && rThanks }
    </>
  )
}
// { form.submitted? rThanks : rForm }
