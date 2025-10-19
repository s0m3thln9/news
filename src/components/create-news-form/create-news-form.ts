import {
  createNewsSchema,
  type CreateNewsFormData,
} from "@/components/create-news-form/schema"
import { useTranslation } from "@/providers/i18n-provider"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export const useCreateNewsForm = () => {
  const t = useTranslation()

  return useForm<CreateNewsFormData>({
    resolver: zodResolver(createNewsSchema(t)),
    defaultValues: {
      title: "",
      description: "",
      images: [],
      content: "",
      locationUuid: "",
    },
    mode: "onSubmit",
  })
}
