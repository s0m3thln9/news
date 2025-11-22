import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import skorina from "../public/skorina.png"
import flag from "../public/flag.png"
import type { ReactNode } from "react"
import { getPreloadedState } from "@/utils/get-preloaded-state"
import { Providers } from "@/app/providers"
import { Header } from "@/components/Header"
import Image from "next/image"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "700"],
})

const getLocaleCode = (lang: string) => {
  const map: Record<string, string> = {
    ru: "ru_RU",
    en: "en_US",
  }
  return map[lang] || "ru_RU"
}

export async function generateMetadata(): Promise<Metadata> {
  const preloadedState = await getPreloadedState()
  const lang = preloadedState.userSlice?.language?.toLowerCase() || "ru"
  const locale = getLocaleCode(lang)

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_HOME_URL || "https://soyuzvestey.by",
    ),
    title: {
      default: "Союз Вестей - Новости Беларуси и мира",
      template: "%s | Союз Вестей",
    },
    description:
      "Последние новости Беларуси и Туркменистана, аналитика, репортажи, интервью и актуальные события от Союза Вестей.",
    keywords: [
      "Союз Вестей",
      "новости онлайн",
      "новости",
      "Беларусь",
      "Туркменистан",
      "СНГ",
      "Союзное государство",
      "Минск",
      "политика",
      "экономика",
      "общество",
      "происшествия",
      "международные отношения",
      "аналитика",
      "интервью",
      "новости сегодня",
      "новости вузов",
      "образование в Беларуси",
      "студенты РБ",
      "вступительная кампания",
      "абитуриент",
      "ЦТ",
      "ЦЭ",
      "Скорина",
      "БГУИР",
      "Сухого",
      "БЕЛГут",
      "БГУ",
      "БНТУ",
    ],
    authors: [{ name: "Союз Вестей", url: process.env.NEXT_PUBLIC_HOME_URL }],
    openGraph: {
      title: "Союз Вестей - Новости Беларуси и мира",
      description:
        "Будьте в курсе последних событий с Союзом Вестей. Новости, аналитика, репортажи и интервью.",
      url: "/",
      siteName: "Союз Вестей",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_HOME_URL}/og-image.jpg`,
          width: 1200,
          height: 600,
          alt: "Союз Вестей - Главные новости",
        },
      ],
      locale: locale,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: "Союз Вестей",
      description: "Последние новости, аналитика и репортажи.",
      images: [`${process.env.NEXT_PUBLIC_HOME_URL}/og-image.jpg`],
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
      canonical: "/",
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const preloadedState = await getPreloadedState()
  const lang = preloadedState.userSlice?.language?.toLowerCase() || "ru"
  return (
    <html lang={lang}>
      <body className={`${inter.variable} antialiased`}>
        <div className="root z-[1] flex min-h-screen flex-col">
          <Providers preloadedState={preloadedState}>
            <Header />
            <main className="flex grow flex-col gap-5 py-5 lg:gap-10 lg:py-10">
              <Image
                src={skorina}
                alt="Франциск Скорина"
                className="center-right-image max-md:hidden"
                placeholder="blur"
                priority
              />
              <Image
                src={flag}
                alt="Флаг"
                className="center-left-image"
                priority
              />
              {children}
            </main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  )
}
