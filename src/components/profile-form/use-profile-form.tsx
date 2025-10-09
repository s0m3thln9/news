import { useTranslation } from "@/providers/i18n-provider"
import { type ProfileFormData, profileSchema } from "./schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAppSelector } from "@/hooks/use-app-selector"

export const useProfileForm = () => {
  const t = useTranslation()
  const user = useAppSelector((state) => state.userSlice.user)

  return useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema(t)),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      role: user?.role || "USER",
    },
    mode: "onChange",
  })
}
