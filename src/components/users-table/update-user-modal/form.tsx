import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  UpdateUserAdminFormData,
  updateUserSchema,
} from "@/components/users-table/update-user-modal/schema"

export const useUpdateUserForm = () => {
  return useForm<UpdateUserAdminFormData>({
    resolver: zodResolver(updateUserSchema()),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "USER",
      language: "RU",
      locationUuid: "",
    },
    mode: "onSubmit",
  })
}
