import z from "zod"
import { Translate } from "@/components/providers/i18n-provider"

export const signUpSchema = (t: Translate) =>
  z
    .object({
      firstName: z.string().nonempty(t("auth.validation.firstNameRequired")),
      lastName: z.string().nonempty(t("auth.validation.lastNameRequired")),
      email: z.string().trim().nonempty(t("auth.validation.emailRequired")),
      password: z
        .string()
        .min(8, t("auth.validation.passwordMinLength"))
        .max(64, t("auth.validation.passwordMaxLength"))
        .trim(),
      repeatPassword: z
        .string()
        .min(8, t("auth.validation.passwordMinLength"))
        .max(64, t("auth.validation.passwordMaxLength"))
        .trim(),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: t("auth.validation.passwordsNotMatch"),
      path: ["repeatPassword"],
    })

export type SignUpFormData = z.infer<ReturnType<typeof signUpSchema>>
