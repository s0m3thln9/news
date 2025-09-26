import z from "zod"
import { prisma } from "@/server/prisma-client"

const createLocationSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
})

export type CreateLocationRequestBody = z.infer<typeof createLocationSchema>

export const createLocation = async (body: CreateLocationRequestBody) => {
  createLocationSchema.parse(body)

  return prisma.location.create({
    data: {
      title: body.title,
    },
  })
}

export const getLocations = async () => prisma.location.findMany()

const updateLocationSchema = createLocationSchema.partial()

export type UpdateLocationRequestBody = z.infer<typeof updateLocationSchema>

export const updateLocation = async (
  uuid: string,
  body: UpdateLocationRequestBody,
) => {
  updateLocationSchema.parse(body)

  return prisma.location.update({
    where: { uuid },
    data: body,
  })
}

export const deleteLocation = async (uuid: string) => {
  return prisma.location.delete({
    where: { uuid },
  })
}
