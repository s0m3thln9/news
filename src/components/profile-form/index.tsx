"use client"

import { Box, Typography, Button } from "@mui/material"
import { Input } from "@/components/ui/input"
import { useAppSelector } from "@/hooks/use-app-selector"
import { useUpdateUserForm } from "./use-update-user-form"
import { useUpdateUserSubmit } from "./use-update-user-submit"
import { useTranslation } from "@/providers/i18n-provider"
import { Translate } from "@/components/ui/translate"

export const ProfileForm = () => {
  const t = useTranslation()
  const user = useAppSelector((state) => state.userSlice.user)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useUpdateUserForm()

  const { onSubmit, isLoading } = useUpdateUserSubmit(reset)

  if (!user) {
    return <Typography>Загрузка профиля...</Typography>
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
        />
        <Input
          {...register("lastName")}
          errorMessage={errors.lastName?.message}
          label={t("profile.lastName")}
          placeholder={t("profile.lastNamePlaceholder")}
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
        <Button
          type="submit"
          className="w-full"
          variant="contained"
          color="primary"
          disabled={!isDirty || isLoading}
        >
          Сохранить изменения
        </Button>
      </div>
    </Box>
  )
}
