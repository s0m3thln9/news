"use client"

import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { UpdateUserFormData } from "./schema"
import { useUpdateUserMutation } from "@/api/user"
import { updateUser } from "@/features/user/slice"

export const useUpdateUserSubmit = (reset: () => void) => {
  const [updateUserQuery, { isLoading }] = useUpdateUserMutation()
  const dispatch = useAppDispatch()

  const onSubmit = async (data: UpdateUserFormData) => {
    try {
      const res = await updateUserQuery(data).unwrap()
      if (res && res.data) {
        dispatch(updateUser(res.data))
        reset()
      }
    } catch (error) {
      console.error("User update error:", error)
    }
  }

  return { onSubmit, isLoading }
}
