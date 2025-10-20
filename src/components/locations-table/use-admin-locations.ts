import { ChangeEvent, useEffect } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { useAppSelector } from "@/hooks/use-app-selector"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useGetLocationsQuery } from "@/api/locations"
import {
  setLocationsToTable,
  setOffsetToTable,
  setSearchQueryToTable,
  setTotalToTable,
} from "@/components/locations-table/slice"

export function useAdminLocations() {
  const dispatch = useAppDispatch()

  const locations =
    useAppSelector((state) => state.locationTableSlice.locations) || []
  const offset = useAppSelector((state) => state.locationTableSlice.offset)
  const limit = useAppSelector((state) => state.locationTableSlice.limit)
  const total = useAppSelector((state) => state.locationTableSlice.total)
  const searchQuery = useAppSelector(
    (state) => state.locationTableSlice.searchQuery,
  )

  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const { data, isFetching, isLoading, refetch } = useGetLocationsQuery({
    search: debouncedSearchQuery,
    offset,
    limit,
  })

  useEffect(() => {
    if (data) {
      const locationsData = data.data.data
      dispatch(setLocationsToTable(locationsData))
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
    locations,
    isFetching,
    isLoading,
    loadMore,
    total,
    limit,
    refetch,
  }
}
