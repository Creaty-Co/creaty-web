import { MutableRefObject, useEffect } from "react"


function useClickAway(ref: MutableRefObject<HTMLElement | null | undefined>, callback: () => void) {
  useEffect(() => {
    function listener(event: MouseEvent) {
      if (!(event.target instanceof Element)) return
      if (!ref.current) return
      if (ref.current.contains(event.target)) return

      callback()
    }

    document.addEventListener("click", listener)
    return () => document.removeEventListener("click", listener)
  }, [])
}


export default useClickAway
