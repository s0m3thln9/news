import { useTranslation } from "@/components/providers/I18Provider"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInFormData, signInSchema } from "@/components/SignInModal/schema"

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
