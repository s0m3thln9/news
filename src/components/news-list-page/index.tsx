"use client"

import { useAppSelector } from "@/hooks/use-app-selector"
import { FC, useEffect } from "react"
import { Box, Grid, Button, Container } from "@mui/material"
import { NewsDTO } from "@/types/dto/news"
import { NewsListItem } from "@/components/news-list-item"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { setNews } from "@/features/news/slice"
import { Pagination } from "@/types/dto/Pagination"
import { setTotal } from "@/features/search-news/slice"
import { useNews } from "@/features/search-news/use-news"
import { useTranslation } from "@/providers/i18n-provider"

type NewsListPageProps = {
  news: Pagination<NewsDTO[]>
}

export const NewsListPage: FC<NewsListPageProps> = ({ news }) => {
  const newsList = useAppSelector((state) => state.newsSlice.news)
  const total = useAppSelector((state) => state.searchNewsSlice.total)
  const offset = useAppSelector((state) => state.searchNewsSlice.offset)
  const limit = useAppSelector((state) => state.searchNewsSlice.limit)
  const { isFetching, loadMore } = useNews()
  const t = useTranslation()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setNews(news.data))
    dispatch(setTotal(news.total))
  }, [dispatch, news])

  return (
    <Container maxWidth="xl" className="px-2">
      <Grid container className="w-full flex-col gap-2.5">
        <h1 className={"text-primary-main text-2xl font-bold"}>
          {t("news.title")}
        </h1>
        <Box
          className={
            "border-primary-main flex flex-col gap-2.5 border-t-[5px] py-10"
          }
        >
          {!isFetching && newsList.length === 0 ? (
            <span>{t("common.noNews")}</span>
          ) : (
            newsList.map((n: NewsDTO) => <NewsListItem news={n} key={n.uuid} />)
          )}
        </Box>
        {isFetching ? (
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
