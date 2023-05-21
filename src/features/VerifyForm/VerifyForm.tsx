import { Button } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import { forwardRef, useEffect, useRef, useState } from "react"

export interface IVerifyForm {
  className?: string
  email: string
}

const COUNT_CHARS = 6
const CN = "verify-form"
const { getElement } = bem(CN)

export function VerifyForm({
  className,
  email
}: IVerifyForm) {
  // const [submitted, setSubmitted] = useState(false)
  const [hasError, setHasError] = useState(false)

  const [ticktack, setTicktack] = useState(false)
  const elementSecondsRef = useRef<HTMLSpanElement|null>(null)
  const intervalRef = useRef<NodeJS.Timer | undefined>()

  const animationRequestRef = useRef<number | null>(null)
  const restSecondsRef = useRef<number>(0)

  const inputContainerRef = useRef<(HTMLDivElement | null)>(null)
  const charInputRefs = useRef<(HTMLInputElement | null)[]>([])
  const charValuesRefs = useRef<(string)[]>(Array.from({ length: COUNT_CHARS }, () => ""))

  useEffect(() => {
    if (!ticktack) return

    animate()
    restSecondsRef.current = 30
    intervalRef.current = setInterval(() => {
      if (restSecondsRef.current > 1) {
        restSecondsRef.current = restSecondsRef.current - 1
      } else {
        clearInterval(intervalRef.current)
        intervalRef.current = undefined
        setTicktack(false)
      }
    }, 1000)
    
    return () => {
      animationRequestRef.current && cancelAnimationFrame(animationRequestRef.current)
      intervalRef.current && clearInterval(intervalRef.current)
    }
  }, [ticktack])

  const onSubmit = () => {
    const code = charInputRefs.current.map(input => input && input.value).filter(Boolean).join("")
    if (code !== "123456") setHasError(true)
    // else setSubmitted(true)
  }

  const rCharInputs = Array.from(
    { length: COUNT_CHARS }, 
    (v, i) => <VFInput key={i} 
      ref={element => charInputRefs.current[i] = element}
      index={i}
      onChange={onChange}
      hasError={hasError}
    />
  )

  return (
    <div 
      className={cn(CN, className)} 
      ref={inputContainerRef}

      onKeyDown={handlerOnKeyDown}
      onPasteCapture={handlerOnPaste}
    >
      <div className={cn(getElement("desc"), "font--text2-regular text-black-900")}>
        Enter the one-time code sent to your email: <span className="font--text2-bold">{email}</span>
      </div>

      <div className={cn(getElement("subtitle"), "font--text2-regular mt-8 text-gray-800")}>Enter code:</div>
      <div className={cn(getElement("inputs"), "flex flex-row gap-3 mt-0.5")}>
        {rCharInputs}
      </div>

      {hasError && 
        <div 
          className={cn(
            getElement("notify"),
            "font--text2-regular text-red text-center",
            "rounded-xl bg-pink-300 mt-3 px-6 py-4"
          )}
        >
          <p>Verification code is incorrect.<br />
          Try again or use Resend code link below</p>
        </div>
      }

      <div className={cn(getElement("resend"), "pt-3 font--text2-regular")}>
        <span className="text-black-1000">Didn’t receive a code? </span>
        <span 
          className={cn(
            "text-gray-600",
            !ticktack && "cursor-pointer text-violet",
            ticktack && "cursor-not-allowed text-gray-400",
          )}

          onClick={() => !ticktack? setTicktack(true) : null}
        >Resend code {ticktack && (<a><span ref={elementSecondsRef}></span> seconds</a>)}</span>
      </div>
      
      <Button type="submit" color="dark" size="biggest"
        className="mt-6 w-full"
        onClick={onSubmit}
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
    if (hasError) setHasError(false)
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
    if (hasError) setHasError(false)
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
    if (hasError) setHasError(false)
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

  function animate() {
    animationRequestRef.current = requestAnimationFrame(() => {
      if (elementSecondsRef.current) 
        elementSecondsRef.current.innerHTML = restSecondsRef.current + ""
      animate()
    })
  }
}

interface IVFInput {
  onChange: (event: React.ChangeEvent) => void
  hasError: boolean
  className?: string
  index: number
}
const VFInput = forwardRef<HTMLInputElement, IVFInput>(({
  className,
  hasError,
  onChange,
  index
}: IVFInput, ref) => (
  <input ref={ref}
    data-check-input-index={index}
    className={cn(getElement("input"), className,
      "py-3 px-4 w-14",
      "text-black-1000 text-center font--text-regular",
      " border-2 rounded-xl",
      hasError? "border-red" : "border-gray-300"
    )}
    onChange={onChange}
  />
))
VFInput.displayName = "VerifyFormInput"