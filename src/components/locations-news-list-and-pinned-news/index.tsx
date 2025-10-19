import PinnedNews from "@/components/locations-news-list-and-pinned-news/pinned-news"
import { Box } from "@mui/material"
import { FC } from "react"
import { LocationNewsList } from "@/components/locations-news-list-and-pinned-news/location-news-list"
import { LocationWithNews } from "@/types/dto/location-with-news"
import { NewsDTO } from "@/types/dto/news"

type LocationsNewsListAndPinnedNewsProps = {
  locationsWithNews: LocationWithNews[]
  pinnedNews: NewsDTO[]
}

const LocationsNewsListAndPinnedNews: FC<
  LocationsNewsListAndPinnedNewsProps
> = ({ locationsWithNews, pinnedNews }) => {
  return (
    <Box className="flex w-full gap-8 max-lg:flex-col-reverse lg:grid lg:grid-cols-10">
      <Box className="lg:col-span-6">
        {locationsWithNews.map((location) => (
          <LocationNewsList location={location} key={location.uuid} />
        ))}
      </Box>
      <Box className="lg:col-span-4">
        <PinnedNews pinnedNews={pinnedNews} />
      </Box>
    </Box>
  )
}

export default LocationsNewsListAndPinnedNews
