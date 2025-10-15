import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useGetNewsMutation } from "@/api/news"
import { addNewsToLocation } from "@/features/locations/slice"
import React, { useEffect } from "react"
import { useAbortableTrigger } from "@/hooks/use-abortable-trigger"
import { useAppSelector } from "@/hooks/use-app-selector"
import {
  setDebouncedNewsQuery,
  setLoading,
  setNewsQuery,
  setTotal,
  setTouched,
} from "@/features/search-news/slice"
import { useRouter } from "next/navigation"
import { setNews } from "@/features/news/slice"

export const useNewsSearch = () => {
  const [getNews] = useGetNewsMutation()
  const dispatch = useAppDispatch()
  const currentLocationUuid = useAppSelector(
    (state) => state.locationsSlice.currentLocation?.uuid,
  )
  const search = useAppSelector((state) => state.searchNewsSlice.query)
  const debouncedQuery = useAppSelector(
    (state) => state.searchNewsSlice.debouncedQuery,
  )
  const offset = useAppSelector((state) => state.searchNewsSlice.offset)
  const limit = useAppSelector((state) => state.searchNewsSlice.limit)
  const touched = useAppSelector((state) => state.searchNewsSlice.touched)

  const router = useRouter()
  const runGetNews = useAbortableTrigger(getNews)

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setDebouncedNewsQuery(search))
      if (!currentLocationUuid && touched) {
        router.push("/news")
      }
    }, 400)

    return () => clearTimeout(handler)
  }, [currentLocationUuid, dispatch, touched, router, search])

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
          dispatch(addNewsToLocation(response.data.data))
          dispatch(setNews(response.data.data))
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

    if (touched) {
      void fetchNews()
    }
  }, [currentLocationUuid, debouncedQuery, dispatch, getNews, touched, limit])

  return {
    value: search,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setNewsQuery(e.target.value))
      dispatch(setTouched(true))
    },
  }
}
