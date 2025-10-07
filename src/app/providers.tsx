"use client"

import { Provider } from "react-redux"
import { AppStore, makeStore, RootState } from "@/app/store"
import { FC, ReactNode, useRef } from "react"
import { I18Provider } from "@/components/providers/I18Provider"
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
          <I18Provider
            language={
              (preloadedState.userSlice?.user?.language?.toLowerCase() ||
                "ru") as "en" | "ru"
            }
          >
            {children}
          </I18Provider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </Provider>
  )
}
