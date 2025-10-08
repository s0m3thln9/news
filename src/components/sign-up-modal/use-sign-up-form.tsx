import { useTranslation } from "@/providers/i18n-provider"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpFormData, signUpSchema } from "@/components/sign-up-modal/schema"

export const useSignUpForm = () => {
  const t = useTranslation()

  return useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema(t)),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  })
}
