import { Box } from "@mui/system"
import { Button, Modal, Typography } from "@mui/material"
import { Input } from "@/components/ui/input"
import { useAppSelector } from "@/hooks/use-app-selector"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { Translate } from "@/components/ui/translate"
import { useTranslation } from "@/providers/i18n-provider"
import CloseIcon from "@mui/icons-material/Close"
import { useSignUpSubmit } from "@/components/sign-up-modal/use-sign-up-submit"
import { useSignUpForm } from "@/components/sign-up-modal/use-sign-up-form"
import { setSignUpModalOpen } from "@/components/sign-up-modal/slice"
import { setSignInModalOpen } from "@/components/sign-in-modal/slice"

export const SignUpModal = () => {
  const open = useAppSelector((state) => state.signUpSlice.modalOpen)
  const dispatch = useAppDispatch()

  const t = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useSignUpForm()

  const onSubmit = useSignUpSubmit(setError)

  const handleClose = () => {
    reset()
    dispatch(setSignUpModalOpen(false))
  }

  const handleOpenSignIn = () => {
    handleClose()
    dispatch(setSignInModalOpen(true))
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
              borderTopRightRadius: "5px",
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
              <Translate value={"auth.signUp.title"} />
            </Typography>
            <div className={"h-[3px] bg-[#D9D9D9]"} />
            <div className={"flex flex-col gap-4"}>
              <Input
                {...register("firstName")}
                errorMessage={errors.firstName?.message}
                label={t("auth.signUp.firstName")}
                placeholder={t("auth.signUp.firstName")}
                type="text"
              />
              <Input
                {...register("lastName")}
                errorMessage={errors.lastName?.message}
                label={t("auth.signUp.lastName")}
                placeholder={t("auth.signUp.lastName")}
                type="text"
              />
              <Input
                {...register("email")}
                errorMessage={errors.email?.message}
                label={t("auth.signUp.email")}
                placeholder={t("auth.signUp.email")}
                type="email"
              />
              <Input
                {...register("password")}
                errorMessage={errors.password?.message}
                label={t("auth.signUp.password")}
                placeholder={t("auth.signUp.password")}
                type="password"
              />
              <Input
                {...register("repeatPassword")}
                errorMessage={errors.repeatPassword?.message}
                label={t("auth.signUp.repeatPassword")}
                placeholder={t("auth.signUp.repeatPassword")}
                type="password"
              />
              <Button type={"submit"} variant={"contained"}>
                <Translate value="auth.signUp.submit" />
              </Button>
            </div>
            <div className={"h-[3px] bg-[#D9D9D9]"} />
            <div className={"flex items-center justify-between sm:px-12"}>
              <Typography sx={{ fontSize: "14px" }}>
                {t("authExtra.haveAccount")}
              </Typography>
              <Button
                sx={{ fontSize: "14px" }}
                variant={"contained"}
                onClick={handleOpenSignIn}
              >
                {t("authExtra.signIn")}
              </Button>
            </div>
          </form>
        </Box>
      </Box>
    </Modal>
  )
}
