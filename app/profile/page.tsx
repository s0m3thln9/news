"use client"

import { CreateNewsForm } from "@/components/create-news-form"
import { ProfileForm } from "@/components/profile-form"
import { Container, Box } from "@mui/material"
import { NewsTable } from "@/components/news-table"
import { LocationsTable } from "@/components/locations-table"
import { UsersTable } from "@/components/users-table"
import { useAppSelector } from "@/hooks/use-app-selector"
import { UserRole } from "@/generated/prisma"

export default function ProfilePage() {
  const userRole = useAppSelector((state) => state.userSlice.user?.role)

  return (
    <Container maxWidth="xl" className="px-2 bg-[rgba(255,255,255,0.9)]">
      <Box className="flex gap-5 max-xl:flex-col xl:gap-10">
        <Box className="max-xl:self-center">
          <ProfileForm />
        </Box>
        <Box className="flex flex-col gap-8">
          {(userRole === UserRole.ADMIN || userRole === UserRole.EDITOR) && (
            <CreateNewsForm />
          )}
          {(userRole === UserRole.ADMIN || userRole === UserRole.EDITOR) && (
            <NewsTable />
          )}
          {userRole === UserRole.ADMIN && <LocationsTable />}
          {userRole === UserRole.ADMIN && <UsersTable />}
        </Box>
      </Box>
    </Container>
  )
}
