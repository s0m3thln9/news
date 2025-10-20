import z from "zod"
import { prisma } from "@/server/prisma-client"
import type { Location, Prisma, PrismaPromise } from "@/generated/prisma"
import { LocationWithNews } from "@/types/dto/location-with-news"
import { Pagination } from "@/types/dto/Pagination"

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

export type GetLocationsQueryParams = {
  offset?: number
  limit?: number
  search?: string
}

type GetLocations = (
  queryParams: GetLocationsQueryParams,
) => Promise<Pagination<Location[]>>

export const geLocationsQueryOptions = (
  queryParams: GetLocationsQueryParams,
): Prisma.LocationFindManyArgs => ({
  where: {
    title: {
      contains: queryParams.search,
      mode: "insensitive",
    },
  },
  take: queryParams.limit || 10,
  skip: queryParams.offset || 0,
  orderBy: {
    createdAt: "asc",
  },
})

export const getLocations: GetLocations = async (queryParams) => ({
  data: await prisma.location.findMany(geLocationsQueryOptions(queryParams)),
  limit: queryParams.limit || 10,
  offset: queryParams.offset || 0,
  total: await prisma.location.count({
    where: {
      title: {
        contains: queryParams.search,
        mode: "insensitive",
      },
    },
  }),
})

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

export const getLocation = async (uuid: string): Promise<Location | null> =>
  prisma.location.findFirst({
    where: { uuid },
  })

export const getLocationsWithNews = (): PrismaPromise<LocationWithNews[]> =>
  prisma.location.findMany({
    include: {
      news: {
        take: 4,
        omit: {
          userUuid: true,
          locationUuid: true,
        },
      },
    },
  })
