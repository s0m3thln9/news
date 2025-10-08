"use client"

import { I18nProvider } from "../providers/i18n-provider"
import { Provider } from "react-redux"
import { AppStore, makeStore, RootState } from "@/app/store"
import { FC, ReactNode, useRef } from "react"
import { ThemeProvider } from "@mui/system"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import theme from "@/app/theme"

type ProvidersProps = {
  children: ReactNode
  preloadedState: Partial<RootState>
}

export const Providers: FC<ProvidersProps> = ({ children, preloadedState }) => {
  const storeRef = useRef<AppStore>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState)
  }

  return (
    <Provider store={storeRef.current}>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <I18nProvider
            language={
              (preloadedState.userSlice?.user?.language?.toLowerCase() ||
                "ru") as "en" | "ru"
            }
          >
            {children}
          </I18nProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </Provider>
  )
}
