"use client"

import { Language } from "@/generated/prisma"
import { useAppSelector } from "@/hooks/use-app-selector"

export const formatCurrentDate = (language: Language): string => {
  const now = new Date()
  const lang = language

  const formatter = new Intl.DateTimeFormat(
    `${lang.toLowerCase()}-${lang}` as Intl.LocalesArgument,
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  )

  return formatter.format(now)
}

export const useFormatCurrentDate = (): string => {
  const userLanguage = useAppSelector((state) => state.userSlice.language)
  return formatCurrentDate(userLanguage)
}
