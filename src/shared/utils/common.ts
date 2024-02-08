import { SyntheticEvent } from "react"

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
export function classWithModifiers(
  originClass: string,
  ...modifiers: Array<string | number | false | null | undefined>
): string {
  modifiers = modifiers.filter(Boolean)
  if (!modifiers.length) return originClass

  const separator = "--"
  const space = " "

  modifiers = modifiers.map(modifier => originClass + separator + modifier)
  return originClass + space + modifiers.join(space)
}

/**
 * Join element name with origin class
 * @returns `"origin-class__elmName"`
 */
export function classElement(originClass: string, element: string | false | null | undefined): string {
  if (!element || !element.length) return originClass

  const separator = "__"

  return originClass + separator + element
}

/**
 * Curry of classElement
 * @returns `function element => classElement(originalClass, element)`
 */
export function getClassElement(originClass: string): Function {
  return (element: string | false | null | undefined): string => classElement(originClass, element)
}

/**
 * Curry of classWithModifiers
 * @returns `function modifiers => classWithModifiers(classOrigin, ...modifiers)`
 */
export function getClassWithModifiers(originClass: string): Function {
  return (...modifiers: Array<string | number | false | null | undefined>): string =>
    classWithModifiers(originClass, ...modifiers)
}

/**
 * Generate functions produce elems and modifiers in block
 * @param block: string. CSS class of block
 * @returns { createModifier, createElement }
 */
export function bem(block: string) {
  const getModifier = classWithModifiers
  const getElement = getClassElement(block)

  return { getModifier, getElement }
}

/**
 * Interpolates {variable} in string
 */
// export function reactopolate<T extends string>(value: T, vars: RecordT>, ReactNode>): ReactNode[] {
//   let haystack = [value]

//   const varKeys = Object.keys(vars) asT>[]
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

export function getEmojiPNG(hex: string) {
  return `https://emojio.ru/images/apple-b/${hex}.png`
}
