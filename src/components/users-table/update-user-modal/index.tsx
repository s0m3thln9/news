import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useAppSelector } from "@/hooks/use-app-selector"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/providers/i18n-provider"
import { useEffect, useState } from "react"
import { flushSync } from "react-dom"
import { useUpdateUser } from "@/components/users-table/update-user-modal/use-update-user"
import { useUpdateUserForm } from "@/components/users-table/update-user-modal/form"
import { setEditUserAdminModalOpen } from "@/components/users-table/update-user-modal/slice"
import { UserRole, Language } from "@/generated/prisma"
import { Controller } from "react-hook-form"

export const UpdateUserAdminModal = () => {
  const dispatch = useAppDispatch()
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.USER)

  const currentUser = useAppSelector(
    (state) => state.editUserAdminModalSlice.currentUser,
  )

  const open = useAppSelector(
    (state) => state.editUserAdminModalSlice.modalOpen,
  )

  const locs = useAppSelector((state) => state.locationsSlice.locations)
  const brothers = useAppSelector((state) => state.locationsSlice.brothers)
  const locations = brothers ? [...locs, brothers] : locs

  const [onSubmit, isLoading] = useUpdateUser()

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    setValue,
    clearErrors,
    control,
  } = useUpdateUserForm()

  const t = useTranslation()

  const handleClose = () => {
    reset()
    dispatch(setEditUserAdminModalOpen(false))
  }

  useEffect(() => {
    setValue("firstName", currentUser?.firstName || "")
    setValue("lastName", currentUser?.lastName || "")
    setValue("email", currentUser?.email || "")
    setValue("role", currentUser?.role || "USER")
    setValue("language", currentUser?.language || "RU")
    setValue("locationUuid", currentUser?.locationUuid || "")
  }, [currentUser, setValue])

  const handleClear = () => {
    const defaultValues = {
      firstName: "",
      lastName: "",
      email: "",
      role: "USER",
      language: "RU",
      locationUuid: "",
    } as const
    reset(defaultValues, { keepErrors: false, keepDirty: false })
    flushSync(() => {
      setValue("firstName", "")
      setValue("lastName", "")
      setValue("email", "")
      setValue("role", "USER")
      setValue("language", "RU")
      setValue("locationUuid", "")
    })
    clearErrors()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 540,
          bgcolor: "background.paper",
          borderRadius: "5px",
          boxShadow: 24,
        }}
      >
        <Box
          sx={{
            position: "relative",
            p: 5,
          }}
        >
          <Typography
            variant="h5"
            className="text-primary border-primary-main border-b-4 pb-2.5 font-bold"
            color="primary"
          >
            {t("users.updateUser")}
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-secondary-main mt-10 border-4 p-10"
          >
            <Input
              {...register("firstName")}
              errorMessage={errors.firstName?.message}
              label={t("profile.firstName")}
              className="mb-4"
              fullWidth
            />
            <Input
              {...register("lastName")}
              errorMessage={errors.lastName?.message}
              label={t("profile.lastName")}
              className="mb-4"
              fullWidth
            />
            <Input
              {...register("email")}
              errorMessage={errors.email?.message}
              label={t("profile.email")}
              className="mb-4"
              fullWidth
            />
            <Box className="mb-4 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <Typography>{t("users.roleLabel")}</Typography>
                {errors.role?.message && (
                  <Typography className={"text-error-main"}>
                    {errors.role?.message}
                  </Typography>
                )}
              </div>
              <Controller
                name="role"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    select
                    onChange={onChange}
                    value={value}
                    variant="standard"
                    fullWidth
                    placeholder={t("users.selectRole")}
                    className="border px-2.5 py-2 !text-black"
                    error={!!errors.role}
                    slotProps={{
                      input: {
                        disableUnderline: true,
                        classes: {
                          root: "p-0 m-0",
                          input: "p-0 m-0 bg-transparent !text-black",
                        },
                      },
                      select: {
                        displayEmpty: true,
                      },
                    }}
                  >
                    {Object.values(UserRole).map((role) => (
                      <MenuItem
                        key={role}
                        value={role}
                        className="bg-white text-black hover:bg-gray-100"
                        onClick={() => setSelectedRole(role)}
                      >
                        {role}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
            {selectedRole === UserRole.EDITOR && (
              <Box className="mb-4 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <Typography>{t("users.locationLabel")}</Typography>
                  {errors.locationUuid?.message && (
                    <Typography className={"text-error-main"}>
                      {errors.locationUuid?.message}
                    </Typography>
                  )}
                </div>
                <Controller
                  name="locationUuid"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      select
                      onChange={onChange}
                      value={value}
                      variant="standard"
                      fullWidth
                      placeholder={t("users.selectLocation")}
                      className="border px-2.5 py-2 !text-black"
                      error={!!errors.locationUuid}
                      slotProps={{
                        input: {
                          disableUnderline: true,
                          classes: {
                            root: "p-0 m-0",
                            input: "p-0 m-0 bg-transparent !text-black",
                          },
                        },
                        select: {
                          displayEmpty: true,
                        },
                      }}
                    >
                      {locations.map((location) => (
                        <MenuItem
                          key={location.uuid}
                          value={location.uuid}
                          className="bg-white text-black hover:bg-gray-100"
                        >
                          {location.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            )}
            <Box className="mb-4 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <Typography>{t("users.languageLabel")}</Typography>
                {errors.language?.message && (
                  <Typography className={"text-error-main"}>
                    {errors.language.message}
                  </Typography>
                )}
              </div>
              <Controller
                name="language"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    select
                    onChange={onChange}
                    value={value}
                    variant="standard"
                    fullWidth
                    placeholder={t("users.selectLanguage")}
                    className="border px-2.5 py-2 !text-black"
                    error={!!errors.language}
                    slotProps={{
                      input: {
                        disableUnderline: true,
                        classes: {
                          root: "p-0 m-0",
                          input: "p-0 m-0 bg-transparent !text-black",
                        },
                      },
                      select: {
                        displayEmpty: true,
                      },
                    }}
                  >
                    {Object.values(Language).map((language) => (
                      <MenuItem
                        key={language}
                        value={language}
                        className="bg-white text-black hover:bg-gray-100"
                      >
                        {language}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
            <Box className="flex gap-4">
              <Button
                type="button"
                variant="outlined"
                className={"flex-1"}
                onClick={handleClear}
              >
                {t("common.clear")}
              </Button>
              <Button
                type="submit"
                variant="contained"
                className={"flex-1"}
                disabled={!!isLoading}
              >
                {t("users.update")}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  )
}
