import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useGetNewsMutation } from "@/api/news"
import { loadMoreNewsToLocation } from "@/features/locations/slice"
import { useEffect } from "react"
import { useAppSelector } from "@/hooks/use-app-selector"
import { setLoading, setOffset } from "@/features/search-news/slice"
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

  useEffect(() => {
    const fetchNews = async () => {
      dispatch(setLoading(true))
      try {
        const response = await getNews({
          search: debouncedQuery,
          offset,
          limit,
          locationUuid: currentLocationUuid,
        }).unwrap()
        if (response?.data) {
          dispatch(loadMoreNewsToLocation(response.data))
          dispatch(loadMoreNews(response.data))
        }
      } catch (err) {
        console.error("Ошибка загрузки:", err)
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
    dispatch(setOffset(offset + 10))
  }

  const isLoading = useAppSelector((state) => state.searchNewsSlice.isLoading)

  return { loadMore, isLoading }
}
