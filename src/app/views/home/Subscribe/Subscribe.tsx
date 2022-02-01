import "./Subscribe.scss"

import Button from "app/components/common/Button/Button"
import { ChangeEvent, useState } from "react"
import { classWithModifiers } from "utils/common"


function Subscribe() {
  const { value, isValueValid, onChange } = useInputValidation(/^\w+@[a-zA-Z]+\.\w{2,}$/m)
  return (
    <div className="subscribe">
      <div className="subscribe__header">
        <div className={classWithModifiers("subscribe__field", !isValueValid && "red")}>
          <input className="subscribe__input" type="text" placeholder="На какой email хотите получать рассылку?" onChange={onChange} />
        </div>
        <Button style="outline" size="small" color="green">Подписаться</Button>
      </div>
      <p className="subscribe__text">Нажав на кнопку, вы соглашаетесь получать email рассылку Creaty. В любой момент вы сможете легко отписаться, внутри каждого письма есть соответствующая ссылка.</p>
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
