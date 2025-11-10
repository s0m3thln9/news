import CloseIcon from "@mui/icons-material/Close"
import { Box, Button, Modal, Typography } from "@mui/material"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useAppSelector } from "@/hooks/use-app-selector"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/providers/i18n-provider"
import { flushSync } from "react-dom"
import { useCreateLocationForm } from "@/components/locations-table/create-locations-modal/form"
import { setCreateLocationModalOpen } from "@/components/locations-table/create-locations-modal/slice"
import { useCreateLocation } from "@/components/locations-table/create-locations-modal/use-create-location"
import { FC } from "react"

type CreateLocationModalProps = {
  refetch: () => void
}

export const CreateLocationModal: FC<CreateLocationModalProps> = ({
  refetch,
}) => {
  const dispatch = useAppDispatch()

  const open = useAppSelector(
    (state) => state.createLocationModalSlice.modalOpen,
  )

  const [onSubmit, isLoading] = useCreateLocation(refetch)

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    setValue,
    clearErrors,
  } = useCreateLocationForm()

  const t = useTranslation()

  const handleClose = () => {
    reset()
    dispatch(setCreateLocationModalOpen(false))
  }

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
        className="h-[100dvh] w-full overflow-y-auto sm:h-auto sm:w-[540px]"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
        }}
      >
        <Box
          sx={{
            position: "relative",
            p: 5,
          }}
        >
          <Button
            variant={"contained"}
            sx={{
              width: "40px",
              height: "40px",
              p: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "48px",
              position: "absolute",
              top: "0",
              right: "0",
              borderRadius: 0,
              boxShadow: 0,
              ":hover": {
                boxShadow: 0,
              },
              bgcolor: "rgba(0,0,0,0.5)",
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </Button>
          <Typography
            variant="h5"
            className="text-primary border-primary-main border-b-4 pb-2.5 font-bold"
            color="primary"
          >
            {t("locations.createLocation")}
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
                {t("locations.create")}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  )
}
