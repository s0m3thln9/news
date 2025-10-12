import { getNews, GetNewsQueryParams } from "@/server/services/news-service"
import { NewsDTO } from "@/types/dto/news"
import { NewsListPage } from "@/components/news-list-page"

export default async function LocationPage({
  searchParams,
}: {
  searchParams: Promise<GetNewsQueryParams>
}) {
  const { offset, limit, search } = await searchParams

  const offsetValue = Number(offset) || undefined
  const limitValue = Number(limit) || undefined

  const news: NewsDTO[] = await getNews({
    offset: offsetValue,
    limit: limitValue,
    search,
  })

  return <NewsListPage news={news} />
}
