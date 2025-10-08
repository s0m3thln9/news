"use client"

import { useAppSelector } from "@/hooks/use-app-selector"
import { getValueWithStringKey } from "@/utils/get-value-with-string-key"
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import en from "./messages/en.json"
import ru from "./messages/ru.json"

export const languagesMap = {
  en,
  ru,
} as const

type NestedStringObject = {
  [key: string]: string | NestedStringObject
}

type Language = keyof typeof languagesMap

type I18nContextType = {
  language: Language
  messages: NestedStringObject
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined)

type I18nProviderProps = {
  children: ReactNode
  language: Language
}

export const I18nProvider: FC<I18nProviderProps> = ({
  children,
  language: initialLanguage,
}) => {
  const [currentLanguage, setCurrentLanguage] =
    useState<Language>(initialLanguage)

  const userSettingsLanguage = useAppSelector(
    (state) => state.userSlice.user?.language,
  )

  useEffect(() => {
    if (userSettingsLanguage) {
      const normalizedLanguage = userSettingsLanguage.toLowerCase() as Language
      if (normalizedLanguage !== currentLanguage) {
        setCurrentLanguage(normalizedLanguage)
      }
    }
  }, [userSettingsLanguage, currentLanguage])

  return (
    <I18nContext.Provider
      value={{
        language: currentLanguage,
        messages: languagesMap[currentLanguage],
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export type Translate = (key: string, fallback?: string) => string

export const useTranslation = () => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useTranslation must be used within an I18Provider")
  }

  const { messages } = context

  const t: Translate = (key: string, fallback?: string): string =>
    (getValueWithStringKey(messages, key) as string) || fallback || key

  return t
}
