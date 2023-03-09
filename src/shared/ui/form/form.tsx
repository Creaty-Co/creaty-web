import { FileToURLDataBase64 } from "@shared/utils"
import { DetailedHTMLProps, FormEvent, FormHTMLAttributes } from "react"

type FormValue = string | string[] | number | number[] | boolean | null | undefined
type FormValues = Record<string, FormValue>

export interface FormState<K extends keyof never, V> { // Type-safe Values
  keys: K[]
  values: V extends { [P in K]?: unknown } ? Pick<V, K> & Record<Exclude<keyof V, K>, unknown> : Record<K, V>
}

interface FormProps<K extends keyof never, V> extends Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, "onSubmit"> {
  onSubmit?: (state: FormState<K, V>, event: FormEvent<HTMLFormElement>) => void
}

function Form<K extends keyof never, V>(props: FormProps<K, V>) {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formState = await getFormState(event.currentTarget.elements) as unknown as FormState<K, V>

    props.onSubmit?.(formState, event)
  }
  return (
    <form {...props} onSubmit={onSubmit} />
  )
}

async function getFormState(elements: HTMLFormControlsCollection): Promise<{
  keys: string[]
  values: FormValues
}> {
  const keys: string[] = []
  for (const element of elements) {
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
      if (keys.includes(element.name)) continue
      keys.push(element.name)
    }
  }

  const values: FormValues = {}
  for (const key of keys) {
    const next = elements.namedItem(key)

    if (next instanceof HTMLInputElement) {
      if (next.checked) {
        values[next.name] = true
        continue
      }
      
      const file = next.files?.[0]
      if (file instanceof File) {
        values[next.name] = await FileToURLDataBase64(file)
        continue
      }
    }
    
    if (next instanceof HTMLInputElement || next instanceof HTMLTextAreaElement || next instanceof HTMLSelectElement) {
      if (next.value.length === 0) continue
      values[next.name] = isNaN(Number(next.value)) ? next.value : Number(next.value)
      continue
    }
    
    if (next instanceof NodeList) {
      const inputs = [...next] as HTMLInputElement[]
      const inputValues = inputs.filter(input => {
        if (["checkbox", "radio"].includes(input.type)) {
          return input.checked
        }
        return true
      }).map(input => input.value)
      
      values[inputs[0].name] = inputValues.flatMap(check => isNaN(Number(check)) ? [] : Number(check))
      continue
    }
  }
  
  console.log("end", { keys, values })
  return { keys, values }
}

export default Form