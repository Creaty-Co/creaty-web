import "./Formus.scss"

import { yupResolver } from "@hookform/resolvers/yup"
import Button from "app/components/common/Button/Button"
import Field from "app/components/common/Field/Field"
import { FormProvider, useForm} from "react-hook-form"
import { bem, classMerge } from "utils/common"
import * as yup from "yup"

const schema = yup.object({
  fullname: yup.string().required(),
  email: yup.string().email().required(),
}).required()

export interface FormusProps {
  className?: string
}

export interface FormusHaveQuetions {
  fullname: string
  email: string
}

const CN = "formus"
const { getElement } = bem(CN)

export default function Formus({
  className
}: FormusProps) {
  const methods = useForm<FormusHaveQuetions>({
    resolver: yupResolver(schema),
    mode: "onChange"
  })

  const onSubmit = (data: FormusHaveQuetions) => console.log(data)

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
          <Field 
            className={getElement("field")}
          
            label="Full Name"
            name="fullname"
          />

          <Field
            className={getElement("field")}
            
            label="Email address"
            name="email"
          />
        </div>

        <div 
          className={classMerge(getElement("controll"),
            "grid grid-flow-row grid-cols-1 grid-rows-auto gap-y-4"
          )}
        >
          <Button size="biggest" color="dark" type="submit">
            Get Help
          </Button>

          <div 
            className={classMerge(getElement("agreement"),
              "text-gray-800 text-center"
            )}
          >
            By clicking on the Get Help, you agree to Creaty Co. <em>Terms of Use and</em> <em>Privacy Policy</em>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

