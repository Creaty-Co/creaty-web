import { useMemo } from "react"
import { useLocation } from "react-router-dom"

// TODO: refactore and delete
export function useQuery() {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}
