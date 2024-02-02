import "./Subscribe.scss"

import { SharedButton } from "@shared/ui/buttons/SharedButton"
import { bem } from "@shared/utils/common"
import { ChangeEvent, useState } from "react"
import { useTranslation } from "react-i18next"

import { usePostMailingsSubscribeMutation } from "../../../../store/subscribe.api"

const CN = "subscribe"
const { getElement, getModifier } = bem(CN)

function useInputValidation(validation?: RegExp) {
  const [value, setValue] = useState("")
  const [isValueValid, setIsValueValid] = useState(true)
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    setValue(value)

    if (validation) {
      if (!value.length) {
        setIsValueValid(true)
        return
      }

      setIsValueValid(validation.test(value))
    }
  }
  return {
    value,
    isValueValid,
    onChange,
  }
}

export function Subscribe() {
  const { t } = useTranslation("translation", { keyPrefix: "components.subscribe" })
  const { value, isValueValid, onChange } = useInputValidation(/^\s*\w+@[a-zA-Z]+\.\w{2,}\s*$/m)

  const [postMailingsSubscribe, { isSuccess: isSubscribed }] = usePostMailingsSubscribeMutation()
  function onSubscribe() {
    postMailingsSubscribe({ email: value })
  }

  return (
    <div className={CN}>
      <div className={getElement("header")}>
        <div className={getModifier(getElement("field"), !isValueValid && "red", isSubscribed && "dark")}>
          {!isSubscribed && (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            <input className={getElement("input")} type="text" placeholder={t("placeholder")!} onChange={onChange} />
          )}

          {isSubscribed && <span>{t("thanks")}</span>}
        </div>

        <SharedButton outline size="small" color="green" onClick={onSubscribe} eventLabel="Subscription">
          {t("button")}
        </SharedButton>
      </div>

      <p className={getElement("text")}>{t("terms")}</p>
    </div>
  )
}
