import { prisma } from "@/server/prisma-client"
import { ApiError } from "@/types/api-response"
import { $Enums } from "@prisma/client"
import UserRole = $Enums.UserRole

export const checkEditorAllowedToLocation = async (
  userUuid: string,
  locationUuid: string,
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
    const location = await prisma.location.findFirst({
      where: {
        uuid: locationUuid,
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
