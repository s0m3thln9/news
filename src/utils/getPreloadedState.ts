"use server"

import { cookies, headers } from "next/headers"
import { UserDTO } from "@/types/dto/user"
import {
  getMe,
  updateLanguage,
  UpdateLanguageRequestBody,
} from "@/server/services/user-service"
import { getLocations } from "@/server/services/locations-service"
import type { Location } from "@/generated/prisma"
const jwtModule = await import("jsonwebtoken")

export type PreloadedState = {
  userSlice: { user: UserDTO | null }
  locationsSlice: { locations: Location[]; brothers: Location | null }
}

export const getPreloadedState = async (): Promise<PreloadedState> => {
  const cookiesObj = await cookies()
  const jwt = cookiesObj.get("jwt")?.value

  const language = await getUserLanguage()

  if (!jwt) {
    return {
      userSlice: { user: null },
      locationsSlice: { locations: [], brothers: null },
    }
  }

  const userUuid = jwtModule.default.verify(
    jwt,
    process.env.JWT_SECRET!,
  ) as string

  let user = await getMe(userUuid as string)
  const locations: Location[] = await getLocations()

  const brothersLocation = locations.find(
    (location) => location.title === "Вести братского народа",
  )

  if (!user.language) {
    user = await updateLanguage(
      { language } as UpdateLanguageRequestBody,
      userUuid as string,
    )
  }

  return {
    userSlice: { user },
    locationsSlice: {
      locations: locations.filter(
        (location) => location.uuid !== brothersLocation?.uuid,
      ),
      brothers: brothersLocation || null,
    },
  }
}

export const getUserLanguage = async (): Promise<"EN" | "RU"> => {
  const headersList = await headers()
  const acceptLanguage = headersList.get("accept-language")
  const language =
    acceptLanguage?.split(",")[0].split("-")[0].toUpperCase() || "EN"

  if (language === "EN" || language === "RU") {
    return language
  }

  return "EN"
}
