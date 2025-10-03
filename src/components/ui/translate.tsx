"use client"

import { FC } from "react"
import { useTranslation } from "@/components/providers/I18Provider"

type TranslateProps = {
  value: string
}

export const Translate: FC<TranslateProps> = ({ value }) => {
  const t = useTranslation()

  return t(value)
}
