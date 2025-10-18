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
      className={"flex cursor-pointer gap-10"}
      onClick={() => router.push(`/${news.uuid}`)}
    >
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
          <p>{news.description}</p>
        </div>
        <div className={"flex items-center justify-between"}>
          <div className={"flex items-center gap-2.5"}>
            <CalendarMonthIcon />
            <span>{getDateKey(news.createdAt)}</span>
          </div>
        </div>
      </div>
    </Box>
  )
}
