import { prisma } from "@/server/prisma-client"
import { ApiError } from "@/types/api-response"
import { $Enums } from "@/generated/prisma"
import UserRole = $Enums.UserRole

export const checkEditorAllowedToNews = async (
  userUuid: string,
  newsUuid: string,
) => {
  const user = await prisma.user.findFirst({
    where: {
      uuid: userUuid,
    },
  })

  if (!user) {
    throw new ApiError({ status: 401, message: "Не авторизован" })
  }

  if (user.role === UserRole.EDITOR) {
    const news = await prisma.news.findFirst({
      where: {
        uuid: newsUuid,
      },
      select: {
        locationUuid: true,
      },
    })

    if (!news) {
      throw new ApiError({
        status: 403,
        message: "Нет доступа к этой локации",
      })
    }

    const location = await prisma.location.findFirst({
      where: {
        uuid: news.locationUuid,
        editors: {
          some: {
            uuid: userUuid,
          },
        },
      },
    })

    if (!location) {
      throw new ApiError({
        status: 403,
        message: "Нет доступа к этой локации",
      })
    }
  }
}
