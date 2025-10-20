import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useAppSelector } from "@/hooks/use-app-selector"
import { useUpdateLocationMutation } from "@/api/locations"
import { updateLocation } from "@/components/locations-table/slice"
import { setEditLocationModalOpen } from "@/components/locations-table/update-locations-modal/slice"
import { UpdateLocationRequestBody } from "@/server/services/locations-service"

export const useUpdateLocation = () => {
  const [updateLocationMutation, { isLoading }] = useUpdateLocationMutation()
  const dispatch = useAppDispatch()
  const uuid = useAppSelector(
    (state) => state.editLocationModalSlice.currentLocation?.uuid,
  )

  return [
    async (data: UpdateLocationRequestBody) => {
      try {
        const res = await updateLocationMutation({
          body: data,
          uuid: uuid || "",
        }).unwrap()
        if (res && res.data) {
          dispatch(updateLocation(res.data))
          dispatch(setEditLocationModalOpen(false))
        }
      } catch (error) {
        console.log(error)
      }
    },
    isLoading,
  ] as const
}
