"use client"

import { useAppSelector } from "@/hooks/use-app-selector"

export const formatCurrentDate = (language?: string): string => {
  const now = new Date()
  const lang = (language || "ru").toLowerCase()

  const formatter = new Intl.DateTimeFormat(
    `${lang}-${lang.toUpperCase()}` as Intl.LocalesArgument,
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
  const userLanguage =
    useAppSelector((state) => state.userSlice.user?.language) || "ru"
  return formatCurrentDate(userLanguage)
}
