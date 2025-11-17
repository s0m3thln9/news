import { Translate } from "@/providers/i18n-provider"
import z from "zod"

export const createNewsSchema = (t: Translate) => {
  return z.object({
    title: z.string().min(1, t("news.validation.titleRequired")),
    image: z.string().min(1, t("news.validation.imagesRequired")),
    content: z.string().min(1, t("news.validation.contentRequired")),
    description: z.string().min(1, t("news.validation.descriptionRequired")),
    locationUuid: z.string().min(1, t("news.validation.locationRequired")),
  })
}

export type CreateNewsFormData = z.infer<ReturnType<typeof createNewsSchema>>
