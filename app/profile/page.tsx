import { CreateNewsForm } from "@/components/create-news-form"
import { ProfileForm } from "@/components/profile-form"
import { Container, Box } from "@mui/material"

export default function ProfilePage() {
  return (
    <Container maxWidth="xl" className="px-2">
      <Box className="flex gap-5 max-lg:flex-col lg:gap-10">
        <Box>
          <ProfileForm />
        </Box>
        <Box className="flex-1">
          <CreateNewsForm />
        </Box>
      </Box>
    </Container>
  )
}
