import { News } from "@prisma/client"

export type NewsDTO = Omit<News, "userUuid" | "locationUuid">
