import { Button, Field, Formus } from "@shared/ui"
import { bem } from "@shared/utils"
import cn from "classnames"
import * as yup from "yup"

const CN = "form"
const MOD = "signup"
const { getElement, getModifier } = bem(CN)

export function FormSignupStep3() {
  return (
    <div className={cn(getElement("controll"), "grid grid-flow-row grid-cols-1 grid-rows-auto gap-y-4")}>
      <Button size="biggest" color="dark" type="submit">
        Ok
      </Button>
    </div>
  )
}
