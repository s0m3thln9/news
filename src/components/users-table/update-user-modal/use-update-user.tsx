import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useAppSelector } from "@/hooks/use-app-selector"
import { useUpdateUserAdminMutation } from "@/api/user"
import { UpdateUserAdminFormData } from "@/components/users-table/update-user-modal/schema"
import { updateUser } from "@/components/users-table/slice"
import { setEditUserAdminModalOpen } from "@/components/users-table/update-user-modal/slice"

export const useUpdateUser = () => {
  const [updateUserAdmin, { isLoading }] = useUpdateUserAdminMutation()
  const dispatch = useAppDispatch()
  const uuid = useAppSelector(
    (state) => state.editUserAdminModalSlice.currentUser?.uuid,
  )

  return [
    async (data: UpdateUserAdminFormData) => {
      try {
        const res = await updateUserAdmin({
          body: data,
          uuid: uuid || "",
        }).unwrap()
        if (res && res.data) {
          dispatch(updateUser(res.data))
          dispatch(setEditUserAdminModalOpen(false))
        }
      } catch (error) {
        console.log(error)
      }
    },
    isLoading,
  ] as const
}
