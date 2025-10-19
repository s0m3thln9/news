import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  UpdateNewsFormData,
  updateNewsSchema,
} from "@/components/news-table/update-news-modal/schema"
import { useAppSelector } from "@/hooks/use-app-selector"

export const useUpdateNewsForm = () => {
  const currentNews = useAppSelector(
    (state) => state.editNewsModalSlice.currentNews,
  )

  return useForm<UpdateNewsFormData>({
    resolver: zodResolver(updateNewsSchema()),
    defaultValues: {
      title: currentNews?.title || "",
      description: currentNews?.description || "",
      images: currentNews?.images || [],
      content: currentNews?.content || "",
      locationUuid: currentNews?.content || "",
    },
    mode: "onSubmit",
  })
}
