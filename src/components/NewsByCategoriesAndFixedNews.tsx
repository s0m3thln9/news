import NewsByCategories from "@/components/NewsByCategories"
import { Grid } from "@mui/material"

function NewsByCategoriesAndFixedNews() {
  return (
    <Grid className="mt-10 w-full px-6" container spacing={3} columns={10}>
      <Grid size={{ xs: 10, md: 7 }}>
        <NewsByCategories />
      </Grid>
      <Grid size={{ xs: 10, md: 3 }}></Grid>
    </Grid>
  )
}

export default NewsByCategoriesAndFixedNews
