export interface PaginationType<D> {
  readonly count: number
  readonly next: string | null
  readonly previous: string | null
  readonly results: D[]
}

export interface PaginationQueryType {
  page_size: number
  page: number

  tag_set__in?: (number | undefined)[]
}
