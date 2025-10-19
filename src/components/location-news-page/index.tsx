"use client"

import { useAppSelector } from "@/hooks/use-app-selector"
import { FC, useEffect } from "react"
import { Box, Grid, Button, Container, Typography } from "@mui/material"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import {
  setCurrentLocation,
  updateLocationWithNews,
} from "@/features/locations/slice"
import { NewsDTO } from "@/types/dto/news"
import { NewsListItem } from "@/components/news-list-item"
import { Location } from "@/generated/prisma"
import { Pagination } from "@/types/dto/Pagination"
import { setTotal } from "@/features/search-news/slice"
import { useNews } from "@/features/search-news/use-news"
import { useTranslation } from "@/providers/i18n-provider"

type LocationNewsPageProps = {
  location: Location
  news: Pagination<NewsDTO[]>
}

export const LocationNewsPage: FC<LocationNewsPageProps> = ({
  location,
  news,
}) => {
  const t = useTranslation()
  const dispatch = useAppDispatch()

  const offset = useAppSelector((state) => state.searchNewsSlice.offset)
  const total = useAppSelector((state) => state.searchNewsSlice.total)
  const limit = useAppSelector((state) => state.searchNewsSlice.limit)

  const { news: newsList, isLoading, loadMore } = useNews()

  useEffect(() => {
    dispatch(setCurrentLocation({ ...location, news: news.data }))
    dispatch(updateLocationWithNews({ ...location, news: news.data }))
    dispatch(setTotal(news.total))
  }, [dispatch, location, news.data, news.total])

  return (
    <Container maxWidth="xl" className="px-2">
      <Grid container className="w-full flex-col gap-2.5">
        <Typography
          variant="h5"
          className="text-primary border-primary-main border-b-4 pb-2.5 font-bold"
          color="primary"
        >
          {location?.title}
        </Typography>
        <Box className="mt-10 flex flex-col gap-2.5">
          {!isLoading && newsList.length === 0 ? (
            <span>{t("common.noNews")}</span>
          ) : (
            newsList.map((n: NewsDTO) => <NewsListItem news={n} key={n.uuid} />)
          )}
        </Box>
        {isLoading ? (
          <span>{t("common.loading")}</span>
        ) : (
          total > offset + limit && (
            <Button
              className="w-fit self-center"
              variant="outlined"
              color="primary"
              onClick={loadMore}
            >
              {t("common.loadMore")}
            </Button>
          )
        )}
      </Grid>
    </Container>
  )
}
