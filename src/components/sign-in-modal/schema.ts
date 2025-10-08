import z from "zod"
import { Translate } from "@/providers/i18n-provider"

export const signInSchema = (t: Translate) =>
  z.object({
    email: z.string().trim().nonempty(t("auth.validation.emailRequired")),
    password: z
      .string()
      .min(8, t("auth.validation.passwordMinLength"))
      .max(64, t("auth.validation.passwordMaxLength"))
      .trim(),
  })

export type SignInFormData = z.infer<ReturnType<typeof signInSchema>>
