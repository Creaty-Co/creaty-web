import "./loader.scss"

import { classMerge } from "@shared/utils"

export interface ILoader {
  className?: string
}

const CN = "loader"
export const Loader = (props: ILoader) => <div className={classMerge(CN, props.className)} />
