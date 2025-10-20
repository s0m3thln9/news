import { Language, UserRole } from "@/generated/prisma"
import z from "zod"

export const updateUserSchema = () => {
  return z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    role: z.enum(UserRole),
    language: z.enum(Language),
    locationUuid: z.string(),
  })
}

export type UpdateUserAdminFormData = z.infer<
  ReturnType<typeof updateUserSchema>
>
