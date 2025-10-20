import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CreateLocationFormData,
  createLocationSchema,
} from "@/components/locations-table/create-locations-modal/schema"
import { useTranslation } from "@/providers/i18n-provider"

export const useCreateLocationForm = () => {
  const t = useTranslation()

  return useForm<CreateLocationFormData>({
    resolver: zodResolver(createLocationSchema(t)),
    defaultValues: {
      title: "",
    },
    mode: "onSubmit",
  })
}
