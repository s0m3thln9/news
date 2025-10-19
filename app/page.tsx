import LastNews from "@/components/last-news"
import LocationsNewsListAndPinnedNews from "@/components/locations-news-list-and-pinned-news"
import { getNews, getPinnedNews } from "@/server/services/news-service"
import { getLocationsWithNews } from "@/server/services/locations-service"
import { Container } from "@mui/material"

export default async function Home() {
  const [lastNews, locationsWithNews, pinnedNews] = await Promise.all([
    getNews({ limit: 5 }),
    getLocationsWithNews(),
    getPinnedNews(),
  ])

  return (
    <Container maxWidth="xl" className="px-2">
      <LastNews news={lastNews.data} />
      <LocationsNewsListAndPinnedNews
        locationsWithNews={locationsWithNews}
        pinnedNews={pinnedNews}
      />
    </Container>
  )
}
