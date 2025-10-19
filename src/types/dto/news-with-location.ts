import { NewsDTO } from "@/types/dto/news"

export type NewsWithLocation = NewsDTO & { locationUuid: string }
