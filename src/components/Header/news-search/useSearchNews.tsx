import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useGetNewsMutation } from "@/api/news"
import { addNewsToLocation } from "@/features/locations/slice"
import React, { useEffect, useState } from "react"
import { useAppSelector } from "@/hooks/use-app-selector"
import {
  setDebouncedNewsQuery,
  setLoading,
  setNewsQuery,
} from "@/features/search-news/slice"

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

  const [isTouched, setIsTouched] = useState<boolean>(false)

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setDebouncedNewsQuery(search))
    }, 400)

    return () => clearTimeout(handler)
  }, [dispatch, search])

  useEffect(() => {
    const fetchNews = async () => {
      dispatch(setLoading(true))
      try {
        const response = await getNews({
          search: debouncedQuery,
          locationUuid: currentLocationUuid,
        }).unwrap()
        if (response?.data) {
          dispatch(addNewsToLocation(response.data))
        }
      } catch (err) {
        console.error("Ошибка загрузки:", err)
      } finally {
        dispatch(setLoading(false))
      }
    }

    if (isTouched) {
      void fetchNews()
    }
  }, [currentLocationUuid, debouncedQuery, dispatch, getNews, isTouched])

  return {
    value: search,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setNewsQuery(e.target.value))
      setIsTouched(true)
    },
  }
}
