import type { Location, News } from "@/generated/prisma"

export type LocationWithNews = Location & {
  news: News[]
}
