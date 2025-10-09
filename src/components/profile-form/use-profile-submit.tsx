"use client"

import { useAppDispatch } from "@/hooks/use-app-dispatch"
// import { updateProfile } from "@/features/user/slice"
import { ProfileFormData } from "./schema"
// import { useUpdateProfileUserMutation } from "@/api/user"

export const useProfileSubmit = () => {
  // const [updateProfileUser] = useUpdateProfileUserMutation()
  const dispatch = useAppDispatch()

  return async (
    data: ProfileFormData,
    field: keyof Pick<ProfileFormData, "firstName" | "lastName">,
  ) => {
    try {
      // const payload = { ...data }
      // const res = await updateProfileUser(payload).unwrap()
      // if (res && res.data) {
      //   dispatch(updateProfile(res.data))
      // }
    } catch (error) {
      console.error("Profile update error:", error)
    }
  }
}
