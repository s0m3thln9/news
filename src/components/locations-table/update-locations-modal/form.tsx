import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAppSelector } from "@/hooks/use-app-selector"
import {
  UpdateLocationFormData,
  updateLocationSchema,
} from "@/components/locations-table/update-locations-modal/schema"

export const useUpdateLocationForm = () => {
  const currentLocation = useAppSelector(
    (state) => state.editLocationModalSlice.currentLocation,
  )

  return useForm<UpdateLocationFormData>({
    resolver: zodResolver(updateLocationSchema()),
    defaultValues: {
      title: currentLocation?.title || "",
    },
    mode: "onSubmit",
  })
}
