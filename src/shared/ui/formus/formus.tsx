import "./formus.scss"

import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import { yupResolver } from "@hookform/resolvers/yup"
import { bem } from "@shared/utils"
import cn from "classnames"
import { ReactNode, useEffect, useRef, useState } from "react"
import { FieldError, FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"

export interface IFormus {
  className?: string
  onSubmit: SubmitHandler<FieldValues>
  schema: yup.ObjectSchema<any>
  
  elementContent: ReactNode
  elementControl?: ReactNode
  elementAfter?: ReactNode
}

export interface IFormusHaveQuetions {
  fullname: string
  email: string
}

const CN = "formus"
const { getElement } = bem(CN)

export function Formus({
  elementControl,
  elementContent,
  elementAfter,

  className,
  onSubmit,

  schema
}: IFormus) {
  const [showNotifeis, setShowNotifeis] = useState<boolean>(false)
  const refTimeout = useRef<NodeJS.Timeout | null>(null)

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    criteriaMode: "all"
  })

  const { formState: { isValid, isDirty, errors, submitCount, isSubmitSuccessful } } = methods

  /*
  console.log("isValid", isValid)
  console.log("Object.values(errors)", Object.values(errors))
  */

  const requiredErrors = isValid? []
    : Object.values(errors).filter(error => error && error.types && "required" in error.types && error.types.required)
      .map(error => error && error.types && "required" in error.types && error.types.required )

  const rErrorsRequeried = requiredErrors.length > 0 &&
    requiredErrors.map((error, index) => (
      <div key={index} 
        className={cn(getElement("notify"),
          "grid grid-cols-[auto_1fr] grid-rows-1 justify-start align-baseline gap-2"
        )}
      >
        <ExclamationCircleIcon className="h-5 w-5 text-red"/> {error as string}
      </div> 
    ))

  useEffect(() => {
    if (isValid) return
    
    setShowNotifeis(true)
    refTimeout.current = setTimeout(() => {
      setShowNotifeis(false)
    }, 5000)

    return () => { refTimeout.current && clearTimeout(refTimeout.current) }
  }, [submitCount])

  return (
    <FormProvider {...methods}>
      <form 
        className={cn(CN, className,
          "grid grid-flow-row grid-cols-1 grid-rows-auto gap-y-6"
        )}

        onSubmit={methods.handleSubmit((data: FieldValues) => {
          console.log("data on handleSubmit", data)
          setShowNotifeis(true)
          onSubmit(data)
        })}
      >
        <div 
          className={cn(getElement("fields"),
            "grid grid-flow-row grid-cols-1 grid-rows-auto gap-y-3"
          )}
        >
          {elementContent}
        </div>

        {elementControl && 
          <div 
            className={cn(getElement("controll"),
              "grid grid-flow-row grid-cols-1 grid-rows-auto gap-y-4"
            )}
          >
            {elementControl}
          </div>
        }

        {elementAfter && isSubmitSuccessful &&
          <div className={cn(getElement("after"))}>
            {elementAfter}
          </div>
        } 

        {!isValid && rErrorsRequeried && showNotifeis && rErrorsRequeried.length > 0 &&
          <div 
            className={cn(getElement("notifies"),
              "px-5 py-3 w-max",
              "bg-black-main opacity-90 rounded-2xl",
              "grid grid-cols-1 grid-flow-row gap-1 items-start",
              "absolute top-0 left-2/4 -translate-x-1/2 -translate-y-0"
            )}
          >
            <div className={cn(getElement("notifies-title"))}>
              Please fill out all necessary fields:
            </div>

            <div className="grid grid-flow-row">
              {rErrorsRequeried}
            </div>
          </div>
        }
      </form>
    </FormProvider>
  )
}
