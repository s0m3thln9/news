import { ProfileForm } from "@/components/profile-form"
import { Container, Box } from "@mui/material"

export default function ProfilePage() {
  return (
    <Container maxWidth="xl" className="px-0">
      <Box>
        <ProfileForm />
      </Box>
    </Container>
  )
}
