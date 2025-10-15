import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useGetNewsMutation } from "@/api/news"
import { loadMoreNewsToLocation } from "@/features/locations/slice"
import { useEffect } from "react"
import { useAbortableTrigger } from "@/hooks/use-abortable-trigger"
import { useAppSelector } from "@/hooks/use-app-selector"
import { setLoading, setOffset, setTotal } from "@/features/search-news/slice"
import { loadMoreNews } from "@/features/news/slice"

export const useNewsPagination = () => {
  const [getNews] = useGetNewsMutation()
  const dispatch = useAppDispatch()
  const currentLocationUuid = useAppSelector(
    (state) => state.locationsSlice.currentLocation?.uuid,
  )
  const debouncedQuery = useAppSelector(
    (state) => state.searchNewsSlice.debouncedQuery,
  )
  const offset = useAppSelector((state) => state.searchNewsSlice.offset)
  const limit = useAppSelector((state) => state.searchNewsSlice.limit)
  const touched = useAppSelector((state) => state.searchNewsSlice.touched)
  const runGetNews = useAbortableTrigger(getNews)

  useEffect(() => {
    const fetchNews = async () => {
      dispatch(setLoading(true))
      try {
        const response = await runGetNews({
          search: debouncedQuery,
          offset,
          limit,
          locationUuid: currentLocationUuid,
        })
        if (response?.data) {
          dispatch(loadMoreNewsToLocation(response.data.data))
          dispatch(loadMoreNews(response.data.data))
          dispatch(setTotal(response.data.total))
        }
      } catch (err) {
        if ((err as { name?: string }).name !== "AbortError") {
          console.error("Ошибка загрузки:", err)
        }
      } finally {
        dispatch(setLoading(false))
      }
    }

    if (offset !== 0) {
      void fetchNews()
    }
  }, [
    currentLocationUuid,
    debouncedQuery,
    dispatch,
    getNews,
    touched,
    limit,
    offset,
  ])

  const loadMore = () => {
    dispatch(setOffset(offset + limit))
  }

  const isLoading = useAppSelector((state) => state.searchNewsSlice.isLoading)

  return { loadMore, isLoading }
}
