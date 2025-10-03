import { Box } from "@mui/system"
import { Button, Modal, Typography } from "@mui/material"
import { Input } from "@/components/ui/Input"
import { useAppSelector } from "@/hooks/useAppSelector"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { setSignInModalOpen } from "@/components/SignInModal/slice"
import { useSignInForm } from "@/components/SignInModal/useSignInForm"
import { useSignInSubmit } from "@/components/SignInModal/useSignInSubmit"
import { Translate } from "../ui/translate"
import { useTranslation } from "@/components/providers/I18Provider"
import CloseIcon from "@mui/icons-material/Close"
import { setSignUpModalOpen } from "@/components/SignUpModal/slice"

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
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 480,
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
              <Translate value={"auth.signIn.title"} />
            </Typography>
            <div className={"h-[3px] bg-[#D9D9D9]"} />
            <div className={"flex flex-col gap-4"}>
              <Input
                {...register("email")}
                errorMessage={errors.email?.message}
                label={t("auth.signIn.email")}
                placeholder={"qwerty123456@gmail.com"}
                type="email"
              />
              <Input
                {...register("password")}
                errorMessage={errors.password?.message}
                label={t("auth.signIn.password")}
                placeholder={"qwerty123456"}
                type="password"
              />
              <Button type={"submit"} variant={"contained"}>
                <Translate value="auth.signIn.submit" />
              </Button>
            </div>
            <div className={"h-[3px] bg-[#D9D9D9]"} />
            <div className={"flex items-center justify-between px-12"}>
              <Typography sx={{ fontSize: "14px" }}>Нет аккаунта?</Typography>
              <Button
                sx={{ fontSize: "14px" }}
                variant={"contained"}
                onClick={handleOpenSignUp}
              >
                Регистрация
              </Button>
            </div>
          </form>
        </Box>
      </Box>
    </Modal>
  )
}
