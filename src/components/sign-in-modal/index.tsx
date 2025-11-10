import { Box } from "@mui/system"
import { Button, Modal, Typography } from "@mui/material"
import { Input } from "@/components/ui/input"
import { useAppSelector } from "@/hooks/use-app-selector"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { setSignInModalOpen } from "@/components/sign-in-modal/slice"
import { useSignInForm } from "@/components/sign-in-modal/use-sign-in-form"
import { useSignInSubmit } from "@/components/sign-in-modal/use-sign-in-submit"
import { useTranslation } from "@/providers/i18n-provider"
import CloseIcon from "@mui/icons-material/Close"
import { setSignUpModalOpen } from "@/components/sign-up-modal/slice"
import { Translate } from "@/components/ui/translate"

export const SignInModal = () => {
  const open = useAppSelector((state) => state.signInSlice.modalOpen)
  const dispatch = useAppDispatch()

  const t = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useSignInForm()

  const onSubmit = useSignInSubmit()

  const handleClose = () => {
    reset()
    dispatch(setSignInModalOpen(false))
  }

  const handleOpenSignUp = () => {
    handleClose()
    dispatch(setSignUpModalOpen(true))
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        className="h-[100dvh] w-full overflow-y-auto sm:h-auto sm:w-[480px]"
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={"flex flex-col gap-10"}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: "40px", textAlign: "center" }}
            >
              <Translate value={"auth.signIn.title"} />
            </Typography>
            <div className={"h-[3px] bg-[#D9D9D9]"} />
            <div className={"flex flex-col gap-4"}>
              <Input
                {...register("email")}
                errorMessage={errors.email?.message}
                label={t("auth.signIn.email")}
                placeholder={t("auth.signIn.email")}
                type="email"
              />
              <Input
                {...register("password")}
                errorMessage={errors.password?.message}
                label={t("auth.signIn.password")}
                placeholder={t("auth.signIn.password")}
                type="password"
              />
              <Button type={"submit"} variant={"contained"}>
                <Translate value="auth.signIn.submit" />
              </Button>
            </div>
            <div className={"h-[3px] bg-[#D9D9D9]"} />
            <div className={"flex items-center justify-between sm:px-12"}>
              <Typography sx={{ fontSize: "14px" }}>
                {t("authExtra.noAccount")}
              </Typography>
              <Button
                sx={{ fontSize: "14px" }}
                variant={"contained"}
                onClick={handleOpenSignUp}
              >
                {t("authExtra.registration")}
              </Button>
            </div>
          </form>
        </Box>
      </Box>
    </Modal>
  )
}
