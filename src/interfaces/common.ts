export type URLType = `${"http" | "https"}://${string}`


export type URLData = `data:${string};${string}`
export type URLDataBase64 = `data:${string};base64,${string}`


export type ValuesOf<T> = T[keyof T]


export type FormElements<U extends string> = HTMLFormControlsCollection & Record<U, HTMLInputElement>


// https://stackoverflow.com/questions/50158272/what-is-the-type-of-an-enum-in-typescript
export type Enum<E> = Record<keyof E, number | string> & { [k: number]: string }
export type ExtractInterpolations<T extends string> = T extends `${infer _Start}{${infer V}}${infer Rest}` ? V | ExtractInterpolations<Rest> : never
export type ExtractArrayType<T> = T extends readonly (infer S)[] ? S : never
