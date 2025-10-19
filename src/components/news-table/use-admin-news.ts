import { ChangeEvent, useEffect } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { useAppSelector } from "@/hooks/use-app-selector"
import { useGetNewsWithLocationQuery } from "@/api/news"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import {
  setNewsToTable,
  setOffsetToTable,
  setSearchQueryToTable,
  setTotalToTable,
} from "@/components/news-table/slice"

export function useAdminNews() {
  const dispatch = useAppDispatch()

  const news = useAppSelector((state) => state.newsTableSlice.news) || []
  const offset = useAppSelector((state) => state.newsTableSlice.offset)
  const limit = useAppSelector((state) => state.newsTableSlice.limit)
  const orderBy = useAppSelector((state) => state.newsTableSlice.orderBy)
  const total = useAppSelector((state) => state.newsTableSlice.total)
  const searchQuery = useAppSelector(
    (state) => state.newsTableSlice.searchQuery,
  )

  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const { data, isFetching, isLoading, refetch } = useGetNewsWithLocationQuery({
    search: debouncedSearchQuery,
    offset,
    limit,
    orderBy,
  })

  useEffect(() => {
    if (data) {
      const newsData = data.data.data
      dispatch(setNewsToTable(newsData))
      dispatch(setTotalToTable(data.data.total))
    }
  }, [data, dispatch, offset])

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQueryToTable(e.target.value))
    dispatch(setOffsetToTable(0))
  }

  const loadMore = () => {
    dispatch(setOffsetToTable(offset + limit))
  }

  return {
    searchQuery,
    handleSearchQueryChange,
    news,
    isFetching,
    isLoading,
    loadMore,
    total,
    limit,
    refetch,
    orderBy,
  }
}
