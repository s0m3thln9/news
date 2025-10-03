"use client"

import { SignInFormData } from "./schema"
import { useSignInUserMutation } from "@/api/user"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { signIn } from "@/features/user/slice"
import { setSignInModalOpen } from "@/components/SignInModal/slice"

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
