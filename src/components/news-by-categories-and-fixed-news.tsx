import FixedNews from "@/components/fixed-news"
import { Box } from "@mui/material"
import { FC } from "react"
import { LocationNewsList } from "@/components/location-with-news"
import { LocationWithNews } from "@/types/dto/location-with-news"

type NewsByCategoriesAndFixedNewsProps = {
  locationsWithNews: LocationWithNews[]
}

const NewsByCategoriesAndFixedNews: FC<NewsByCategoriesAndFixedNewsProps> = ({
  locationsWithNews,
}) => {
  return (
    <Box className="grid w-full grid-cols-10 gap-8">
      <Box className={"col-span-6"}>
        {locationsWithNews.map((location) => (
          <LocationNewsList location={location} key={location.uuid} />
        ))}
      </Box>
      <Box className={"col-span-4"}>
        <FixedNews />
      </Box>
    </Box>
  )
}

export default NewsByCategoriesAndFixedNews
