import z from "zod"

export const updateNewsSchema = () => {
  return z.object({
    title: z.string().optional(),
    images: z.array(z.string()).optional(),
    content: z.string().optional(),
    description: z.string().optional(),
    locationUuid: z.string().optional(),
  })
}

export type UpdateNewsFormData = z.infer<ReturnType<typeof updateNewsSchema>>
