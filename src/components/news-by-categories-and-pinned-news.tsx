import PinnedNews from "@/components/pinned-news"
import { Box } from "@mui/material"
import { FC } from "react"
import { LocationNewsList } from "@/components/location-with-news"
import { LocationWithNews } from "@/types/dto/location-with-news"
import { NewsDTO } from "@/types/dto/news"

type NewsByCategoriesAndPinnedProps = {
  locationsWithNews: LocationWithNews[]
  pinnedNews: NewsDTO[]
}

const NewsByCategoriesAndPinnedNews: FC<NewsByCategoriesAndPinnedProps> = ({
  locationsWithNews,
  pinnedNews,
}) => {
  return (
    <Box className="grid w-full grid-cols-10 gap-8">
      <Box className={"col-span-6"}>
        {locationsWithNews.map((location) => (
          <LocationNewsList location={location} key={location.uuid} />
        ))}
      </Box>
      <Box className={"col-span-4"}>
        <PinnedNews pinnedNews={pinnedNews} />
      </Box>
    </Box>
  )
}

export default NewsByCategoriesAndPinnedNews
