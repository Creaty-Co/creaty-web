/**
 * filter predicate
 *
 * if some of elements are equal
 */
export function someEqual<T>(key: keyof T) {
  return (value: T, _index: number, array: T[]): boolean => {
    return array.some(someValue => someValue[key] === value[key])
  }
}
