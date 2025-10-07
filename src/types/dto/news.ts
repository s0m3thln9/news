import { News } from "@/generated/prisma"

export type NewsDTO = Omit<News, "userUuid" | "locationUuid">
