"use client"

import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { UpdateUserFormData } from "./schema"
import { useUpdateUserMutation } from "@/api/user"
import { updateUser } from "@/features/user/slice"
import { UseFormReset } from "react-hook-form"

export const useUpdateUserSubmit = (
  reset: UseFormReset<{
    firstName: string
    lastName: string
  }>,
) => {
  const [updateUserQuery, { isLoading }] = useUpdateUserMutation()
  const dispatch = useAppDispatch()

  const onSubmit = async (data: UpdateUserFormData) => {
    try {
      const res = await updateUserQuery(data).unwrap()
      if (res && res.data) {
        dispatch(updateUser(res.data))
        reset({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
        })
      }
    } catch (error) {
      console.error("User update error:", error)
    }
  }

  return { onSubmit, isLoading }
}
