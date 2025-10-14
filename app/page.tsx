import LastNews from "@/components/last-news"
import NewsByCategoriesAndFixedNews from "@/components/news-by-categories-and-fixed-news"
import { getNews } from "@/server/services/news-service"
import { getLocationsWithNews } from "@/server/services/locations-service"

export default async function Home() {
  const lastNews = await getNews({ limit: 5 })
  const locationsWithNews = await getLocationsWithNews()

  return (
    <>
      <LastNews news={lastNews.data} />
      <NewsByCategoriesAndFixedNews locationsWithNews={locationsWithNews} />
    </>
  )
}
