import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useDeleteLocationMutation } from "@/api/locations"
import { deleteLocationFromTable } from "@/components/locations-table/slice"

export const useDeleteLocation = () => {
  const [deleteLocationMutation] = useDeleteLocationMutation()
  const dispatch = useAppDispatch()

  return async (data: { uuid: string }, refetch: () => void) => {
    try {
      const res = await deleteLocationMutation(data.uuid).unwrap()
      if (res && res.data) {
        dispatch(deleteLocationFromTable(res.data.uuid))
        refetch()
      }
    } catch (error) {
      console.log(error)
    }
  }
}
