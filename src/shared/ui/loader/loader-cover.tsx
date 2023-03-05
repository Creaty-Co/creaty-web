import { bem } from "@shared/utils"

import { Loader } from "./loader"

export interface ILoaderCover {
  absolute?: boolean
  dimmed?: boolean
  white?: boolean
}

const CN = "loader-cover"
const { getModifier } = bem(CN)

export const LoaderCover = ({
  absolute,
  dimmed,
  white
}: ILoaderCover) => (
  <div 
    className={getModifier(CN, 
      absolute && "absolute", 
      dimmed && "dimmed",
      white && "white"
    )}
  >
    <Loader className="loader-cover__loader" />
  </div>
)
