import { classMerge, classWithModifiers } from "@shared/utils/common"
import { SVGAttributes } from "react"

export type IconName =
  | "language"
  | "drop-down-triangle"
  | "arrow-left"
  | "arrow-right"
  | "chevron"
  | "star-union"
  | "flag-ru"
  | "yandex-logo"
  | "telegram"
  | "messenger"
  | "whatsapp"
  | "refresh"
  | "cross"
  | "menu"
  | "location"
  | "face"
  | "r-square"
  | "touch"
  // Topics
  | "architecture"
  | "design"
  | "art"
  | "craft-jewellery"
  | "games-animation"
  | "movies-tv-photos"
  | "fashion-design"
  | "music-and-sound"
  | "theater-scene-art"
  | "digital-design"
  | "art-management"
  | "journalism-writing"
  | "user-avatar"
  | (string & {})

export interface IIcon extends SVGAttributes<SVGElement> {
  name?: IconName
  modifiers?: Array<string | number | false | null | undefined>
}

/**
 *
 * @prop `modifiers` only work when className given.
 * @prop `className` is a root class, which is modified by `name`,
 * that will be modified by `modifiers` including `name` modifications.
 *
 * Example: `"icon mentor-search__icon mentor-search__icon--chevron mentor-search__icon mentor-search__icon--chevron--up"`
 *
 */

export function Icon(props: IIcon) {
  if (props.href) {
    return (
      <img
        src={props.href}
        className={classMerge(
          "icon",
          props.className && classWithModifiers(props.className, ...(props.modifiers || []))
        )}
      />
    )
  }

  return (
    <svg
      {...props}
      className={classMerge(
        "icon",
        props.className &&
          classWithModifiers(classWithModifiers(props.className, props.name), ...(props.modifiers || []))
      )}
    >
      <use href={`/static/icons.svg#${props.name}`} />
    </svg>
  )
}
