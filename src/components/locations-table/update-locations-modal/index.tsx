import { Box, Button, Modal, Typography } from "@mui/material"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useAppSelector } from "@/hooks/use-app-selector"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/providers/i18n-provider"
import { useEffect } from "react"
import { flushSync } from "react-dom"
import { setEditLocationModalOpen } from "@/components/locations-table/update-locations-modal/slice"
import { useUpdateLocation } from "@/components/locations-table/update-locations-modal/use-update-location"
import { useUpdateLocationForm } from "@/components/locations-table/update-locations-modal/form"

export const UpdateLocationModal = () => {
  const dispatch = useAppDispatch()

  const currentLocation = useAppSelector(
    (state) => state.editLocationModalSlice.currentLocation,
  )

  const open = useAppSelector((state) => state.editLocationModalSlice.modalOpen)

  const [onSubmit, isLoading] = useUpdateLocation()

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    setValue,
    clearErrors,
  } = useUpdateLocationForm()

  const t = useTranslation()

  const handleClose = () => {
    reset()
    dispatch(setEditLocationModalOpen(false))
  }

  useEffect(() => {
    setValue("title", currentLocation?.title || "")
  }, [currentLocation, setValue])

  const handleClear = () => {
    const defaultValues = {
      title: "",
    }
    reset(defaultValues, { keepErrors: false, keepDirty: false })
    flushSync(() => setValue("title", ""))
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
            {t("locations.updateLocation")}
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-secondary-main mt-10 border-4 p-10"
          >
            <Input
              {...register("title")}
              errorMessage={errors.title?.message}
              label={t("locations.title")}
              className="mb-4"
              fullWidth
            />

            <Box className="flex gap-4">
              <Button
                type="button"
                variant="outlined"
                className={"flex-1"}
                onClick={handleClear}
              >
                {t("locations.clear")}
              </Button>
              <Button
                type="submit"
                variant="contained"
                className={"flex-1"}
                disabled={!!isLoading}
              >
                {t("locations.update")}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  )
}
