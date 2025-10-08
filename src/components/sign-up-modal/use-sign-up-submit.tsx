"use client"

import { useSignUpUserMutation } from "@/api/user"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { SignUpFormData } from "@/components/sign-up-modal/schema"
import { setSignUpModalOpen } from "@/components/sign-up-modal/slice"
import { setSignInModalOpen } from "@/components/sign-in-modal/slice"
import { useSignUpForm } from "@/components/sign-up-modal/use-sign-up-form"

export const useSignUpSubmit = (
  setError: ReturnType<typeof useSignUpForm>["setError"],
) => {
  const [signUpUser] = useSignUpUserMutation()
  const dispatch = useAppDispatch()

  return async (data: SignUpFormData) => {
    try {
      const res = await signUpUser(data).unwrap()
      if (res && res.data) {
        dispatch(setSignUpModalOpen(false))
        dispatch(setSignInModalOpen(true))
      }
    } catch (error) {
      let e
      if (error !== null && typeof error === "object" && "data" in error) {
        e = error?.data
      }

      if (
        e &&
        typeof e === "object" &&
        "message" in e &&
        e.message === "Пользователь с таким email уже есть"
      ) {
        setError("email", { message: "Email занят" })
      }
    }
  }
}
