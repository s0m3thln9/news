"use server"

import { cookies, headers } from "next/headers"
import { getMe, updateLanguage } from "@/server/services/user-service"
import { getLocations } from "@/server/services/locations-service"
import type { Location } from "@/generated/prisma"
import { RootState } from "@/app/store"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { Language } from "@/generated/prisma"
import { Pagination } from "@/types/dto/pagination"
import { verify } from "jsonwebtoken"

export type PreloadedState = Partial<RootState>

export const getPreloadedState = async (): Promise<PreloadedState> => {
  const cookiesObj = await cookies()
  console.log("cookiesObj", cookiesObj)

  const userUuid = await getUserUuid(cookiesObj)

  console.log("userUuid", userUuid)

  const headersList = await headers()

  const language = await getLanguageFromRequest(
    headersList.get("accept-language"),
  )

  const locationsSlice = await getLocationsData(headersList.get("x-pathname"))

  if (!userUuid) {
    return {
      userSlice: { user: null, language: "RU" },
      locationsSlice,
    }
  }

  let user = await getMe(userUuid)

  if (!user.language) {
    user = await updateLanguage({ language }, userUuid)
  }

  return {
    userSlice: { user, language: user.language || "RU" },
    locationsSlice,
  }
}

export const getLanguageFromRequest = async (
  acceptLanguage: string | null,
): Promise<Language> => {
  const language =
    acceptLanguage?.split(",")[0].split("-")[0].toUpperCase() || "EN"

  if (language === "EN" || language === "RU") {
    return language
  }

  return "EN"
}

const getLocationsData = async (pathname: string | null) => {
  let locationUuid: string | null = null

  if (pathname) {
    const parts = pathname.split("/")

    const locationsIndex = parts.indexOf("locations")

    if (locationsIndex !== -1 && locationsIndex + 1 < parts.length) {
      locationUuid = parts[locationsIndex + 1] || null
    }
  }

  const locations: Pagination<Location[]> = await getLocations({})

  const brothersLocation: Location | null =
    locations.data.find(
      (location) => location.title === "Вести братского народа",
    ) || null

  const currentLocation: Location | null =
    locations.data.find((location) => location.uuid === locationUuid) || null

  return {
    locations: locations.data
      .filter((location) => location.uuid !== brothersLocation?.uuid)
      .map((location) => ({ ...location, news: [] })),
    brothers: brothersLocation ? { ...brothersLocation, news: [] } : null,
    currentLocation: currentLocation ? { ...currentLocation, news: [] } : null,
  }
}

const getUserUuid = async (
  cookiesObj: ReadonlyRequestCookies,
): Promise<string | null> => {
  const cookieName =
    process.env.NODE_ENV === "production" ? "__Secure-jwt" : "jwt"
  const jwt = cookiesObj.get(cookieName)?.value

  console.log("jwt", jwt)

  if (!jwt) {
    return null
  }

  try {
    return verify(jwt, process.env.JWT_SECRET!) as string
  } catch {
    return null
  }
}
