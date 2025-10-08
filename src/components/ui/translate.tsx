"use client"

import { FC } from "react"
import { useTranslation } from "@/providers/i18n-provider"

type TranslateProps = {
  value: string
}

export const Translate: FC<TranslateProps> = ({ value }) => {
  const t = useTranslation()

  return t(value)
}
