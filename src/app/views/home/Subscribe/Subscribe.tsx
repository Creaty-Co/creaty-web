import "./Subscribe.scss"

import { postMailingsSubscribe } from "api/actions/mailings"
import ClientAPI from "api/client"
import Button from "app/components/common/Button/Button"
import useLocalization from "modules/localization/hook"
import { ChangeEvent, useState } from "react"
import { classWithModifiers } from "utils/common"


function Subscribe() {
  const ll = useLocalization(ll => ll.components.subscribe)
  const { value, isValueValid, onChange } = useInputValidation(/^\w+@[a-zA-Z]+\.\w{2,}$/m)
  const [subscribed, setSubscribed] = useState(false)
  function onSubscribe() {
    ClientAPI
      .query(postMailingsSubscribe(value))
      .then(({ error }) => {
        if (error) return
        setSubscribed(true)
      })
  }
  return (
    <div className="subscribe">
      <div className="subscribe__header">
        <div className={classWithModifiers("subscribe__field", !isValueValid && "red", subscribed && "dark")}>
          {!subscribed && (
            <input className="subscribe__input" type="text" placeholder={ll.placeholder} onChange={onChange} />
          )}
          {subscribed && (
            <span>{ll.thanks}</span>
          )}
        </div>
        <Button style="outline" size="small" color="green" onClick={onSubscribe}>{ll.button}</Button>
      </div>
      <p className="subscribe__text">{ll.terms}</p>
    </div>
  )
}


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
    onChange
  }
}


export default Subscribe
