"use client"

import "./style.css"
import DOMPurify from "dompurify"
import { FC } from "react"
import { NewsDTO } from "@/types/dto/news"
import { Box, Container } from "@mui/material"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { useAppSelector } from "@/hooks/use-app-selector"
import { useRouter } from "next/navigation"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import { useTranslation } from "@/providers/i18n-provider"
import { useGetDateKey } from "@/utils/use-get-date-key"

type NewsPageProps = {
  news: NewsDTO
}

export const NewsPage: FC<NewsPageProps> = ({ news }) => {
  const currentLocationUuid = useAppSelector(
    (state) => state.locationsSlice.currentLocation?.uuid,
  )

  const getDateKey = useGetDateKey()

  const route = useRouter()
  const t = useTranslation()

  return (
    <Container maxWidth="md" className="px-2">
      <Box key={news.uuid} className="flex flex-col gap-4">
        <div
          onClick={() =>
            route.replace(
              currentLocationUuid ? `locations/${currentLocationUuid}` : "/",
            )
          }
          className="text-secondary-main flex w-fit cursor-pointer items-center text-base"
        >
          <ArrowLeftIcon />
          <span>{t("common.back")}</span>
        </div>
        <h3 className="line-clamp-2 overflow-hidden text-[32px] font-bold break-words max-lg:text-xl">
          {news.title}
        </h3>
        <img
          src={process.env.NEXT_PUBLIC_UPLOADS + news.images[0]}
          alt={news.title}
          className="w-full object-cover"
        />
        <div className="flex items-center gap-2.5 border-b-4 pb-4">
          <CalendarMonthIcon />
          <span>{getDateKey(news.createdAt)}</span>
        </div>
        <div
          className="tiptap flex flex-col gap-10 overflow-hidden break-words"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(news.content) }}
        />
      </Box>
    </Container>
  )
}
