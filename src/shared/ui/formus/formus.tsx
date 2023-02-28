import "./formus.scss"

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

export interface IFormus {
  className?: string
}

export interface IFormusHaveQuetions {
  fullname: string
  email: string
}

const CN = "formus"
const { getElement } = bem(CN)

export function Formus({
  className
}: IFormus) {
  const methods = useForm<IFormusHaveQuetions>({
    resolver: yupResolver(schema),
    mode: "onChange"
  })

  const onSubmit = (data: IFormusHaveQuetions) => console.log(data)

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

