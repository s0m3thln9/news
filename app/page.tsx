import LastNews from "@/components/last-news"
import NewsByCategoriesAndPinnedNews from "@/components/news-by-categories-and-pinned-news"
import { getNews, getPinnedNews } from "@/server/services/news-service"
import { getLocationsWithNews } from "@/server/services/locations-service"

export default async function Home() {
  const [lastNews, locationsWithNews, pinnedNews] = await Promise.all([
    getNews({ limit: 5 }),
    getLocationsWithNews(),
    getPinnedNews(),
  ])

  return (
    <>
      <LastNews news={lastNews.data} />
      <NewsByCategoriesAndPinnedNews
        locationsWithNews={locationsWithNews}
        pinnedNews={pinnedNews}
      />
    </>
  )
}
