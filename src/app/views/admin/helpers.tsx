import CheckTree from "app/components/UI/CheckTree/CheckTree"
import { HTMLAttributes } from "react"

import countries from "./countries.json"
import langs from "./langs.json"


interface AdminCountriesSelectProps extends HTMLAttributes<HTMLSelectElement> {
  name?: string
  defaultValue?: number
}

export function AdminCountriesSelect(props: AdminCountriesSelectProps) {
  return (
    <select {...props} required>
      {countries.results.map(country => (
        <option value={country.id} key={country.id}>{country.name}</option>
      ))}
    </select>
  )
}

export function AdminLangsCheckboxes(props: { name?: string, defaultChecked?: number[] }) {
  return (
    <CheckTree name={props.name} defaultChecks={props.defaultChecked}>
      {langs.results.map(lang => (
        <option title={lang.name_native} value={lang.id} key={lang.id} />
      ))}
    </CheckTree>
  )
}
