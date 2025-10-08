import { useTranslation } from "@/components/providers/i18n-provider"
import {
  type SignInFormData,
  signInSchema,
} from "@/components/sign-in-modal/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export const useSignInForm = () => {
  const t = useTranslation()

  return useForm<SignInFormData>({
    resolver: zodResolver(signInSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  })
}
