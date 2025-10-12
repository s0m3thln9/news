"use client"

import { useAppSelector } from "@/hooks/use-app-selector"
import { FC, useEffect } from "react"
import { Box, Grid } from "@mui/material"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { updateLocationWithNews } from "@/features/locations/slice"
import { NewsDTO } from "@/types/dto/news"
import { NewsListItem } from "@/components/news-list-item"
import { useNewsPagination } from "@/features/news/useNewsPagination"
import { Location } from "@/generated/prisma"
import { Pagination } from "@/types/dto/Pagination"
import { setTotal } from "@/features/search-news/slice"

type LocationNewsPageProps = {
  location: Location
  news: Pagination<NewsDTO[]>
}

export const LocationNewsPage: FC<LocationNewsPageProps> = ({
  location,
  news,
}) => {
  const dispatch = useAppDispatch()

  const newsList =
    useAppSelector((state) => state.locationsSlice.currentLocation?.news) ||
    news.data
  const isLoading = useAppSelector((state) => state.searchNewsSlice.isLoading)
  const offset = useAppSelector((state) => state.searchNewsSlice.offset)
  const total = useAppSelector((state) => state.searchNewsSlice.total)
  const limit = useAppSelector((state) => state.searchNewsSlice.limit)

  const { loadMore } = useNewsPagination()

  useEffect(() => {
    dispatch(updateLocationWithNews({ ...location, news: news.data }))
    dispatch(setTotal(news.total))
  }, [dispatch, location, news.data, news.total])

  return (
    <Grid
      container
      className="mx-auto mt-10 w-full max-w-[1440px] flex-col gap-2.5 px-6"
    >
      <h1 className={"text-primary-main text-2xl font-bold"}>
        {location.title}
      </h1>
      <Box
        className={
          "border-primary-main flex flex-col gap-2.5 border-t-[5px] py-10"
        }
      >
        {newsList.length === 0 ? (
          <span>Нет новостей</span>
        ) : (
          newsList.map((n: NewsDTO) => <NewsListItem news={n} key={n.uuid} />)
        )}
      </Box>
      {isLoading ? (
        <span>Загрузка...</span>
      ) : (
        total > offset + limit && (
          <Button onClick={loadMore}>Загрузить еще</Button>
        )
      )}
    </Grid>
  )
}
