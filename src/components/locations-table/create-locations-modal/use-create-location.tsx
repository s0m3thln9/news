import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useCreateLocationMutation } from "@/api/locations"
import { createLocation } from "@/components/locations-table/slice"
import { CreateLocationRequestBody } from "@/server/services/locations-service"
import { setCreateLocationModalOpen } from "@/components/locations-table/create-locations-modal/slice"

export const useCreateLocation = (refetch: () => void) => {
  const [createLocationMutation, { isLoading }] = useCreateLocationMutation()
  const dispatch = useAppDispatch()

  return [
    async (data: CreateLocationRequestBody) => {
      try {
        const res = await createLocationMutation(data).unwrap()
        if (res && res.data) {
          dispatch(createLocation(res.data))
          dispatch(setCreateLocationModalOpen(false))
          refetch()
        }
      } catch (error) {
        console.log(error)
      }
    },
    isLoading,
  ] as const
}
