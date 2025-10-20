import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useDeleteUserMutation } from "@/api/user"
import { deleteUserFromTable } from "@/components/users-table/slice"

export const useDeleteUser = () => {
  const [deleteUserMutation] = useDeleteUserMutation()
  const dispatch = useAppDispatch()

  return async (data: { uuid: string }, refetch: () => void) => {
    try {
      const res = await deleteUserMutation(data.uuid).unwrap()
      if (res && res.data) {
        dispatch(deleteUserFromTable(res.data.uuid))
        refetch()
      }
    } catch (error) {
      console.log(error)
    }
  }
}
