import { Button } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { forwardRef, useLayoutEffect,useRef, useState } from "react"

export interface IVerifyForm {
  className?: string

  email: string
}

const COUNT_CHARS = 6
const CN = "verify-form"
const { getElement } = bem(CN)

export function VerifyForm({
  className
}: IVerifyForm) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const inputContainerRef = useRef<(HTMLDivElement | null)>(null)
  const charInputRefs = useRef<(HTMLInputElement | null)[]>([])
  const charValuesRefs = useRef<(string)[]>(Array.from({ length: COUNT_CHARS }, () => ""))
  
  const onSubmit = () => {
    const code = charInputRefs.current.map(input => input && input.value).filter(Boolean).join("")
    if (code !== "123456") setError(true)
    else setSubmitted(true)
  }

  const rCharInputs = Array.from(
    { length: COUNT_CHARS }, 
    (v, i) => <VFInput key={i} 
      ref={element => charInputRefs.current[i] = element}
      index={i}
      onChange={onChange}
    />
  )

  return (
    <div 
      className={cn(CN, className)} 
      ref={inputContainerRef}

      onKeyDown={handlerOnKeyDown}
      onPasteCapture={handlerOnPaste}
    >
      <div className={cn(getElement("inputs"), "flex flex-row gap-3")}>
        {rCharInputs}
      </div>

      <div className={cn(getElement("resend"), "pt-3 font--text2-regular")}>
        <span className="text-black-1000">Didn’t receive a code?</span>
        <span className="text-gray-600">Resend code (30 seconds)</span>
      </div>
      
      <Button type="submit" color="dark" size="biggest"
        className="pt-6"
      >
        Verify me
      </Button>

      <div 
        className={cn(
          getElement("additional"),
          "font--tags-regular",
          "text-black-1000 text-center",
          "pt-4"
        )}
      >
        Already have an account? Log In
      </div>
    </div>
  )

  /* Helpers */
  function getInput(index: number, type: "current" |"prev" | "next" = "current"): HTMLInputElement | null {
    if (index < 0 || index > charInputRefs.current.length - 1) return null

    if (type === "next" && index < charInputRefs.current.length - 1) return charInputRefs.current[index + 1]
    if (type === "prev" && index > 0) return charInputRefs.current[index - 1]
    if (type === "current") return charInputRefs.current[index]

    return null
  }

  /* Handlers */
  function handlerOnPaste(event: React.ClipboardEvent) {
    event.preventDefault()

    const target = event.target as HTMLInputElement
    const indexAttr = target.getAttribute("data-check-input-index")

    if (indexAttr === null) return
    const index = +indexAttr

    const current = getInput(index)
    if (current === null) return

    const clipboardData = event.clipboardData.getData("text").split("")

    let i: number
    for (i = 0; i < clipboardData.length && i + index < charInputRefs.current.length; i++) {
      const current = getInput(index + i)
      if (current) {
        charValuesRefs.current[i] = clipboardData[i]
        current.value = clipboardData[i]
      } 
    }

    if (i > 0) current.blur()

    const last = getInput(index + i) 
    if (i > 0 && index + i !== charInputRefs.current.length && last) last.focus()
  }

  function handlerOnKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Backspace") event.preventDefault()

    const target = event.target as HTMLElement
    const indexAttr = target.getAttribute("data-check-input-index")
    
    if (indexAttr === null) return
    const index = +indexAttr

    const current = getInput(index)
    if (current === null) return
    
    const next = getInput(index, "next")
    const prev = getInput(index, "prev")
    
    if (event.key === "Backspace") {
      if (prev !== null) prev.focus()

      charValuesRefs.current[index] = ""
      current.value = ""
    }

    if (event.key === "ArrowRight" && next) next.focus()
    if (event.key === "ArrowLeft" && prev) prev.focus()
  }

  function onChange(event: React.ChangeEvent) {
    const target = event.target as HTMLInputElement
    const indexAttr = target.getAttribute("data-check-input-index")

    if (indexAttr === null) return
    const index = +indexAttr

    const current = getInput(index)
    if (current === null) return

    const [first, ...restRaw] = target.value
    const rest = restRaw.length === 1 && restRaw[0] === charValuesRefs.current[index]
      ? [first] : restRaw

    current.value = (rest.length && rest.pop()) || first
    charValuesRefs.current[index] = current.value

    const next = getInput(index, "next")
    if (next) next.focus()
    else current.blur()
  }
}

interface IVFInput {
  onChange: (event: React.ChangeEvent) => void
  className?: string
  index: number
}
const VFInput = forwardRef<HTMLInputElement, IVFInput>(({
  className,
  onChange,
  index
}: IVFInput, ref) => (
  <input ref={ref}
    data-check-input-index={index}
    className={cn(getElement("input"), className,
      "py-3 px-4 w-14",
      "text-black-1000 text-center font--text-regular",
      "border-gray-300 border-2 rounded-xl",
    )}
    onChange={onChange}
  />
))
VFInput.displayName = "VerifyFormInput"