"use client"

import { Box, Typography } from "@mui/material"
import { Input } from "@/components/ui/input"
import { useAppSelector } from "@/hooks/use-app-selector"
import { useProfileForm } from "./use-profile-form"
import { useProfileSubmit } from "./use-profile-submit"
import { useTranslation } from "@/providers/i18n-provider"
import { Translate } from "@/components/ui/translate"

export const ProfileForm = () => {
  const t = useTranslation()
  const user = useAppSelector((state) => state.userSlice.user)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = useProfileForm()

  const onSubmit = useProfileSubmit()

  const handleBlur = async (field: "firstName" | "lastName") => {
    const data = watch()
    if (isDirty && data[field]) {
      await handleSubmit((fullData) => onSubmit(fullData, field))()
    }
  }

  if (!user) {
    return <Typography>Загрузка профиля...</Typography>
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => onSubmit(data, "firstName"))}
      className="border-secondary-main flex max-w-md flex-col gap-10 border-4 p-10"
    >
      <Typography
        variant="h5"
        className="text-center text-[32px] font-bold text-black"
      >
        <Translate value="profile.title" />
      </Typography>
      <div className="bg-secondary-main h-1" />
      <div className="flex flex-col gap-4">
        <Input
          {...register("firstName")}
          errorMessage={errors.firstName?.message}
          label={t("profile.firstName")}
          placeholder={t("profile.firstNamePlaceholder")}
          onBlur={() => handleBlur("firstName")}
        />
        <Input
          {...register("lastName")}
          errorMessage={errors.lastName?.message}
          label={t("profile.lastName")}
          placeholder={t("profile.lastNamePlaceholder")}
          onBlur={() => handleBlur("lastName")}
        />
        <Input
          value={user.email}
          label={t("profile.email")}
          placeholder="example@email.com"
          disabled
          type="email"
        />
        <Input
          value={user.role}
          label={t("profile.role")}
          placeholder="Роль"
          disabled
        />
      </div>
    </Box>
  )
}
