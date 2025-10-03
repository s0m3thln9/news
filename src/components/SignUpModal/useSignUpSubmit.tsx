"use client"

import { useSignUpUserMutation } from "@/api/user"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { SignUpFormData } from "@/components/SignUpModal/schema"
import { setSignUpModalOpen } from "@/components/SignUpModal/slice"
import { setSignInModalOpen } from "@/components/SignInModal/slice"
import { useSignUpForm } from "@/components/SignUpModal/useSignUpForm"

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
