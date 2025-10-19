import { NewsDTO } from "@/types/dto/news"
import { FC } from "react"
import { Box, Card, CardContent, Chip, Grid, Typography } from "@mui/material"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { useGetDateKey } from "@/utils/use-get-date-key"
import Image from "next/image"
import { useRouter } from "next/navigation"

type LastNewsItemProps = {
  news: NewsDTO
}

export const LastNewsItem: FC<LastNewsItemProps> = ({ news }) => {
  const getDateKey = useGetDateKey()
  const router = useRouter()

  return (
    <Grid
      size={{ xs: 12, sm: 6 }}
      key={news.uuid}
      className={"cursor-pointer"}
      onClick={() => router.push(`/${news.uuid}`)}
    >
      <Card className="relative flex aspect-[4/3] h-full flex-col overflow-hidden rounded-none">
        <Image
          src={process.env.NEXT_PUBLIC_UPLOADS + news.images[0]}
          alt={news.title}
          fill
          className="absolute object-cover"
        />
        <CardContent className="z-[1] flex flex-1 flex-col justify-end p-0">
          <Box className="bg-[#00000080] p-2">
            <Typography
              variant="h5"
              gutterBottom
              className="line-clamp-2 break-words font-bold leading-tight"
            >
              {news.title}
            </Typography>
            <Box className="flex items-center gap-1">
              <CalendarMonthIcon fontSize="small" />
              <Chip
                size="small"
                label={getDateKey(news.createdAt)}
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
  )
}
