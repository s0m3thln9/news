import { NewsDTO } from "@/types/dto/news"
import { FC } from "react"
import { Box } from "@mui/system"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { useRouter } from "next/navigation"
import { useGetDateKey } from "@/utils/use-get-date-key"

type NewsListItemProps = {
  news: NewsDTO
}

export const NewsListItem: FC<NewsListItemProps> = ({ news }) => {
  const router = useRouter()
  const getDateKey = useGetDateKey()

  return (
    <Box
      key={news.uuid}
      className="flex cursor-pointer gap-10 max-lg:gap-4"
      onClick={() => router.push(`/${news.uuid}`)}
    >
      <div className="flex w-[45%] min-w-[160px] shrink-0 items-center justify-center self-start">
        <img
          src={process.env.NEXT_PUBLIC_UPLOADS + news.images[0]}
          alt={news.title}
          className="w-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-10">
          <h3 className="line-clamp-3 text-[32px] font-bold max-lg:line-clamp-2 max-lg:text-xl">
            {news.title}
          </h3>
          <p className="line-clamp-3 max-lg:line-clamp-2 max-lg:text-sm">
            {news.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 max-lg:gap-2">
            <CalendarMonthIcon />
            <span className="max-lg:text-sm">{getDateKey(news.createdAt)}</span>
          </div>
        </div>
      </div>
    </Box>
  )
}
