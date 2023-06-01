export type URLType = `${"http" | "https"}://${string}`

export type URLData = `data:${string};${string}`
export type URLDataBase64 = `data:${string};base64,${string}`

export type ValuesOf<T> = T[keyof T]

export type FormElements<U extends string> = HTMLFormControlsCollection & Record<U, HTMLInputElement>

/* https://stackoverflow.com/questions/50158272/what-is-the-type-of-an-enum-in-typescript */
export type Enum<E> = Record<keyof E, number | string> & { [k: number]: string }

/* Django */ 
export type OrderingType<U extends string> = U | `-${U}`

export interface PaginationType<D> {
  readonly count: number
  readonly next: string | null
  readonly previous: string | null
  readonly results: D[]
}

export interface PaginationQueryType {
  page_size: number
  page: number

  tag_set__in?: (number|undefined)[]
}

export type ExtractArrayType<T> = T extends readonly (infer S)[] ? S : never
