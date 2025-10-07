import z from "zod"
import { prisma } from "@/server/prisma-client"
import { NewsDTO } from "@/types/dto/news"

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

export const getNews = async () =>
  prisma.news.findMany({
    omit: {
      userUuid: true,
      locationUuid: true,
    },
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
