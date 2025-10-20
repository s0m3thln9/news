import z from "zod"
import { Translate } from "@/providers/i18n-provider"

export const createLocationSchema = (t: Translate) => {
  return z.object({
    title: z.string().min(1, t("locations.validation.titleRequired")),
  })
}

export type CreateLocationFormData = z.infer<
  ReturnType<typeof createLocationSchema>
>
