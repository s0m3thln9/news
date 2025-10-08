"use client"

import { setSignInModalOpen } from "@/components/sign-in-modal/slice"
import { signIn } from "@/features/user/slice"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { SignInFormData } from "./schema"
import { useSignInUserMutation } from "@/api/user"

export const useSignInSubmit = () => {
  const [signInUser] = useSignInUserMutation()
  const dispatch = useAppDispatch()

  return async (data: SignInFormData) => {
    try {
      const res = await signInUser(data).unwrap()
      if (res && res.data) {
        dispatch(signIn(res.data))
        dispatch(setSignInModalOpen(false))
      }
    } catch (error) {
      console.log(error)
    }
  }
}
