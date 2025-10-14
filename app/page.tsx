import LastNews from "@/components/last-news"
import NewsByCategoriesAndPinnedNews from "@/components/news-by-categories-and-pinned-news"
import { getNews, getPinnedNews } from "@/server/services/news-service"
import { getLocationsWithNews } from "@/server/services/locations-service"

export default async function Home() {
  const lastNews = await getNews({ limit: 5 })
  const locationsWithNews = await getLocationsWithNews()
  const pinnedNews = await getPinnedNews()

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
