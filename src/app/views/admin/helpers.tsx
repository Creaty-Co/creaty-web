import { HTMLAttributes } from "react"

import countries from "./countries.json"
import langs from "./langs.json"


interface AdminCountriesSelectProps extends HTMLAttributes<HTMLSelectElement> {
  defaultValue?: number
}

export function AdminCountriesSelect(props: AdminCountriesSelectProps) {
  return (
    <select name="country" {...props}>
      {countries.results.map(country => (
        <option value={country.id} key={country.id}>{country.name}</option>
      ))}
    </select>
  )
}

export function AdminLangsCheckboxes(props: { defaultChecked?: number[] }) {
  return (
    <>
      {langs.results.map(lang => (
        <label key={lang.id}>
          {lang.name_native}
          <input name="languages" type="checkbox" defaultChecked={props.defaultChecked?.includes(lang.id)} value={lang.id} />
        </label>
      ))}
    </>
  )
}
