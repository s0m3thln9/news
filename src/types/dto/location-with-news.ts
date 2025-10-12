import type { Location } from "@/generated/prisma"
import { NewsDTO } from "@/types/dto/news"

export type LocationWithNews = Location & {
  news: NewsDTO[]
}
