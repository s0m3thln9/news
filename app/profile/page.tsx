import { CreateNewsForm } from "@/components/create-news-form/create-news-form"
import { ProfileForm } from "@/components/profile-form"
import { Container, Box } from "@mui/material"

export default function ProfilePage() {
  return (
    <Container maxWidth="xl" className="px-0">
      <Box>
        <ProfileForm />
      </Box>
      <Box>
        <CreateNewsForm />
      </Box>
    </Container>
  )
}
