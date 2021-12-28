export type URLType = `${"http" | "https"}://${string}`


export type DataURL = `data:${string};${string}`
export type DataURLBase64 = `data:${string};base64,${string}`


export type ValuesOf<T> = T[keyof T]
