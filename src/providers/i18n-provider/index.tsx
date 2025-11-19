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
import EN from "./messages/en.json"
import RU from "./messages/ru.json"
import { updateLanguage } from "@/features/user/slice"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { Language } from "@prisma/client"

export const languagesMap = {
  EN,
  RU,
} as const

type NestedStringObject = {
  [key: string]: string | NestedStringObject
}

type I18nContextType = {
  language: Language
  messages: NestedStringObject
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined)

type I18nProviderProps = {
  children: ReactNode
  language?: Language
}

export const I18nProvider: FC<I18nProviderProps> = ({
  children,
  language: initialLanguage,
}) => {
  const userSettingsLanguage = useAppSelector(
    (state) => state.userSlice.language,
  )
  const user = useAppSelector((state) => state.userSlice.user)

  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    initialLanguage || userSettingsLanguage,
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!user) {
      const initialLanguage = localStorage.getItem("language")
      if (
        initialLanguage &&
        (initialLanguage === "EN" || initialLanguage === "RU")
      ) {
        setCurrentLanguage(initialLanguage)
        dispatch(updateLanguage(initialLanguage))
      }
      return
    }

    const normalizedLanguage = userSettingsLanguage
    if (normalizedLanguage !== currentLanguage) {
      setCurrentLanguage(normalizedLanguage)
      dispatch(updateLanguage(normalizedLanguage))
    }
  }, [userSettingsLanguage, currentLanguage, dispatch, user])

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
