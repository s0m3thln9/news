import z from "zod"

export const updateLocationSchema = () => {
  return z.object({
    title: z.string().optional(),
  })
}

export type UpdateLocationFormData = z.infer<
  ReturnType<typeof updateLocationSchema>
>
