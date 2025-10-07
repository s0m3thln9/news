"use server"

import { cookies, headers } from "next/headers"
import {
  getMe,
  updateLanguage,
  UpdateLanguageRequestBody,
} from "@/server/services/user-service"
import { getLocations } from "@/server/services/locations-service"
import type { Location } from "@/generated/prisma"
import { RootState } from "@/app/store"
const jwtModule = await import("jsonwebtoken")

export type PreloadedState = Partial<RootState>

export const getPreloadedState = async (): Promise<PreloadedState> => {
  const cookiesObj = await cookies()
  const jwt = cookiesObj.get("jwt")?.value

  const language = await getUserLanguage()

  const headersList = await headers()

  if (!jwt) {
    return {
      userSlice: { user: null },
      locationsSlice: { locations: [], brothers: null, currentLocation: null },
    }
  }

  const userUuid = jwtModule.default.verify(
    jwt,
    process.env.JWT_SECRET!,
  ) as string

  let user = await getMe(userUuid as string)
  const locations: Location[] = await getLocations()

  const url = headersList.get("referer")
  let locationUuid: string | null = null

  if (url?.includes("locations/")) {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const parts = pathname.split("/")

    const locationsIndex = parts.indexOf("locations")

    if (locationsIndex !== -1 && locationsIndex + 1 < parts.length) {
      locationUuid = parts[locationsIndex + 1] || null
    }
  }

  const brothersLocation = locations.find(
    (location) => location.title === "Вести братского народа",
  )

  const currentLocation = locations.find(
    (location) => location.uuid === locationUuid,
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
      currentLocation: currentLocation || null,
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
