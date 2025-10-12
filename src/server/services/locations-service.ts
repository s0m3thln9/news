import z from "zod"
import { prisma } from "@/server/prisma-client"
import type { Location } from "@/generated/prisma"
import {
  getNewsQueryOptions,
  GetNewsQueryParams,
} from "@/server/services/news-service"
import { LocationWithNews } from "@/types/dto/location-with-news"

const createLocationSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  image: z.string().optional(),
})

export type CreateLocationRequestBody = z.infer<typeof createLocationSchema>

export const createLocation = async (body: CreateLocationRequestBody) => {
  createLocationSchema.parse(body)

  return prisma.location.create({
    data: body,
  })
}

export const getLocations = async (): Promise<Location[]> =>
  prisma.location.findMany()

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

const addEditorToLocationSchema = z.object({
  editorUuid: z.string().min(1, "Uuid редактора обязательно"),
})

export type AddEditorToLocationRequestBody = z.infer<
  typeof addEditorToLocationSchema
>

export const addEditorToLocation = async (
  uuid: string,
  body: AddEditorToLocationRequestBody,
) => {
  addEditorToLocationSchema.parse(body)

  return prisma.location.update({
    where: { uuid },
    data: { editors: { connect: { uuid: body.editorUuid } } },
  })
}

type GetLocationWithNews = (
  uuid: string,
  queryParams: GetNewsQueryParams,
) => Promise<LocationWithNews | null>

export const getLocationWithNews: GetLocationWithNews = async (
  uuid: string,
  queryParams,
) => {
  return prisma.location.findFirst({
    where: { uuid },
    include: {
      news: getNewsQueryOptions(queryParams),
    },
  })
}
