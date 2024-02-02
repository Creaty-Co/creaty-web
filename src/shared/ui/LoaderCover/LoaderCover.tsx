import "./LoaderCover.scss"

import { bem, classMerge } from "@shared/utils/common"

export interface ILoaderCover {
  absolute?: boolean
  dimmed?: boolean
  white?: boolean
}

const CN = "loader-cover"
const { getModifier } = bem(CN)

export const LoaderCover = ({ absolute, dimmed, white }: ILoaderCover) => (
  <div className={getModifier(CN, absolute && "absolute", dimmed && "dimmed", white && "white")}>
    <div className={classMerge("loader", "loader-cover__loader")} />
  </div>
)
