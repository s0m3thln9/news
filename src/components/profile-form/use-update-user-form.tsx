import { useTranslation } from "@/providers/i18n-provider"
import { type UpdateUserFormData, updateUserSchema } from "./schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAppSelector } from "@/hooks/use-app-selector"

export const useUpdateUserForm = () => {
  const t = useTranslation()
  const user = useAppSelector((state) => state.userSlice.user)

  return useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema(t)),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    },
    mode: "onChange",
  })
}
