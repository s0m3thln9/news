"use client"

import { useAppSelector } from "@/hooks/use-app-selector"

export const useGetDateKey = () => {
  const userLanguage =
    useAppSelector((state) => state.userSlice.language) || "ru"

  return (date: Date) =>
    new Date(date).toLocaleDateString(
      `${userLanguage}-${userLanguage?.toUpperCase()}`,
      {
        day: "numeric",
        month: "long",
      },
    )
}
