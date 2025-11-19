import z from "zod"
import { prisma } from "@/server/prisma-client"
import type { NewsDTO } from "@/types/dto/news"
import { Prisma } from "@prisma/client"
import { Pagination } from "@/types/dto/pagination"
import { ApiError } from "@/types/api-response"
import { DefaultArgs } from "@prisma/client/runtime/library"
import { NewsWithLocation } from "@/types/dto/news-with-location"

export const createNewsSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  image: z.string().min(1, "Картинка обязательна"),
  content: z.string().min(1, "Контент обязателен"),
  description: z.string().min(1, "Описание обязательно"),
  locationUuid: z.string().min(1, "Локация обязательно"),
})

export type CreateNewsRequestBody = z.infer<typeof createNewsSchema>

export const createNews = async (
  userUuid: string,
  body: CreateNewsRequestBody,
) =>
  prisma.news.create({
    data: {
      userUuid,
      image: body.image,
      content: body.content,
      title: body.title,
      description: body.description,
      locationUuid: body.locationUuid,
    },
    omit: {
      userUuid: true,
      locationUuid: true,
    },
  })

type GetNews = (
  queryParams: GetNewsQueryParams,
) => Promise<Pagination<NewsDTO[]>>

export type GetNewsQueryParams = {
  offset?: number
  limit?: number
  search?: string
  locationUuid?: string
}

export const getNewsQueryOptions = (
  queryParams: GetNewsQueryParams,
): Prisma.NewsFindManyArgs => ({
  where: {
    title: {
      contains: queryParams.search,
    },
    locationUuid: queryParams.locationUuid,
  },
  take: queryParams.limit || 10,
  skip: queryParams.offset || 0,
  orderBy: {
    createdAt: "asc",
  },
  omit: {
    userUuid: true,
    locationUuid: true,
  },
})

export const getNews: GetNews = async (queryParams) => ({
  data: await prisma.news.findMany(getNewsQueryOptions(queryParams)),
  limit: queryParams.limit || 10,
  offset: queryParams.offset || 0,
  total: await prisma.news.count({
    where: {
      title: {
        contains: queryParams.search,
      },
      locationUuid: queryParams.locationUuid,
    },
  }),
})

export type UpdateLocationRequestBodyy = Partial<
  z.infer<typeof createNewsSchema>
>

export const updateNews = async (
  uuid: string,
  body: UpdateLocationRequestBodyy,
) =>
  prisma.news.update({
    where: {
      uuid,
    },
    data: {
      ...body,
    },
  })

export const getOneNews = async (uuid: string): Promise<NewsDTO | null> =>
  prisma.news.findFirst({
    where: {
      uuid,
    },
    omit: {
      userUuid: true,
      locationUuid: true,
    },
  })

export const togglePinNews = async (uuid: string): Promise<NewsDTO> => {
  const news = await prisma.news.findUnique({
    where: { uuid },
  })

  if (!news) {
    throw new ApiError({ status: 404, message: "No such news" })
  }

  const isCurrentlyPinned = news.pinnedAt !== null
  const newPinnedAt = isCurrentlyPinned ? null : new Date()

  return prisma.news.update({
    where: { uuid },
    data: { pinnedAt: newPinnedAt },
    omit: {
      userUuid: true,
      locationUuid: true,
    },
  })
}

export const getPinnedNews = (): Promise<NewsDTO[]> =>
  prisma.news.findMany({
    where: { pinnedAt: { not: null } },
    orderBy: {
      pinnedAt: "desc",
    },
    omit: {
      userUuid: true,
      locationUuid: true,
    },
  })

export const getLatestNewsUuid = async () => {
  const latestNews = await prisma.news.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      uuid: true,
    },
  })

  return latestNews?.uuid || null
}

type GetNewsWithLocation = (
  queryParams: GetNewsWithLocationQueryParams,
) => Promise<Pagination<NewsWithLocation[]>>

export type GetNewsWithLocationQueryParams = {
  offset?: number
  limit?: number
  search?: string
  locationUuid?: string
  orderBy?: "asc" | "desc"
  omit?: Prisma.NewsOmit<DefaultArgs>
}

export const getNewsWithLocationQueryOptions = (
  queryParams: GetNewsWithLocationQueryParams,
): Prisma.NewsFindManyArgs => ({
  where: {
    title: {
      contains: queryParams.search,
    },
    locationUuid: queryParams.locationUuid,
  },
  take: queryParams.limit || 10,
  skip: queryParams.offset || 0,
  orderBy: {
    createdAt: queryParams.orderBy || "desc",
  },
  omit: queryParams.omit
    ? queryParams.omit
    : {
        userUuid: true,
      },
})

export const getNewsWithLocation: GetNewsWithLocation = async (
  queryParams,
) => ({
  data: await prisma.news.findMany(
    getNewsWithLocationQueryOptions(queryParams),
  ),
  limit: queryParams.limit || 10,
  offset: queryParams.offset || 0,
  total: await prisma.news.count({
    where: {
      title: {
        contains: queryParams.search,
      },
      locationUuid: queryParams.locationUuid,
    },
  }),
})

export const deleteNews = (uuid: string) =>
  prisma.news.delete({
    where: {
      uuid,
    },
  })
