import { ReactElement, ReactNode } from "react"

export type CheckTreeState<V = unknown> = V[]
export type CheckTreeOption<V = unknown> = ReactElement<{
  title: ReactNode
  value?: V
  children?: CheckTreeOptionChildren<V>
}>
export type CheckTreeOptionChildren<V> = (CheckTreeOption<V> | CheckTreeOption<V>[]) | (ReactNode | ReactNode[])
