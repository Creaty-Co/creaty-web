export type MapActions<Actions extends Record<string, any>> = {
  [key in keyof Actions]: {
    type: key
    payload: Actions[key]
  }
}
