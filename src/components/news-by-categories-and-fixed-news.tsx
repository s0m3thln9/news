import FixedNews from "@/components/fixed-news"
import NewsByCategories from "@/components/news-by-categories"
import { Grid } from "@mui/material"

function NewsByCategoriesAndFixedNews() {
  return (
    <Grid className="w-full" container spacing={3} columns={10}>
      <Grid size={{ xs: 10, md: 6 }}>
        <NewsByCategories />
      </Grid>
      <Grid size={{ xs: 10, md: 4 }}>
        <FixedNews />
      </Grid>
    </Grid>
  )
}

export default NewsByCategoriesAndFixedNews
