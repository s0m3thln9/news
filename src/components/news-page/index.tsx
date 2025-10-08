"use client"

import { FC } from "react"
import { NewsDTO } from "@/types/dto/news"
import { Box, Container, Link } from "@mui/material"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { useAppSelector } from "@/hooks/use-app-selector"

type NewsPageProps = {
  news: NewsDTO
}

const NewsPage: FC<NewsPageProps> = ({ news }) => {
  const userLanguage =
    useAppSelector((state) => state.userSlice.user?.language) || "ru"

  const dateKey = new Date(news.createdAt).toLocaleDateString(
    `${userLanguage}-${userLanguage?.toUpperCase()}`,
    {
      day: "numeric",
      month: "long",
    },
  )

  return (
    <Container>
      <Box key={news.uuid} className={"flex gap-10"}>
        <div className={"flex w-[500px] shrink-0 items-center justify-center"}>
          <img
            src={process.env.NEXT_PUBLIC_UPLOADS + news.images[0]}
            alt={news.title}
            className={"w-full object-cover"}
          />
        </div>
        <div className={"flex flex-col justify-between"}>
          <div className={"flex flex-col gap-10"}>
            <h3 className={"text-[32px] font-bold"}>{news.title}</h3>
            <p>{news.content}</p>
          </div>
          <div className={"flex items-center justify-between"}>
            <div className={"flex items-center gap-2.5"}>
              <CalendarMonthIcon />
              <span>{dateKey}</span>
            </div>
            <Link href={`/${news.uuid}`}>Подробнее</Link>
          </div>
        </div>
      </Box>
    </Container>
  )
}
export default NewsPage
