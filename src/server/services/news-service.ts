import z from "zod"
import { prisma } from "@/server/prisma-client"
import { NewsDTO } from "@/types/dto/news"
import { Prisma } from "@/generated/prisma"
import { Pagination } from "@/types/dto/Pagination"

export const createNewsSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  images: z.array(z.string()),
  content: z.string(),
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
      images: body.images,
      content: body.content,
      title: body.title,
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
      mode: "insensitive",
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
        mode: "insensitive",
      },
      locationUuid: queryParams.locationUuid,
    },
  }),
})

export type UpdateNewsRequestBody = Partial<z.infer<typeof createNewsSchema>>

export const updateNews = async (uuid: string, body: UpdateNewsRequestBody) =>
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
