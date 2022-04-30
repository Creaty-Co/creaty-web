import "./extensions"

import { Buffer } from "buffer"
import { ExtractInterpolations, URLDataBase64 } from "interfaces/common"
import { cloneElement, ReactNode, SyntheticEvent } from "react"

/**
 *
 * @returns `class1 class2`
 */
export function classMerge(...classNames: Array<string | null | undefined>): string {
  const space = " "
  return classNames.filter(Boolean).join(space)
}

/**
 * Join modifiers with origin class
 * @returns `"origin-class origin-class--modifier"`
 */
export function classWithModifiers(originClass: string, ...modifiers: Array<string | number | false | null | undefined>): string {
  modifiers = modifiers.filter(Boolean)
  if (!modifiers.length) return originClass

  const space = " "
  const separator = "--"

  modifiers = modifiers.map(modifier => originClass + separator + modifier)
  return originClass + space + modifiers.join(space)
}

/**
 * Creates query from given object
 * @returns `state1=6&state2=horse` without `?`
 */
export function createQuery(queryObject?: Record<string, unknown> | null): string {
  if (!queryObject || !Object.keys(queryObject).length) return ""

  const queryKeys = Object.keys(queryObject)
  const queryArray = queryKeys.map(key => {
    const value = queryObject[key]
    if (value) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(String(value))
    }
    return ""
  })

  return queryArray.filter(Boolean).join("&")
}

export function toBase64(value: unknown) {
  return Buffer.from(JSON.stringify(value)).toString("base64")
}

export function FileToURLDataBase64(file: File): Promise<URLDataBase64> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as URLDataBase64)
    reader.onerror = reject
  })
}


export async function getFileFromURL(url: string) {
  const fileName = url.slice(url.lastIndexOf("/") + 1)

  const response = await fetch(url)
  const Uint8Array = (await response.body?.getReader()?.read())?.value

  return new File(Uint8Array ? [Uint8Array] : [], fileName, { type: response.headers.get("content-type") || "image" })
}

export function getCheckedValues(inputs: RadioNodeList & HTMLInputElement[]) {
  return [...inputs].filter(input => input.checked).map(input => input.value)
}

/**
 * Interpolate function for {variable} interpolations in string
 */
export function interpolate<V = unknown>(value: V, vars: Record<string, string | number>) {
  if (!value) throw new TypeError("interError: empty value gotten")
  const varKeys = Object.keys(vars)
  function interpolate(value: V): V | string {
    // ------------------------------------------------ Hardcoded :(
    const elementProps = (value as any)?.props
    if (elementProps?.children) {
      return cloneElement(value as any, elementProps, interpolate(elementProps.children) as any) as any
    }
    // ------------------------------------------------
    if (typeof value === "string") {
      return varKeys.reduce((result, next) => result.replace(new RegExp(`{${next}}`, "g"), String(vars[next])), value)
    }
    return value
  }
  if (value instanceof Array) {
    return value.flatMap(a => a).map(interpolate)
  }
  return interpolate(value)
}

/**
 * Interpolates {variable} in string
 */
// export function reactopolate<T extends string>(value: T, vars: Record<ExtractInterpolations<T>, ReactNode>): ReactNode[] {
//   let haystack = [value]

//   const varKeys = Object.keys(vars) as ExtractInterpolations<T>[]
//   const result = varKeys.flatMap(nextVarKey => {
//     const regex = new RegExp(`{${nextVarKey}}`, "g")

//     const result: ReactNode[] = []

//     let match: Record<number, T>

//     while ((match = regex.exec(haystack) as unknown as typeof match) !== null) {
//       const [firstChunk, secondChunk] = haystack.split(match[0])
//       result.push(firstChunk, vars[nextVarKey])
//       haystack = secondChunk as T
//     }

//     return result
//   }, value)
//   return result.length > 0 ? result : [value]
// }

/**
 * Stops propagation from container
 * @param callback any function
 * @returns mouse event handler
 */
export function stopPropagation(callback?: Function | null) {
  return ({ target, currentTarget }: Event | SyntheticEvent) => {
    if (target instanceof Element && currentTarget instanceof Element) {
      if (target !== currentTarget) return
    }

    callback?.()
  }
}

/**
 * Propagates the array, creating minimum fill level of the array by duplicating its items
 * @returns new array
 */
export function minFill<T>(array: T[], minLevel?: number): T[] {
  if (array.length === 0) return array
  if (minLevel == null || array.length >= minLevel) {
    return array
  }

  const newArray: T[] = []
  while (newArray.length < minLevel) {
    newArray.push(...array)
  }
  return newArray
}
