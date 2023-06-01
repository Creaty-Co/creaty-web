import { Button, Field, Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"

export interface IFormStillQuestions {
  className?: string
}

const CN = "form"
const MOD = "still-quetion"
const { getElement, getModifier } = bem(CN)

export function GetHelp({ className }: IFormStillQuestions) {
  const elementContent = (
    <>
      <Field type="input" name="fullname" label="Full name" />
      <Field type="input" name="email" label="Email" />
    </>
  )

  const elementControl = (
    <>
      <Button size="biggest" color="dark" type="submit">
        Get Help
      </Button>

      <div className={cn(getElement("agreement"), "text-gray-800 text-center")}>
        By clicking on the Get Help, you agree to Creaty Co. <em>Terms of Use and</em> <em>Privacy Policy</em>
      </div>
    </>
  )

  return (
    <Formus
      className={cn(getModifier(CN, MOD), className)}
      elementContent={elementContent}
      elementControl={elementControl}
      onSubmit={() => null}
    />
  )
}
