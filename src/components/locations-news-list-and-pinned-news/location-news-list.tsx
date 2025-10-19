"use client"

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import {
  Box,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material"
import { FC } from "react"
import { LocationWithNews } from "@/types/dto/location-with-news"
import { useGetDateKey } from "@/utils/use-get-date-key"
import { useRouter } from "next/navigation"

type LocationNewsListProps = {
  location: LocationWithNews
}

export const LocationNewsList: FC<LocationNewsListProps> = ({ location }) => {
  const [featuredNews, ...news] = location.news

  const getDateKey = useGetDateKey()

  const router = useRouter()

  return (
    <Box className="mb-10 last:mb-0">
      <Typography
        variant="h5"
        className="text-primary border-primary-main border-b-4 pb-2.5 font-bold"
        color="primary"
      >
        {location.title}
      </Typography>
      <Box className="mt-10">
        <Box className={"grid grid-cols-10 gap-4"}>
          {featuredNews && (
            <Box
              className={
                "col-span-6 flex h-full cursor-pointer flex-col overflow-hidden rounded-none"
              }
              onClick={() => router.push(`/${featuredNews.uuid}`)}
            >
              <CardMedia
                className="aspect-[2/1]"
                image={process.env.NEXT_PUBLIC_UPLOADS + featuredNews.images[0]}
                title={featuredNews.title}
              />
              <CardContent className="relative z-[1] flex flex-1 flex-col overflow-hidden px-2 py-0">
                <Box className="mt-2 flex items-center gap-2">
                  <CalendarMonthIcon sx={{ color: "common.black" }} />
                  <Chip
                    label={getDateKey(featuredNews.createdAt)}
                    color="primary"
                    variant="outlined"
                    sx={{ color: "common.black" }}
                    className="font-bold"
                  />
                </Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  className="line-clamp-2 min-h-[3.6rem] leading-tight font-bold break-words"
                  sx={{
                    color: "common.black",
                  }}
                >
                  {featuredNews.title}
                </Typography>
                <Typography
                  variant="body1"
                  className="line-clamp-4 min-h-[6rem]"
                  sx={{
                    color: "common.black",
                  }}
                >
                  {featuredNews.description}
                </Typography>
              </CardContent>
            </Box>
          )}
          <Box className="col-span-4 grid h-full grid-rows-3 gap-4">
            {news.map((news) => (
              <Grid
                className={"flex cursor-pointer"}
                size={{ xs: 12 }}
                key={news.uuid}
                onClick={() => router.push(`/${news.uuid}`)}
              >
                <CardMedia
                  className="aspect-[2/1] w-[45%]"
                  image={process.env.NEXT_PUBLIC_UPLOADS + news.images[0]}
                  title={featuredNews.title}
                />
                <CardContent className="flex-grow overflow-hidden px-2 py-0">
                  <Box className="flex items-center gap-1">
                    <CalendarMonthIcon
                      fontSize="small"
                      sx={{ color: "common.black" }}
                    />
                    <Chip
                      size="small"
                      label={getDateKey(news.createdAt)}
                      color="primary"
                      variant="outlined"
                      sx={{ color: "common.black" }}
                      className="font-bold"
                    />
                  </Box>
                  <Typography
                    variant="subtitle1"
                    className="mt-1 line-clamp-2 min-h-[2.5rem] leading-tight font-bold break-words"
                    sx={{ color: "common.black" }}
                  >
                    {news.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="mt-1 line-clamp-3 min-h-[3.5rem] leading-tight break-words"
                    sx={{ color: "common.black" }}
                  >
                    {news.description}
                  </Typography>
                </CardContent>
              </Grid>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
