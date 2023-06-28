import { MutableRefObject, useLayoutEffect } from "react"

export function useClickAway(ref: MutableRefObject<HTMLElement | null | undefined>, callback: () => void) {
  useLayoutEffect(() => {
    function listener(event: MouseEvent) {
      if (!(event.target instanceof Element)) return
      if (!ref.current) return
      if (event.target.tagName === "use") return
      if (ref.current.contains(event.target)) return

      callback()
    }

    document.addEventListener("click", listener)
    return () => document.removeEventListener("click", listener)
  }, [])
}
