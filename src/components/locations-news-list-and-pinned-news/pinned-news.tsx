"use client"

import { useTranslation } from "@/providers/i18n-provider"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { Card, CardContent, Chip, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Image from "next/image"
import { NewsDTO } from "@/types/dto/news"
import { FC } from "react"
import { useGetDateKey } from "@/utils/use-get-date-key"
import { useRouter } from "next/navigation"

type PinnedNewsProps = {
  pinnedNews: NewsDTO[]
}

const PinnedNews: FC<PinnedNewsProps> = ({ pinnedNews }) => {
  const t = useTranslation()
  const getDateKey = useGetDateKey()
  const router = useRouter()

  return (
    <Box>
      <Typography
        variant="h5"
        className="text-primary border-primary-main border-b-4 pb-2.5 font-bold"
        color="primary"
      >
        {t("pinnedNews.title")}
      </Typography>
      <Grid container spacing={2} columns={10} className="mt-10">
        {pinnedNews.map((pinnedNewsItem) => (
          <Grid
            size={{ xs: 12 }}
            key={pinnedNewsItem.uuid}
            onClick={() => router.push(`/${pinnedNewsItem.uuid}`)}
            className={"cursor-pointer"}
          >
            <Card className="relative flex aspect-[4/3] h-full flex-col overflow-hidden rounded-none">
              <Image
                src={process.env.NEXT_PUBLIC_UPLOADS + pinnedNewsItem.image}
                alt={pinnedNewsItem.title}
                fill
                className="absolute object-cover"
              />
              <CardContent className="z-[1] flex flex-1 flex-col justify-end p-0">
                <Box className="bg-[#00000080] p-3">
                  <Typography
                    variant="h5"
                    gutterBottom
                    className="line-clamp-3 leading-tight font-bold break-words"
                  >
                    {pinnedNewsItem.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    className="line-clamp-3 leading-tight break-words"
                  >
                    {pinnedNewsItem.description}
                  </Typography>
                  <Box className="flex items-center gap-2">
                    <CalendarMonthIcon />
                    <Chip
                      label={getDateKey(pinnedNewsItem.createdAt)}
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
        ))}
      </Grid>
    </Box>
  )
}

export default PinnedNews
