// const options: HTMLReactParserOptions = {
//   htmlparser2: {
//     lowerCaseTags: false
//   },
//   replace: (domNode: any) => {
//     if (domNode.name === "link") {
//       return createElement(Link, domNode.attribs)
//     }
//   }
// }
// export function inter(text?: string, Vars?: Record<string, string | number | undefined>) {
//   if (!text) {
//     return ""
//   }

//   if (Vars) {
//     for (const Var in Vars) {
//       if (Object.prototype.hasOwnProperty.call(Vars, Var)) {
//         text = text.replace(new RegExp("\\$" + Var, "g"), String(Vars[Var]))
//       }
//     }
//   }

//   // Search for HTML symbols
//   if (text.search(/<.*>/)) {
//     return HTMLParse(text, options)
//   }

//   return text
// }

/**
 *
 * @returns `class1 class2`
 */
export function classMerge(classNames: Array<string | null | undefined>): string {
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
export function createQuery(queryObject: Record<string, string | number | null | undefined>): string {
  if (!queryObject.length) return ""

  const queryKeys = Object.keys(queryObject)
  const queryArray = queryKeys.map(function (key) {
    const value = queryObject[key]
    if (value) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(value)
    }
    return ""
  })

  return queryArray.filter(Boolean).join("&")
}
