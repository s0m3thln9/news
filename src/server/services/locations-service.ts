import z from "zod"
import { prisma } from "@/server/prisma-client"
import { $Enums } from "@/generated/prisma"
import UserRole = $Enums.UserRole
import { ApiError } from "@/types/api-response"

const createLocationSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
})

export type CreateLocationRequestBody = z.infer<typeof createLocationSchema>

export const createLocation = async (
  body: CreateLocationRequestBody,
  uuid: string,
) => {
  const user = await prisma.user.findFirst({
    where: {
      uuid,
    },
  })

  if (user?.role !== UserRole.ADMIN) {
    throw new ApiError({ status: 403, message: "Нет доступа" })
  }

  createLocationSchema.parse(body)

  return prisma.location.create({
    data: {
      title: body.title,
    },
  })
}
