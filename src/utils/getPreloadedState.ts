"use server"

import { cookies, headers } from "next/headers"
import { UserDTO } from "@/types/dto/user"
import {
  getMe,
  updateLanguage,
  UpdateLanguageRequestBody,
} from "@/server/services/user-service"
const jwtModule = await import("jsonwebtoken")

export type PreloadedState = {
  userSlice: { user: UserDTO | null }
}

export const getPreloadedState = async (): Promise<PreloadedState> => {
  const cookiesObj = await cookies()
  const jwt = cookiesObj.get("jwt")?.value

  const language = await getUserLanguage()

  if (!jwt) {
    return {
      userSlice: { user: null },
    }
  }

  const userUuid = jwtModule.default.verify(
    jwt,
    process.env.JWT_SECRET!,
  ) as string

  let user = await getMe(userUuid as string)

  if (!user.language) {
    user = await updateLanguage(
      { language } as UpdateLanguageRequestBody,
      userUuid as string,
    )
  }

  return {
    userSlice: { user },
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
