import Field from "app/components/common/Field/Field"
import { bem, classMerge } from "utils/common"


export interface FormusProps {
  className?: string
}

const CN = "formus"
const { getElement, getModifier } = bem(CN)

export default function Formus({
  className
}: FormusProps) {
  return (
    <form className={classMerge(CN, className)}>
      <Field 
        className={getElement("field")}

        label="Full Name"
      />

      <Field
        className={getElement("field")}

        label="Email address"
      />
    </form>
  )
}