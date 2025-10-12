"use client"

import { useAppSelector } from "@/hooks/use-app-selector"
import { FC, useEffect } from "react"
import { Box, Grid } from "@mui/material"
import { Button } from "@/components/ui/button"
import { NewsDTO } from "@/types/dto/news"
import { NewsListItem } from "@/components/news-list-item"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { setNews } from "@/features/news/slice"
import { useNewsPagination } from "@/features/news/useNewsPagination"

type NewsListPageProps = {
  news: NewsDTO[]
}

export const NewsListPage: FC<NewsListPageProps> = ({ news }) => {
  const newsList = useAppSelector((state) => state.newsSlice.news)
  const isLoading = useAppSelector((state) => state.searchNewsSlice.isLoading)

  const dispatch = useAppDispatch()
  const { loadMore } = useNewsPagination()

  useEffect(() => {
    dispatch(setNews(news))
  }, [dispatch, news])

  return (
    <Grid
      container
      className="mx-auto mt-10 w-full max-w-[1440px] flex-col gap-2.5 px-6"
    >
      <h1 className={"text-primary-main text-2xl font-bold"}>Новости</h1>
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
        <Button onClick={loadMore}>Загрузить еще</Button>
      )}
    </Grid>
  )
}
