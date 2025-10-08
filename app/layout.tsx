import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type { ReactNode } from "react"

import { getPreloadedState } from "@/utils/get-preloaded-state"
import { Providers } from "@/app/providers"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Союз Вестей - Новости России и мира",
  description:
    "Последние новости Беларуси и Туркменистана, аналитика, репортажи, интервью и актуальные события от Союза Вестей.",
  keywords: [
    "новости",
    "Союз Вестей",
    "Беларусь",
    "международные новости",
    "аналитика",
    "события",
  ],
  authors: [{ name: "Союз Вестей" }],
  openGraph: {
    title: "Союз Вестей - Новости России и мира",
    description:
      "Будьте в курсе последних событий с Союзом Вестей. Новости, аналитика, репортажи и интервью.",
    url: "", //https://soyuzvestey.by
    siteName: "Союз Вестей",
    images: [
      {
        url: "", //https://soyuzvestey.ru/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Союз Вестей - Новости",
      },
    ],
    locale: "", //ru_RU
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Союз Вестей - Новости Беларуси и Туркменистана",
    description: "Последние новости, аналитика и репортажи от Союза Вестей.",
    images: [""], //https://soyuzvestey.ru/twitter-image.jpg
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "", //https://soyuzvestey.ru
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const preloadedState = await getPreloadedState()

  return (
    <html lang={preloadedState.userSlice?.user?.language?.toLowerCase()}>
      <body className={`${inter.variable} antialiased`}>
        <div className="root z-[1] flex min-h-screen flex-col">
          <Providers preloadedState={preloadedState}>
            <Header />
            <main className="flex flex-col gap-10 px-6 py-10">{children}</main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  )
}
