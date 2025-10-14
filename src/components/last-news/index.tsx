"use client"

import Image from "next/image"
import { Box, Card, CardContent, Grid, Typography, Chip } from "@mui/material"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { NewsDTO } from "@/types/dto/news"
import { FC } from "react"
import { useGetDateKey } from "@/utils/use-get-date-key"
import { LastNewsItem } from "@/components/last-news/news-item"
import { useRouter } from "next/navigation"

type LastNewsProps = {
  news: NewsDTO[]
}

const LastNews: FC<LastNewsProps> = ({ news }) => {
  const featuredNews = news[0]
  const otherNews = news.slice(1, 5)

  const getDateKey = useGetDateKey()
  const router = useRouter()

  return (
    <Grid container spacing={3} className="w-full">
      <Grid
        size={{ xs: 12, sm: 6 }}
        className={"cursor-pointer"}
        onClick={() => router.push(`/${featuredNews.uuid}`)}
      >
        <Card className="relative flex aspect-[4/3] h-full flex-col overflow-hidden rounded-none">
          <Image
            src={process.env.NEXT_PUBLIC_UPLOADS + featuredNews.images[0]}
            alt={featuredNews.title}
            fill
            className="absolute object-cover"
          />
          <CardContent className="z-[1] flex flex-1 flex-col justify-end p-0">
            <Box className="bg-[#00000080] p-3">
              <Typography
                variant="h4"
                gutterBottom
                className="line-clamp-3 leading-tight font-bold break-words"
              >
                {featuredNews.title}
              </Typography>
              <Box className="flex items-center gap-2">
                <CalendarMonthIcon />
                <Chip
                  label={getDateKey(featuredNews.createdAt)}
                  color="primary"
                  variant="outlined"
                  sx={{ color: "common.white" }}
                  className="font-bold"
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Grid container spacing={2} className="h-full items-stretch">
          {otherNews.map((news) => (
            <LastNewsItem news={news} key={news.uuid} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LastNews
