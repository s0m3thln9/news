export type Pagination<T> = {
  limit: number
  offset: number
  total: number
  data: T
}
