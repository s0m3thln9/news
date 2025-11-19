import type { Location } from "@prisma/client"
import { NewsDTO } from "@/types/dto/news"

export type LocationWithNews = Location & {
  news: NewsDTO[]
}
