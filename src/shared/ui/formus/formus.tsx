import "./formus.scss"

import { yupResolver } from "@hookform/resolvers/yup"
import { bem, classMerge } from "@shared/utils"
import { ReactNode } from "react"
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"

export interface IFormus {
  className?: string
  onSubmit: SubmitHandler<FieldValues>
  schema?: yup.ObjectSchema<any>
  
  elementControl?: ReactNode
  elementContent: ReactNode
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

  className,
  onSubmit,

  schema
}: IFormus) {

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  })

  return (
    <FormProvider {...methods}>
      <form 
        className={classMerge(CN, className,
          "grid grid-flow-row grid-cols-1 grid-rows-auto gap-y-6"
        )}

        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div 
          className={classMerge(getElement("fields"),
            "grid grid-flow-row grid-cols-1 grid-rows-auto gap-y-3"
          )}
        >
          {elementContent}
        </div>

        <div 
          className={classMerge(getElement("controll"),
            "grid grid-flow-row grid-cols-1 grid-rows-auto gap-y-4"
          )}
        >
          {elementControl}
        </div>
      </form>
    </FormProvider>
  )
}


/*
const onSubmit = (data: IFormusHaveQuetions) => console.log(data)
*/

/* <Field 
    className={getElement("field")}
  
    label="Full Name"
    name="fullname"
  />

  <Field
    className={getElement("field")}
    
    label="Email address"
    name="email"
/> */

/* <Button size="biggest" color="dark" type="submit">
  Get Help
</Button>

<div 
  className={classMerge(getElement("agreement"),
    "text-gray-800 text-center"
  )}
>
  By clicking on the Get Help, you agree to Creaty Co. <em>Terms of Use and</em> <em>Privacy Policy</em>
</div> */