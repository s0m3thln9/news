import z from "zod"
import { Translate } from "@/providers/i18n-provider"

export const updateUserSchema = (t: Translate) =>
  z.object({
    firstName: z
      .string()
      .trim()
      .min(1, t("profile.validation.firstNameRequired"))
      .max(50, t("profile.validation.firstNameMaxLength")),
    lastName: z
      .string()
      .trim()
      .min(1, t("profile.validation.lastNameRequired"))
      .max(50, t("profile.validation.lastNameMaxLength")),
  })

export type UpdateUserFormData = z.infer<ReturnType<typeof updateUserSchema>>
