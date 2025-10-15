"use client"

import { useAppSelector } from "@/hooks/use-app-selector"
import { FC, useEffect } from "react"
import { Box, Grid, Button } from "@mui/material"
import { NewsDTO } from "@/types/dto/news"
import { NewsListItem } from "@/components/news-list-item"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { setNews } from "@/features/news/slice"
import { useNewsPagination } from "@/features/news/useNewsPagination"
import { Pagination } from "@/types/dto/Pagination"
import { setTotal } from "@/features/search-news/slice"

type NewsListPageProps = {
  news: Pagination<NewsDTO[]>
}

export const NewsListPage: FC<NewsListPageProps> = ({ news }) => {
  const newsList = useAppSelector((state) => state.newsSlice.news)
  const total = useAppSelector((state) => state.searchNewsSlice.total)
  const offset = useAppSelector((state) => state.searchNewsSlice.offset)
  const limit = useAppSelector((state) => state.searchNewsSlice.limit)
  const isLoading = useAppSelector((state) => state.searchNewsSlice.isLoading)

  const dispatch = useAppDispatch()
  const { loadMore } = useNewsPagination()

  useEffect(() => {
    dispatch(setNews(news.data))
    dispatch(setTotal(news.total))
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
        total > offset + limit && (
          <Button
            className="w-fit self-center"
            variant="outlined"
            color="primary"
            onClick={loadMore}
          >
            Загрузить еще
          </Button>
        )
      )}
    </Grid>
  )
}
