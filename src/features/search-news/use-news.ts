import { ChangeEvent, useEffect } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { useAppSelector } from "@/hooks/use-app-selector"
import { useGetNewsQuery } from "@/api/news"
import {
  setOffset,
  setSearchQuery,
  setTotal,
} from "@/features/search-news/slice"
import { loadMoreNews, setNews } from "@/features/news/slice"
import {
  addNewsToLocation,
  loadMoreNewsToLocation,
} from "@/features/locations/slice"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useRouter } from "next/navigation"

export function useNews() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const news =
    useAppSelector((state) => state.locationsSlice.currentLocation?.news) || []
  const offset = useAppSelector((state) => state.searchNewsSlice.offset)
  const limit = useAppSelector((state) => state.searchNewsSlice.limit)
  const searchQuery = useAppSelector(
    (state) => state.searchNewsSlice.searchQuery,
  )
  const currentLocationUuid = useAppSelector(
    (state) => state.locationsSlice.currentLocation?.uuid,
  )

  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const { data, isLoading } = useGetNewsQuery({
    search: debouncedSearchQuery,
    offset,
    limit,
    locationUuid: currentLocationUuid,
  })

  useEffect(() => {
    if (data) {
      const newsData = data.data.data
      if (offset === 0) {
        setTimeout(() => {
          dispatch(setNews(newsData))
          dispatch(addNewsToLocation(newsData))
        }, 1000)
      } else {
        setTimeout(() => {
          dispatch(loadMoreNewsToLocation(newsData))
          dispatch(loadMoreNews(newsData))
        }, 1000)
      }
      dispatch(setTotal(data.data.total))
    }
  }, [data, dispatch, offset])

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value))
    dispatch(setOffset(0))
    if (!currentLocationUuid) {
      router.push("/news")
    }
  }

  const loadMore = () => {
    dispatch(setOffset(offset + limit))
  }

  return {
    searchQuery,
    handleSearchQueryChange,
    news,
    isLoading,
    loadMore,
  }
}
