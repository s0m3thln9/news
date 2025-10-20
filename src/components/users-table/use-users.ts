import { ChangeEvent, useEffect } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { useAppSelector } from "@/hooks/use-app-selector"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useGetUsersQuery } from "@/api/user"
import {
  setOffsetToTable,
  setSearchQueryToTable,
  setTotalToTable,
  setUsersToTable,
} from "@/components/users-table/slice"

export function useUsers() {
  const dispatch = useAppDispatch()

  const users = useAppSelector((state) => state.usersTableSlice.users) || []
  const offset = useAppSelector((state) => state.usersTableSlice.offset)
  const limit = useAppSelector((state) => state.usersTableSlice.limit)
  const total = useAppSelector((state) => state.usersTableSlice.total)
  const searchQuery = useAppSelector(
    (state) => state.usersTableSlice.searchQuery,
  )

  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const { data, isFetching, isLoading, refetch } = useGetUsersQuery({
    search: debouncedSearchQuery,
    offset,
    limit,
  })

  useEffect(() => {
    if (data) {
      const usersData = data.data.data
      dispatch(setUsersToTable(usersData))
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
    users,
    searchQuery,
    handleSearchQueryChange,
    isFetching,
    isLoading,
    loadMore,
    total,
    limit,
    refetch,
  }
}
